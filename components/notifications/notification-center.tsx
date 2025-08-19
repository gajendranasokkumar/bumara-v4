"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Bell,
  Clock,
  CheckCircle,
  Bot,
  Mail,
  MessageSquare,
  Settings,
  MoreHorizontal,
  Eye,
  EyeOff,
  Archive,
  Trash2,
  Calendar,
  FileText,
  Zap,
  Volume2,
  VolumeX,
} from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  type: "deadline" | "approval" | "sync" | "ai-suggestion" | "system" | "reminder"
  priority: "high" | "medium" | "low"
  timestamp: string
  read: boolean
  actionRequired: boolean
  relatedEntity?: {
    type: "filing" | "document" | "report"
    id: string
    name: string
  }
  actions?: {
    label: string
    action: string
    variant?: "default" | "outline" | "destructive"
  }[]
}

interface NotificationSettings {
  emailNotifications: boolean
  smsNotifications: boolean
  pushNotifications: boolean
  soundEnabled: boolean
  deadlineReminders: boolean
  aiSuggestions: boolean
  systemUpdates: boolean
  approvalRequests: boolean
  reminderTiming: "immediate" | "1hour" | "1day" | "3days"
  quietHours: {
    enabled: boolean
    start: string
    end: string
  }
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "VAT Filing Due Soon",
      message:
        "Your VAT return for Q4 2024 is due in 3 days. All required documents have been uploaded and are ready for review.",
      type: "deadline",
      priority: "high",
      timestamp: "2025-01-19T10:30:00Z",
      read: false,
      actionRequired: true,
      relatedEntity: {
        type: "filing",
        id: "vat-q4-2024",
        name: "VAT Return Q4 2024",
      },
      actions: [
        { label: "Review Filing", action: "review", variant: "default" },
        { label: "Submit Now", action: "submit", variant: "default" },
      ],
    },
    {
      id: "2",
      title: "AI Compliance Suggestion",
      message:
        "Based on your filing patterns, consider scheduling quarterly reviews 2 weeks before deadlines to reduce last-minute stress.",
      type: "ai-suggestion",
      priority: "medium",
      timestamp: "2025-01-19T08:15:00Z",
      read: false,
      actionRequired: false,
      actions: [
        { label: "Schedule Review", action: "schedule", variant: "outline" },
        { label: "Learn More", action: "learn", variant: "outline" },
      ],
    },
    {
      id: "3",
      title: "Document Approval Required",
      message: "Annual Financial Statement requires your approval before submission. Submitted by Jane Smith.",
      type: "approval",
      priority: "high",
      timestamp: "2025-01-19T07:45:00Z",
      read: true,
      actionRequired: true,
      relatedEntity: {
        type: "document",
        id: "annual-financial-2024",
        name: "Annual Financial Statement 2024",
      },
      actions: [
        { label: "Approve", action: "approve", variant: "default" },
        { label: "Request Changes", action: "reject", variant: "outline" },
        { label: "View Document", action: "view", variant: "outline" },
      ],
    },
    {
      id: "4",
      title: "Offline Data Synced",
      message: "3 compliance records created offline have been successfully synced to the server.",
      type: "sync",
      priority: "low",
      timestamp: "2025-01-19T06:20:00Z",
      read: true,
      actionRequired: false,
    },
    {
      id: "5",
      title: "Monthly Compliance Review",
      message: "Your monthly compliance review meeting is scheduled for tomorrow at 2:00 PM.",
      type: "reminder",
      priority: "medium",
      timestamp: "2025-01-18T16:00:00Z",
      read: false,
      actionRequired: false,
      actions: [
        { label: "Join Meeting", action: "join", variant: "default" },
        { label: "Reschedule", action: "reschedule", variant: "outline" },
      ],
    },
    {
      id: "6",
      title: "System Maintenance Notice",
      message:
        "Scheduled maintenance will occur on Sunday, January 21st from 2:00 AM to 4:00 AM. The system will be temporarily unavailable.",
      type: "system",
      priority: "medium",
      timestamp: "2025-01-18T14:30:00Z",
      read: true,
      actionRequired: false,
    },
  ])

  const [settings, setSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    soundEnabled: true,
    deadlineReminders: true,
    aiSuggestions: true,
    systemUpdates: true,
    approvalRequests: true,
    reminderTiming: "1day",
    quietHours: {
      enabled: true,
      start: "22:00",
      end: "08:00",
    },
  })

  const [filter, setFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])

  // Filter notifications based on current filter and search
  const filteredNotifications = notifications.filter((notification) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && !notification.read) ||
      (filter === "action-required" && notification.actionRequired) ||
      notification.type === filter

    const matchesSearch =
      searchQuery === "" ||
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  const unreadCount = notifications.filter((n) => !n.read).length
  const actionRequiredCount = notifications.filter((n) => n.actionRequired && !n.read).length

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
  }

  const handleBulkAction = (action: "read" | "delete" | "archive") => {
    if (action === "read") {
      setNotifications((prev) => prev.map((n) => (selectedNotifications.includes(n.id) ? { ...n, read: true } : n)))
    } else if (action === "delete") {
      setNotifications((prev) => prev.filter((n) => !selectedNotifications.includes(n.id)))
    }
    setSelectedNotifications([])
  }

  const handleNotificationAction = (notificationId: string, action: string) => {
    console.log(`Executing action: ${action} for notification: ${notificationId}`)
    // Handle specific actions based on the action type
    markAsRead(notificationId)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "deadline":
        return <Clock className="h-4 w-4 text-red-600" />
      case "approval":
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      case "ai-suggestion":
        return <Bot className="h-4 w-4 text-purple-600" />
      case "sync":
        return <Zap className="h-4 w-4 text-green-600" />
      case "reminder":
        return <Calendar className="h-4 w-4 text-yellow-600" />
      case "system":
        return <Settings className="h-4 w-4 text-gray-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50"
      case "medium":
        return "border-l-yellow-500 bg-yellow-50"
      case "low":
        return "border-l-green-500 bg-green-50"
      default:
        return "border-l-gray-500 bg-gray-50"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return "Yesterday"
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Notification Center</h2>
          <p className="text-muted-foreground">
            {unreadCount} unread notifications • {actionRequiredCount} require action
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark All Read
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Notification Preferences</DropdownMenuItem>
              <DropdownMenuItem>Export Notifications</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Clear All Notifications</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search notifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Notifications</SelectItem>
                    <SelectItem value="unread">Unread Only</SelectItem>
                    <SelectItem value="action-required">Action Required</SelectItem>
                    <SelectItem value="deadline">Deadlines</SelectItem>
                    <SelectItem value="approval">Approvals</SelectItem>
                    <SelectItem value="ai-suggestion">AI Suggestions</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Actions */}
          {selectedNotifications.length > 0 && (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {selectedNotifications.length} notification{selectedNotifications.length > 1 ? "s" : ""} selected
                  </span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction("read")}>
                      <Eye className="h-4 w-4 mr-2" />
                      Mark as Read
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction("archive")}>
                      <Archive className="h-4 w-4 mr-2" />
                      Archive
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction("delete")}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notifications List */}
          <Card>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                <div className="space-y-1 p-4">
                  {filteredNotifications.length === 0 ? (
                    <div className="text-center py-8">
                      <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No notifications found</p>
                    </div>
                  ) : (
                    filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`border-l-4 p-4 rounded-lg transition-colors cursor-pointer ${
                          notification.read ? "bg-background" : getPriorityColor(notification.priority)
                        } ${selectedNotifications.includes(notification.id) ? "ring-2 ring-primary" : ""}`}
                        onClick={() => !notification.read && markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-4">
                          <input
                            type="checkbox"
                            checked={selectedNotifications.includes(notification.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedNotifications((prev) => [...prev, notification.id])
                              } else {
                                setSelectedNotifications((prev) => prev.filter((id) => id !== notification.id))
                              }
                            }}
                            className="mt-1"
                            onClick={(e) => e.stopPropagation()}
                          />

                          <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className={`font-medium ${!notification.read ? "font-semibold" : ""}`}>
                                    {notification.title}
                                  </h4>
                                  {!notification.read && <div className="w-2 h-2 bg-primary rounded-full" />}
                                  {notification.actionRequired && (
                                    <Badge variant="destructive" className="text-xs">
                                      Action Required
                                    </Badge>
                                  )}
                                  <Badge variant="outline" className="text-xs capitalize">
                                    {notification.type.replace("-", " ")}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                                {notification.relatedEntity && (
                                  <div className="flex items-center gap-2 mb-2">
                                    <FileText className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">
                                      Related: {notification.relatedEntity.name}
                                    </span>
                                  </div>
                                )}
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-muted-foreground">
                                    {formatTimestamp(notification.timestamp)}
                                  </span>
                                  {notification.actions && (
                                    <div className="flex items-center gap-2">
                                      {notification.actions.map((action, index) => (
                                        <Button
                                          key={index}
                                          variant={action.variant || "outline"}
                                          size="sm"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            handleNotificationAction(notification.id, action.action)
                                          }}
                                        >
                                          {action.label}
                                        </Button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                    {notification.read ? (
                                      <>
                                        <EyeOff className="h-4 w-4 mr-2" />
                                        Mark as Unread
                                      </>
                                    ) : (
                                      <>
                                        <Eye className="h-4 w-4 mr-2" />
                                        Mark as Read
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Archive className="h-4 w-4 mr-2" />
                                    Archive
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => deleteNotification(notification.id)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Delivery Methods */}
              <div className="space-y-4">
                <h4 className="font-medium">Delivery Methods</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label>Push Notifications</Label>
                        <p className="text-xs text-muted-foreground">Receive notifications in your browser</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, pushNotifications: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, emailNotifications: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label>SMS Notifications</Label>
                        <p className="text-xs text-muted-foreground">Receive critical alerts via SMS</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, smsNotifications: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {settings.soundEnabled ? (
                        <Volume2 className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <VolumeX className="h-4 w-4 text-muted-foreground" />
                      )}
                      <div>
                        <Label>Sound Notifications</Label>
                        <p className="text-xs text-muted-foreground">Play sound for new notifications</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.soundEnabled}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, soundEnabled: checked }))}
                    />
                  </div>
                </div>
              </div>

              {/* Notification Types */}
              <div className="space-y-4">
                <h4 className="font-medium">Notification Types</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label>Deadline Reminders</Label>
                        <p className="text-xs text-muted-foreground">Get notified about upcoming deadlines</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.deadlineReminders}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, deadlineReminders: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bot className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label>AI Suggestions</Label>
                        <p className="text-xs text-muted-foreground">Receive AI-powered compliance suggestions</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.aiSuggestions}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, aiSuggestions: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label>Approval Requests</Label>
                        <p className="text-xs text-muted-foreground">Get notified when approval is needed</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.approvalRequests}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, approvalRequests: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Settings className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label>System Updates</Label>
                        <p className="text-xs text-muted-foreground">Receive system maintenance and update notices</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.systemUpdates}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, systemUpdates: checked }))}
                    />
                  </div>
                </div>
              </div>

              {/* Timing Settings */}
              <div className="space-y-4">
                <h4 className="font-medium">Timing Settings</h4>
                <div className="space-y-3">
                  <div>
                    <Label>Reminder Timing</Label>
                    <Select
                      value={settings.reminderTiming}
                      onValueChange={(value: "immediate" | "1hour" | "1day" | "3days") =>
                        setSettings((prev) => ({ ...prev, reminderTiming: value }))
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="1hour">1 Hour Before</SelectItem>
                        <SelectItem value="1day">1 Day Before</SelectItem>
                        <SelectItem value="3days">3 Days Before</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Quiet Hours</Label>
                      <Switch
                        checked={settings.quietHours.enabled}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({
                            ...prev,
                            quietHours: { ...prev.quietHours, enabled: checked },
                          }))
                        }
                      />
                    </div>
                    {settings.quietHours.enabled && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm">Start Time</Label>
                          <Input
                            type="time"
                            value={settings.quietHours.start}
                            onChange={(e) =>
                              setSettings((prev) => ({
                                ...prev,
                                quietHours: { ...prev.quietHours, start: e.target.value },
                              }))
                            }
                          />
                        </div>
                        <div>
                          <Label className="text-sm">End Time</Label>
                          <Input
                            type="time"
                            value={settings.quietHours.end}
                            onChange={(e) =>
                              setSettings((prev) => ({
                                ...prev,
                                quietHours: { ...prev.quietHours, end: e.target.value },
                              }))
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-border">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
