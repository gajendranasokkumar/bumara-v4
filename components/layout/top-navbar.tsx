"use client"

import { cn } from "@/lib/utils"
import { Bot, RefreshCw, Shield, Wifi, WifiOff } from "lucide-react"
import { NotificationBell } from "@/components/notifications/notification-bell"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useEffect, useRef, useState } from "react"
import { ToastNotifications, useToastNotifications } from "@/components/notifications/toast-notifications"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"

interface TopNavbarProps {
  currentModule?: string
  rightContent?: React.ReactNode
  className?: string
}

export function TopNavbar({ currentModule, rightContent, className }: TopNavbarProps) {
  const [isOnline, setIsOnline] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const { toasts, removeToast, showSuccess, showDeadlineAlert, showAISuggestion } = useToastNotifications()

  type ChatMessage = {
    id: string
    role: "user" | "ai"
    text: string
  }
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "ai",
      text:
        "Hi! I'm Mura. Ask me about compliance deadlines, filings, or any module. I can surface insights and quick actions.",
    },
  ])
  const [chatInput, setChatInput] = useState("")
  const [isChatResponding, setIsChatResponding] = useState(false)
  const chatEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine)
    updateOnlineStatus()
    window.addEventListener("online", updateOnlineStatus)
    window.addEventListener("offline", updateOnlineStatus)
    return () => {
      window.removeEventListener("online", updateOnlineStatus)
      window.removeEventListener("offline", updateOnlineStatus)
    }
  }, [])

  const handleManualSync = async () => {
    if (!isOnline) return
    setIsSyncing(true)
    setTimeout(() => setIsSyncing(false), 1500)
  }

  const handleDemoNotifications = () => {
    showDeadlineAlert("VAT Filing Due Soon", "Your VAT return is due in 3 days. Click to review.", [
      { label: "Review Now", action: () => showSuccess("Reminder", "Opening filing form soon"), variant: "outline" },
    ])

    setTimeout(() => {
      showAISuggestion(
        "AI Compliance Tip",
        "Consider automating your monthly PAYE returns to save time.",
        [{ label: "Learn More", action: () => showSuccess("Info", "Feature coming soon!"), variant: "outline" }]
      )
    }, 1200)
  }

  const sendChatMessage = () => {
    const trimmed = chatInput.trim()
    if (!trimmed) return
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: "user", text: trimmed }
    setChatMessages((prev) => [...prev, userMsg])
    setChatInput("")
    setIsChatResponding(true)

    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: "ai",
        text:
          "Thanks! I'll look into that. For full analysis, open the AI Assistant module or provide more context.",
      }
      setChatMessages((prev) => [...prev, aiMsg])
      setIsChatResponding(false)
    }, 900)
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  return (
    <header className={cn("h-14 border-b border-border bg-card", className)}>
      <div className="flex h-14 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Shield className="h-6 w-6 text-primary" />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-foreground">Bumara ERP</div>
            <div className="text-xs text-muted-foreground capitalize">
              {currentModule ? currentModule.replace("-", " ") : "Suite"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {rightContent}

          <div className="hidden sm:flex items-center gap-2 pr-2 mr-2 border-r">
            {isOnline ? (
              <span className="flex items-center gap-1 text-green-600 text-xs">
                <Wifi className="h-3 w-3" /> Online
              </span>
            ) : (
              <span className="flex items-center gap-1 text-red-600 text-xs">
                <WifiOff className="h-3 w-3" /> Offline
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              className="px-2"
              onClick={handleManualSync}
              disabled={!isOnline || isSyncing}
            >
              <RefreshCw className={`h-3 w-3 mr-1 ${isSyncing ? "animate-spin" : ""}`} />
              Sync
            </Button>
          </div>

          <NotificationBell />

          <Button variant="outline" size="sm" onClick={handleDemoNotifications}>
            Test Alerts
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Bot className="h-4 w-4 mr-2" />
                Mura AI
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Mura AI Assistant</SheetTitle>
              </SheetHeader>
              <div className="flex flex-1 min-h-0 flex-col">
                <div className="px-4 text-xs text-muted-foreground">
                  Chat with Mura for quick help. For deeper workflows, open the full AI module.
                </div>
                <div className="flex-1 min-h-0 p-4">
                  <ScrollArea className="h-full border rounded-md p-3">
                    <div className="space-y-3">
                      {chatMessages.map((m) => (
                        <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[80%] rounded-md px-3 py-2 text-sm ${
                              m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                            }`}
                          >
                            {m.text}
                          </div>
                        </div>
                      ))}
                      {isChatResponding && (
                        <div className="flex justify-start">
                          <div className="bg-muted rounded-md px-3 py-2">
                            <div className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-foreground/60 rounded-full animate-bounce" />
                              <span className="w-1.5 h-1.5 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "0.12s" }} />
                              <span className="w-1.5 h-1.5 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "0.24s" }} />
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>
                  </ScrollArea>
                </div>
                <div className="p-4 pt-0 border-t">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Ask Mura..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          sendChatMessage()
                        }
                      }}
                    />
                    <Button onClick={sendChatMessage} disabled={!chatInput.trim()}>
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <ToastNotifications notifications={toasts} onDismiss={removeToast} />
    </header>
  )
}


