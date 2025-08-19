interface SyncQueueItem {
  id: string
  type: "create" | "update" | "delete"
  table: string
  data: any
  timestamp: number
  retryCount: number
  maxRetries: number
}

interface OfflineData {
  complianceItems: any[]
  documents: any[]
  notifications: any[]
  forms: any[]
  lastSync: number
}

class OfflineSyncManager {
  private dbName = "bumara-compliance-offline"
  private version = 1
  private db: IDBDatabase | null = null
  private syncQueue: SyncQueueItem[] = []
  private isOnline = navigator.onLine
  private syncInProgress = false

  constructor() {
    this.initDB()
    this.setupEventListeners()
    this.loadSyncQueue()
  }

  private async initDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Create object stores
        if (!db.objectStoreNames.contains("complianceItems")) {
          db.createObjectStore("complianceItems", { keyPath: "id" })
        }
        if (!db.objectStoreNames.contains("documents")) {
          db.createObjectStore("documents", { keyPath: "id" })
        }
        if (!db.objectStoreNames.contains("notifications")) {
          db.createObjectStore("notifications", { keyPath: "id" })
        }
        if (!db.objectStoreNames.contains("forms")) {
          db.createObjectStore("forms", { keyPath: "id" })
        }
        if (!db.objectStoreNames.contains("syncQueue")) {
          db.createObjectStore("syncQueue", { keyPath: "id" })
        }
        if (!db.objectStoreNames.contains("metadata")) {
          db.createObjectStore("metadata", { keyPath: "key" })
        }
      }
    })
  }

  private setupEventListeners(): void {
    window.addEventListener("online", () => {
      this.isOnline = true
      this.processSyncQueue()
    })

    window.addEventListener("offline", () => {
      this.isOnline = false
    })
  }

  private async loadSyncQueue(): Promise<void> {
    if (!this.db) return

    const transaction = this.db.transaction(["syncQueue"], "readonly")
    const store = transaction.objectStore("syncQueue")
    const request = store.getAll()

    request.onsuccess = () => {
      this.syncQueue = request.result || []
    }
  }

  async saveOfflineData(table: string, data: any): Promise<void> {
    if (!this.db) return

    const transaction = this.db.transaction([table], "readwrite")
    const store = transaction.objectStore(table)

    if (Array.isArray(data)) {
      for (const item of data) {
        store.put(item)
      }
    } else {
      store.put(data)
    }

    // Update last sync timestamp
    const metaTransaction = this.db.transaction(["metadata"], "readwrite")
    const metaStore = metaTransaction.objectStore("metadata")
    metaStore.put({ key: "lastSync", value: Date.now() })
  }

  async getOfflineData(table: string): Promise<any[]> {
    if (!this.db) return []

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([table], "readonly")
      const store = transaction.objectStore(table)
      const request = store.getAll()

      request.onsuccess = () => resolve(request.result || [])
      request.onerror = () => reject(request.error)
    })
  }

  async addToSyncQueue(item: Omit<SyncQueueItem, "id" | "timestamp" | "retryCount">): Promise<void> {
    const queueItem: SyncQueueItem = {
      ...item,
      id: `sync_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      retryCount: 0,
      maxRetries: item.maxRetries || 3,
    }

    this.syncQueue.push(queueItem)

    if (this.db) {
      const transaction = this.db.transaction(["syncQueue"], "readwrite")
      const store = transaction.objectStore("syncQueue")
      store.put(queueItem)
    }

    if (this.isOnline) {
      this.processSyncQueue()
    }
  }

  private async processSyncQueue(): Promise<void> {
    if (this.syncInProgress || !this.isOnline || this.syncQueue.length === 0) return

    this.syncInProgress = true

    const itemsToProcess = [...this.syncQueue]

    for (const item of itemsToProcess) {
      try {
        await this.syncItem(item)
        this.removeSyncQueueItem(item.id)
      } catch (error) {
        console.error("Sync failed for item:", item, error)
        item.retryCount++

        if (item.retryCount >= item.maxRetries) {
          console.error("Max retries reached for item:", item)
          this.removeSyncQueueItem(item.id)
        }
      }
    }

    this.syncInProgress = false
  }

  private async syncItem(item: SyncQueueItem): Promise<void> {
    // Simulate API call - replace with actual API endpoints
    const apiEndpoint = `/api/compliance/${item.table}`

    let response: Response

    switch (item.type) {
      case "create":
        response = await fetch(apiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item.data),
        })
        break
      case "update":
        response = await fetch(`${apiEndpoint}/${item.data.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item.data),
        })
        break
      case "delete":
        response = await fetch(`${apiEndpoint}/${item.data.id}`, {
          method: "DELETE",
        })
        break
      default:
        throw new Error(`Unknown sync type: ${item.type}`)
    }

    if (!response.ok) {
      throw new Error(`Sync failed: ${response.statusText}`)
    }
  }

  private removeSyncQueueItem(id: string): void {
    this.syncQueue = this.syncQueue.filter((item) => item.id !== id)

    if (this.db) {
      const transaction = this.db.transaction(["syncQueue"], "readwrite")
      const store = transaction.objectStore("syncQueue")
      store.delete(id)
    }
  }

  async getLastSyncTime(): Promise<number> {
    if (!this.db) return 0

    return new Promise((resolve) => {
      const transaction = this.db!.transaction(["metadata"], "readonly")
      const store = transaction.objectStore("metadata")
      const request = store.get("lastSync")

      request.onsuccess = () => {
        resolve(request.result?.value || 0)
      }
      request.onerror = () => resolve(0)
    })
  }

  getSyncQueueLength(): number {
    return this.syncQueue.length
  }

  isOffline(): boolean {
    return !this.isOnline
  }

  async clearOfflineData(): Promise<void> {
    if (!this.db) return

    const stores = ["complianceItems", "documents", "notifications", "forms", "syncQueue"]

    for (const storeName of stores) {
      const transaction = this.db.transaction([storeName], "readwrite")
      const store = transaction.objectStore(storeName)
      store.clear()
    }
  }
}

export const offlineSyncManager = new OfflineSyncManager()
