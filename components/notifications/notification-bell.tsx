"use client"

import { useMemo, useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type SimpleNotification = {
  id: string
  title: string
  message: string
  timestamp: string
  read: boolean
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<SimpleNotification[]>([
    {
      id: "1",
      title: "VAT Filing Due Soon",
      message: "Your VAT return is due in 3 days.",
      timestamp: "2h",
      read: false,
    },
    {
      id: "2",
      title: "AI Suggestion",
      message: "Automate monthly PAYE returns to save time.",
      timestamp: "4h",
      read: false,
    },
    {
      id: "3",
      title: "Document Approved",
      message: "Annual compliance report approved.",
      timestamp: "1d",
      read: true,
    },
  ])

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications])

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="relative bg-transparent">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">{unreadCount}</Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="px-4 py-3 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Notifications</div>
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all read
            </Button>
          </div>
        </div>
        <ScrollArea className="h-80">
          <div className="p-2">
            {notifications.length === 0 ? (
              <div className="text-center text-sm text-muted-foreground py-10">No notifications</div>
            ) : (
              notifications.map((n) => (
                <button
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    n.read ? "bg-background" : "bg-accent"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="text-sm font-medium line-clamp-1">{n.title}</div>
                      <div className="text-xs text-muted-foreground line-clamp-2">{n.message}</div>
                    </div>
                    <div className="text-[10px] text-muted-foreground whitespace-nowrap">{n.timestamp}</div>
                  </div>
                </button>
              ))
            )}
          </div>
        </ScrollArea>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="justify-center">
          <span className="text-sm">View all notifications</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


