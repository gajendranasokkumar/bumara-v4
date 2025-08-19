"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Bot,
} from "lucide-react"

interface ReportData {
  period: string
  completed: number
  pending: number
  overdue: number
  total: number
  amount: number
}

interface ComplianceMetric {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: React.ReactNode
}

export function ComplianceReports() {
  const [selectedPeriod, setSelectedPeriod] = useState("last-12-months")
  const [selectedReport, setSelectedReport] = useState("overview")

  // Sample data for charts
  const monthlyData: ReportData[] = [
    { period: "Jan", completed: 12, pending: 3, overdue: 1, total: 16, amount: 450000 },
    { period: "Feb", completed: 15, pending: 2, overdue: 0, total: 17, amount: 520000 },
    { period: "Mar", completed: 18, pending: 4, overdue: 2, total: 24, amount: 680000 },
    { period: "Apr", completed: 14, pending: 3, overdue: 1, total: 18, amount: 390000 },
    { period: "May", completed: 20, pending: 5, overdue: 0, total: 25, amount: 750000 },
    { period: "Jun", completed: 16, pending: 2, overdue: 1, total: 19, amount: 580000 },
    { period: "Jul", completed: 22, pending: 3, overdue: 2, total: 27, amount: 820000 },
    { period: "Aug", completed: 19, pending: 4, overdue: 1, total: 24, amount: 690000 },
    { period: "Sep", completed: 17, pending: 2, overdue: 0, total: 19, amount: 610000 },
    { period: "Oct", completed: 21, pending: 6, overdue: 3, total: 30, amount: 890000 },
    { period: "Nov", completed: 18, pending: 3, overdue: 1, total: 22, amount: 720000 },
    { period: "Dec", completed: 25, pending: 4, overdue: 2, total: 31, amount: 950000 },
  ]

  const complianceByType = [
    { name: "Tax Filings", value: 45, color: "#dc2626" },
    { name: "Regulatory Reports", value: 25, color: "#f59e0b" },
    { name: "Documents", value: 20, color: "#10b981" },
    { name: "Audits", value: 10, color: "#6366f1" },
  ]

  const metrics: ComplianceMetric[] = [
    {
      title: "Compliance Rate",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      icon: <CheckCircle className="h-4 w-4" />,
    },
    {
      title: "Avg. Processing Time",
      value: "3.2 days",
      change: "-0.8 days",
      trend: "up",
      icon: <Clock className="h-4 w-4" />,
    },
    {
      title: "Total Tax Amount",
      value: "₦8.06M",
      change: "+12.5%",
      trend: "up",
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      title: "Active Filings",
      value: "267",
      change: "+18",
      trend: "up",
      icon: <FileText className="h-4 w-4" />,
    },
  ]

  const riskAssessment = [
    { category: "High Risk", count: 3, percentage: 12 },
    { category: "Medium Risk", count: 8, percentage: 32 },
    { category: "Low Risk", count: 14, percentage: 56 },
  ]

  const upcomingDeadlines = [
    { title: "VAT Return Q4", dueDate: "2025-01-22", daysLeft: 3, priority: "high" },
    { title: "PAYE Monthly Return", dueDate: "2025-01-31", daysLeft: 12, priority: "medium" },
    { title: "Annual Audit Report", dueDate: "2025-02-15", daysLeft: 27, priority: "medium" },
    { title: "Regulatory Filing", dueDate: "2025-02-28", daysLeft: 40, priority: "low" },
  ]

  const generateReport = (type: string) => {
    console.log(`Generating ${type} report...`)
    // Simulate report generation
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Compliance Reports & Analytics</h2>
          <p className="text-muted-foreground">Comprehensive insights into your compliance performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
              <SelectItem value="last-12-months">Last 12 Months</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {metric.icon}
                  <span className="text-sm font-medium text-muted-foreground">{metric.title}</span>
                </div>
                <div className="flex items-center gap-1">
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : metric.trend === "down" ? (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  ) : null}
                  <span
                    className={`text-xs ${
                      metric.trend === "up"
                        ? "text-green-600"
                        : metric.trend === "down"
                          ? "text-red-600"
                          : "text-muted-foreground"
                    }`}
                  >
                    {metric.change}
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold">{metric.value}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Insights */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Bot className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-blue-800 mb-2">AI Insights & Recommendations</h3>
              <div className="space-y-2 text-sm text-blue-700">
                <p>• Your compliance rate has improved by 2.1% this month. Consider maintaining current processes.</p>
                <p>• 3 high-priority filings are due within the next week. Schedule review sessions to avoid delays.</p>
                <p>• Tax processing time has decreased by 0.8 days on average - efficiency improvements are working.</p>
                <p>• Consider automating PAYE monthly returns to reduce manual workload by an estimated 40%.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Tabs */}
      <Tabs value={selectedReport} onValueChange={setSelectedReport} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Monthly Compliance Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Compliance Trend</CardTitle>
                <CardDescription>Filing status over the past 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="completed"
                      stackId="1"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="pending"
                      stackId="1"
                      stroke="#f59e0b"
                      fill="#f59e0b"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="overdue"
                      stackId="1"
                      stroke="#dc2626"
                      fill="#dc2626"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Compliance by Type */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance by Type</CardTitle>
                <CardDescription>Distribution of compliance activities</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={complianceByType}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {complianceByType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {complianceByType.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">{item.name}</span>
                      <span className="text-sm text-muted-foreground">({item.value}%)</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Critical filings due in the next 60 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium">{deadline.title}</h4>
                        <p className="text-sm text-muted-foreground">Due: {deadline.dueDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={
                          deadline.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : deadline.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }
                      >
                        {deadline.priority}
                      </Badge>
                      <span
                        className={`text-sm font-medium ${
                          deadline.daysLeft <= 7
                            ? "text-red-600"
                            : deadline.daysLeft <= 14
                              ? "text-yellow-600"
                              : "text-green-600"
                        }`}
                      >
                        {deadline.daysLeft} days left
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>Detailed performance metrics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="total" stroke="#6366f1" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
                <CardDescription>Current compliance risk levels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {riskAssessment.map((risk, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{risk.category}</span>
                      <span className="text-sm text-muted-foreground">{risk.count} items</span>
                    </div>
                    <Progress value={risk.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Mitigation</CardTitle>
                <CardDescription>Recommended actions to reduce risk</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 border border-red-200 bg-red-50 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-800">High Priority</p>
                      <p className="text-xs text-red-700">Review overdue VAT filing immediately</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
                    <Clock className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Medium Priority</p>
                      <p className="text-xs text-yellow-700">Schedule quarterly review meetings</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border border-green-200 bg-green-50 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Low Priority</p>
                      <p className="text-xs text-green-700">Maintain current documentation standards</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Forecasting</CardTitle>
              <CardDescription>Predicted compliance trends and workload</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  Advanced forecasting models will be implemented in the next phase
                </p>
                <Button onClick={() => generateReport("forecasting")}>Generate Forecast Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Report Generation</CardTitle>
          <CardDescription>Generate specific compliance reports instantly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" onClick={() => generateReport("tax-summary")} className="h-auto p-4 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              <span className="font-medium">Tax Summary</span>
              <span className="text-xs text-muted-foreground">Annual tax overview</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => generateReport("compliance-status")}
              className="h-auto p-4 flex-col"
            >
              <CheckCircle className="h-6 w-6 mb-2" />
              <span className="font-medium">Compliance Status</span>
              <span className="text-xs text-muted-foreground">Current status report</span>
            </Button>
            <Button variant="outline" onClick={() => generateReport("audit-trail")} className="h-auto p-4 flex-col">
              <Users className="h-6 w-6 mb-2" />
              <span className="font-medium">Audit Trail</span>
              <span className="text-xs text-muted-foreground">Activity log report</span>
            </Button>
            <Button variant="outline" onClick={() => generateReport("risk-assessment")} className="h-auto p-4 flex-col">
              <AlertTriangle className="h-6 w-6 mb-2" />
              <span className="font-medium">Risk Assessment</span>
              <span className="text-xs text-muted-foreground">Risk analysis report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
