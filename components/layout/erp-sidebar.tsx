"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Calculator,
  Package,
  Users,
  Wallet,
  FileText,
  Bot,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wifi,
  WifiOff,
} from "lucide-react"

interface ERPSidebarProps {
  currentModule: string
  onModuleChange: (module: string) => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

const modules = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: BarChart3,
    description: "Overview & Analytics",
    notifications: 0,
  },
  {
    id: "compliance",
    name: "Compliance",
    icon: Building2,
    description: "Tax & Regulatory",
    notifications: 3,
  },
  {
    id: "accounting",
    name: "Accounting",
    icon: Calculator,
    description: "Financial Management",
    notifications: 5,
  },
  {
    id: "inventory",
    name: "Inventory",
    icon: Package,
    description: "Stock Management",
    notifications: 2,
  },
  {
    id: "crm",
    name: "CRM",
    icon: Users,
    description: "Customer Relations",
    notifications: 7,
  },
  {
    id: "payroll",
    name: "Payroll",
    icon: Wallet,
    description: "Employee Management",
    notifications: 1,
  },
  {
    id: "documents",
    name: "Documents",
    icon: FileText,
    description: "File Management",
    notifications: 4,
  },
  {
    id: "ai-assistant",
    name: "Mura AI",
    icon: Bot,
    description: "AI Assistant",
    notifications: 0,
  },
]

export function ERPSidebar({ currentModule, onModuleChange, isCollapsed = false, onToggleCollapse }: ERPSidebarProps) {
  const [isOnline, setIsOnline] = useState(true)

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-sidebar-foreground">Bumara ERP</h1>
              <p className="text-xs text-muted-foreground">Enterprise Suite</p>
            </div>
          </div>
        )}
        {onToggleCollapse && (
          <Button variant="ghost" size="sm" onClick={onToggleCollapse} className="h-8 w-8 p-0">
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-2">
          {modules.map((module) => {
            const Icon = module.icon
            const isActive = currentModule === module.id

            return (
              <Button
                key={module.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start h-12 px-3",
                  isCollapsed && "px-2",
                  isActive && "bg-primary text-primary-foreground",
                )}
                onClick={() => onModuleChange(module.id)}
              >
                <Icon className={cn("w-5 h-5", !isCollapsed && "mr-3")} />
                {!isCollapsed && (
                  <>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{module.name}</div>
                      <div className="text-xs opacity-70">{module.description}</div>
                    </div>
                    {module.notifications > 0 && (
                      <Badge variant="secondary" className="ml-2 h-5 min-w-5 text-xs">
                        {module.notifications}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            )
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        {!isCollapsed && (
          <div className="space-y-3">
            {/* Sync Status */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Sync Status</span>
              <div className="flex items-center space-x-1">
                {isOnline ? (
                  <>
                    <Wifi className="w-4 h-4 text-green-500" />
                    <span className="text-green-500">Online</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-4 h-4 text-amber-500" />
                    <span className="text-amber-500">Offline</span>
                  </>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                </div>
                <div className="text-muted-foreground">Synced</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Clock className="w-3 h-3 text-amber-500" />
                </div>
                <div className="text-muted-foreground">Pending</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <AlertTriangle className="w-3 h-3 text-red-500" />
                </div>
                <div className="text-muted-foreground">Issues</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
