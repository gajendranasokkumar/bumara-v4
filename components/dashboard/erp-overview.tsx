"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Building2,
  Calculator,
  Package,
  Users,
  Wallet,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  ArrowRight,
} from "lucide-react"

interface ERPOverviewProps {
  onModuleSelect: (module: string) => void
}

export function ERPOverview({ onModuleSelect }: ERPOverviewProps) {
  const moduleStats = [
    {
      id: "compliance",
      name: "Compliance",
      icon: Building2,
      status: "warning",
      progress: 75,
      alerts: 3,
      description: "3 tax filings due this week",
      metrics: { completed: 12, pending: 3, overdue: 1 },
    },
    {
      id: "accounting",
      name: "Accounting",
      icon: Calculator,
      status: "active",
      progress: 92,
      alerts: 5,
      description: "Monthly reconciliation in progress",
      metrics: { revenue: "₦2.4M", expenses: "₦1.8M", profit: "₦600K" },
    },
    {
      id: "inventory",
      name: "Inventory",
      icon: Package,
      status: "warning",
      progress: 68,
      alerts: 2,
      description: "Low stock alerts for 12 items",
      metrics: { items: 1247, lowStock: 12, orders: 34 },
    },
    {
      id: "crm",
      name: "CRM",
      icon: Users,
      status: "active",
      progress: 85,
      alerts: 7,
      description: "47 new leads this month",
      metrics: { leads: 47, customers: 234, deals: "₦1.2M" },
    },
    {
      id: "payroll",
      name: "Payroll",
      icon: Wallet,
      status: "success",
      progress: 100,
      alerts: 1,
      description: "December payroll completed",
      metrics: { employees: 45, processed: "₦3.2M", pending: 0 },
    },
    {
      id: "documents",
      name: "Documents",
      icon: FileText,
      status: "active",
      progress: 78,
      alerts: 4,
      description: "8 documents pending approval",
      metrics: { total: 1456, pending: 8, approved: 1448 },
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-500"
      case "warning":
        return "text-amber-500"
      case "error":
        return "text-red-500"
      default:
        return "text-blue-500"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-amber-100 text-amber-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">ERP Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your business overview for today.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            All Systems Online
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦2.4M</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />
              +47 new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              <AlertTriangle className="inline w-3 h-3 mr-1 text-amber-500" />3 high priority
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">98%</div>
            <p className="text-xs text-muted-foreground">All modules operational</p>
          </CardContent>
        </Card>
      </div>

      {/* Module Overview */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Module Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moduleStats.map((module) => {
            const Icon = module.icon
            return (
              <Card key={module.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className={`w-5 h-5 ${getStatusColor(module.status)}`} />
                      <CardTitle className="text-base">{module.name}</CardTitle>
                    </div>
                    {module.alerts > 0 && (
                      <Badge variant="secondary" className="h-5">
                        {module.alerts}
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge className={getStatusBadge(module.status)}>
                      {module.status === "success" && "Complete"}
                      {module.status === "warning" && "Attention"}
                      {module.status === "error" && "Issues"}
                      {module.status === "active" && "Active"}
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={() => onModuleSelect(module.id)} className="h-8 px-2">
                      View <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates across all modules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                module: "Payroll",
                action: "December payroll processed successfully",
                time: "2 hours ago",
                status: "success",
              },
              {
                module: "Compliance",
                action: "VAT filing reminder - Due in 3 days",
                time: "4 hours ago",
                status: "warning",
              },
              {
                module: "Inventory",
                action: "Low stock alert for 12 items",
                time: "6 hours ago",
                status: "warning",
              },
              {
                module: "CRM",
                action: "New lead: Acme Corp - ₦500K potential",
                time: "8 hours ago",
                status: "active",
              },
              {
                module: "Accounting",
                action: "Monthly reconciliation completed",
                time: "1 day ago",
                status: "success",
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(activity.status).replace("text-", "bg-")}`} />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">{activity.module}</span>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
