"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TaxFilingForm } from "@/components/forms/tax-filing-form"
import { DocumentUploadForm } from "@/components/forms/document-upload-form"
import { ComplianceDataTable } from "@/components/tables/compliance-data-table"
import { ComplianceReports } from "@/components/reports/compliance-reports"
import { NotificationCenter } from "@/components/notifications/notification-center"
import { ArrowLeft, Bell, Clock, TrendingUp, Shield, Bot } from "lucide-react"

interface ComplianceItem {
  id: string
  title: string
  dueDate: string
  status: "completed" | "pending" | "overdue" | "upcoming"
  priority: "high" | "medium" | "low"
  type: "tax" | "regulatory" | "document" | "audit"
}

interface NotificationItem {
  id: string
  title: string
  message: string
  type: "deadline" | "approval" | "sync" | "ai-suggestion"
  timestamp: string
  read: boolean
}

export function ComplianceDashboard() {

  const complianceItems: ComplianceItem[] = [
    {
      id: "1",
      title: "VAT Return Filing",
      dueDate: "2025-01-22",
      status: "upcoming",
      priority: "high",
      type: "tax",
    },
    {
      id: "2",
      title: "Quarterly Regulatory Report",
      dueDate: "2025-01-31",
      status: "pending",
      priority: "medium",
      type: "regulatory",
    },
    {
      id: "3",
      title: "Employee Tax Certificates",
      dueDate: "2025-01-15",
      status: "completed",
      priority: "high",
      type: "document",
    },
    {
      id: "4",
      title: "Annual Audit Preparation",
      dueDate: "2025-02-28",
      status: "pending",
      priority: "medium",
      type: "audit",
    },
  ]

  const [activeForm, setActiveForm] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200"
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Notifications UI moved to the top navbar

  // AI assistant controls moved to the top navbar

  return (
    <div className="h-full min-h-0 bg-background">
      <div className="flex min-h-0 overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Show form with Back when active */}
          {activeForm ? (
            <>
              <div className="mb-4">
                <Button variant="ghost" size="sm" onClick={() => setActiveForm(null)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </div>
              {activeForm === "tax-filing" && <TaxFilingForm />} 
              {activeForm === "document-upload" && <DocumentUploadForm />} 
              {activeForm === "data-table" && <ComplianceDataTable />} 
              {activeForm === "reports" && <ComplianceReports />} 
              {activeForm === "notifications" && <NotificationCenter />} 
            </>
          ) : (
            <>
              {/* Overview Cards */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Filings</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">3</div>
                    <p className="text-xs text-muted-foreground">2 due this week</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">94%</div>
                    <p className="text-xs text-muted-foreground">+2% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Documents Pending</CardTitle>
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">7</div>
                    <p className="text-xs text-muted-foreground">3 require approval</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">AI Suggestions</CardTitle>
                    <Bot className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">5</div>
                    <p className="text-xs text-muted-foreground">New recommendations</p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Button onClick={() => setActiveForm("tax-filing")} className="h-20 flex-col gap-2">
                  <Clock className="h-6 w-6" />
                  File Tax Return
                </Button>
                <Button
                  onClick={() => setActiveForm("document-upload")}
                  variant="outline"
                  className="h-20 flex-col gap-2"
                >
                  <Shield className="h-6 w-6" />
                  Upload Documents
                </Button>
                <Button onClick={() => setActiveForm("data-table")} variant="outline" className="h-20 flex-col gap-2">
                  <TrendingUp className="h-6 w-6" />
                  View Records
                </Button>
                <Button onClick={() => setActiveForm("reports")} variant="outline" className="h-20 flex-col gap-2">
                  <Bell className="h-6 w-6" />
                  Generate Reports
                </Button>
              </div>

              {/* Recent Compliance Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Compliance Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {complianceItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">Due: {item.dueDate}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                          <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </main>

        {/* AI Assistant Sidebar moved to top navbar */}
      </div>
    </div>
  )
}
