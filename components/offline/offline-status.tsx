"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff, RefreshCw, AlertCircle } from "lucide-react"
import { offlineSyncManager } from "@/lib/offline-sync"

export function OfflineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [syncQueueLength, setSyncQueueLength] = useState(0)
  const [lastSyncTime, setLastSyncTime] = useState<number>(0)
  const [isSyncing, setIsSyncing] = useState(false)

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine)
      setSyncQueueLength(offlineSyncManager.getSyncQueueLength())
    }

    const updateLastSync = async () => {
      const lastSync = await offlineSyncManager.getLastSyncTime()
      setLastSyncTime(lastSync)
    }

    window.addEventListener("online", updateOnlineStatus)
    window.addEventListener("offline", updateOnlineStatus)

    updateOnlineStatus()
    updateLastSync()

    // Update sync queue length periodically
    const interval = setInterval(() => {
      setSyncQueueLength(offlineSyncManager.getSyncQueueLength())
    }, 1000)

    return () => {
      window.removeEventListener("online", updateOnlineStatus)
      window.removeEventListener("offline", updateOnlineStatus)
      clearInterval(interval)
    }
  }, [])

  const formatLastSync = (timestamp: number) => {
    if (!timestamp) return "Never"

    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
    return "Just now"
  }

  const handleManualSync = async () => {
    if (!isOnline) return

    setIsSyncing(true)
    // Trigger manual sync
    setTimeout(() => {
      setIsSyncing(false)
      setSyncQueueLength(0)
      setLastSyncTime(Date.now())
    }, 2000)
  }

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {isOnline ? (
              <>
                <Wifi className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">Online</span>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium text-red-600">Offline</span>
              </>
            )}
          </div>

          <Button variant="ghost" size="icon" onClick={handleManualSync} disabled={!isOnline || isSyncing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? "animate-spin" : ""}`} />
            {isSyncing ? "Syncing..." : "Sync Now"}
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Last sync :</span>
            <span className="text-sm font-medium">{formatLastSync(lastSyncTime)}</span>
          </div>

          {syncQueueLength > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Pending changes:</span>
                <Badge variant="secondary">{syncQueueLength}</Badge>
              </div>

              {!isOnline && (
                <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <span className="text-xs text-yellow-800">Changes will sync when connection is restored</span>
                </div>
              )}
            </div>
          )}

          {isOnline && syncQueueLength === 0 && (
            <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-green-800">All changes synced</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
