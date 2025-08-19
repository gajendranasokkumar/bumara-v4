"use client"

import { useState, useEffect } from "react"
import { offlineSyncManager } from "@/lib/offline-sync"

export function useOfflineStorage<T>(table: string, initialData: T[] = []) {
  const [data, setData] = useState<T[]>(initialData)
  const [isLoading, setIsLoading] = useState(true)
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const loadOfflineData = async () => {
      try {
        const offlineData = await offlineSyncManager.getOfflineData(table)
        if (offlineData.length > 0) {
          setData(offlineData)
        }
      } catch (error) {
        console.error("Failed to load offline data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine)
    }

    loadOfflineData()

    window.addEventListener("online", handleOnlineStatus)
    window.addEventListener("offline", handleOnlineStatus)

    return () => {
      window.removeEventListener("online", handleOnlineStatus)
      window.removeEventListener("offline", handleOnlineStatus)
    }
  }, [table])

  const saveData = async (newData: T | T[]) => {
    const dataArray = Array.isArray(newData) ? newData : [newData]

    // Update local state
    if (Array.isArray(newData)) {
      setData(newData)
    } else {
      setData((prev) => {
        const existingIndex = prev.findIndex((item: any) => item.id === (newData as any).id)
        if (existingIndex >= 0) {
          const updated = [...prev]
          updated[existingIndex] = newData
          return updated
        }
        return [...prev, newData]
      })
    }

    // Save to offline storage
    await offlineSyncManager.saveOfflineData(table, newData)

    // Add to sync queue if online
    for (const item of dataArray) {
      await offlineSyncManager.addToSyncQueue({
        type: (item as any).id ? "update" : "create",
        table,
        data: item,
        maxRetries: 3,
      })
    }
  }

  const deleteData = async (id: string) => {
    // Update local state
    setData((prev) => prev.filter((item: any) => item.id !== id))

    // Add to sync queue
    await offlineSyncManager.addToSyncQueue({
      type: "delete",
      table,
      data: { id },
      maxRetries: 3,
    })
  }

  return {
    data,
    isLoading,
    isOnline,
    saveData,
    deleteData,
    refresh: () => {
      setIsLoading(true)
      // Reload data logic here
      setIsLoading(false)
    },
  }
}
