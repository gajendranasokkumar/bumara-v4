"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Bell, Clock, CheckCircle, AlertTriangle, Bot } from "lucide-react"

interface ToastNotification {
  id: string
  title: string
  message: string
  type: "success" | "error" | "warning" | "info" | "deadline" | "ai-suggestion"
  duration?: number
  actions?: {
    label: string
    action: () => void
    variant?: "default" | "outline"
  }[]
}

interface ToastNotificationsProps {
  notifications: ToastNotification[]
  onDismiss: (id: string) => void
}

export function ToastNotifications({ notifications, onDismiss }: ToastNotificationsProps) {
  const [visibleNotifications, setVisibleNotifications] = useState<ToastNotification[]>([])

  useEffect(() => {
    setVisibleNotifications(notifications)

    // Auto-dismiss notifications after their duration
    notifications.forEach((notification) => {
      if (notification.duration && notification.duration > 0) {
        setTimeout(() => {
          onDismiss(notification.id)
        }, notification.duration)
      }
    })
  }, [notifications, onDismiss])

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "deadline":
        return <Clock className="h-4 w-4 text-red-600" />
      case "ai-suggestion":
        return <Bot className="h-4 w-4 text-purple-600" />
      case "info":
      default:
        return <Bell className="h-4 w-4 text-blue-600" />
    }
  }

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-green-200 bg-green-50"
      case "error":
        return "border-red-200 bg-red-50"
      case "warning":
        return "border-yellow-200 bg-yellow-50"
      case "deadline":
        return "border-red-200 bg-red-50"
      case "ai-suggestion":
        return "border-purple-200 bg-purple-50"
      case "info":
      default:
        return "border-blue-200 bg-blue-50"
    }
  }

  if (visibleNotifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {visibleNotifications.map((notification) => (
        <Card
          key={notification.id}
          className={`border-2 shadow-lg animate-in slide-in-from-right-full ${getBackgroundColor(notification.type)}`}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">{getIcon(notification.type)}</div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>

                    {notification.actions && (
                      <div className="flex items-center gap-2 mt-3">
                        {notification.actions.map((action, index) => (
                          <Button
                            key={index}
                            variant={action.variant || "outline"}
                            size="sm"
                            onClick={action.action}
                            className="text-xs"
                          >
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button variant="ghost" size="sm" onClick={() => onDismiss(notification.id)} className="h-6 w-6 p-0">
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Hook for managing toast notifications
export function useToastNotifications() {
  const [toasts, setToasts] = useState<ToastNotification[]>([])

  const addToast = (toast: Omit<ToastNotification, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: ToastNotification = {
      id,
      duration: 5000, // Default 5 seconds
      ...toast,
    }
    setToasts((prev) => [...prev, newToast])
    return id
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const clearAllToasts = () => {
    setToasts([])
  }

  // Convenience methods for different toast types
  const showSuccess = (title: string, message: string, actions?: ToastNotification["actions"]) => {
    return addToast({ title, message, type: "success", actions })
  }

  const showError = (title: string, message: string, actions?: ToastNotification["actions"]) => {
    return addToast({ title, message, type: "error", duration: 0, actions }) // Don't auto-dismiss errors
  }

  const showWarning = (title: string, message: string, actions?: ToastNotification["actions"]) => {
    return addToast({ title, message, type: "warning", actions })
  }

  const showInfo = (title: string, message: string, actions?: ToastNotification["actions"]) => {
    return addToast({ title, message, type: "info", actions })
  }

  const showDeadlineAlert = (title: string, message: string, actions?: ToastNotification["actions"]) => {
    return addToast({ title, message, type: "deadline", duration: 0, actions }) // Don't auto-dismiss deadlines
  }

  const showAISuggestion = (title: string, message: string, actions?: ToastNotification["actions"]) => {
    return addToast({ title, message, type: "ai-suggestion", duration: 8000, actions }) // Longer duration for AI suggestions
  }

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showDeadlineAlert,
    showAISuggestion,
  }
}
