"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  UserPlus,
  TrendingUp,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Target,
  Plus,
  Download,
  Filter,
  Search,
  MessageSquare,
  Clock,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CRMDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("current-month")
  const [selectedPipeline, setSelectedPipeline] = useState("all")

  const crmMetrics = {
    totalCustomers: 234,
    activeLeads: 47,
    totalDeals: 1200000,
    conversionRate: 24.5,
    avgDealSize: 85000,
    followUpsDue: 12,
  }

  const pipelineStages = [
    { name: "Prospecting", count: 15, value: 450000, color: "bg-blue-500" },
    { name: "Qualification", count: 12, value: 380000, color: "bg-purple-500" },
    { name: "Proposal", count: 8, value: 520000, color: "bg-amber-500" },
    { name: "Negotiation", count: 6, value: 420000, color: "bg-orange-500" },
    { name: "Closed Won", count: 4, value: 340000, color: "bg-green-500" },
    { name: "Closed Lost", count: 2, value: 0, color: "bg-red-500" },
  ]

  const topCustomers = [
    {
      id: "CUST-001",
      name: "Acme Corporation",
      contact: "John Smith",
      email: "john@acme.com",
      phone: "+234 801 234 5678",
      totalValue: 850000,
      lastContact: "2024-01-15",
      status: "active",
      deals: 3,
    },
    {
      id: "CUST-002",
      name: "Tech Solutions Ltd",
      contact: "Sarah Johnson",
      email: "sarah@techsolutions.com",
      phone: "+234 802 345 6789",
      totalValue: 620000,
      lastContact: "2024-01-14",
      status: "prospect",
      deals: 2,
    },
    {
      id: "CUST-003",
      name: "Global Enterprises",
      contact: "Michael Brown",
      email: "michael@global.com",
      phone: "+234 803 456 7890",
      totalValue: 450000,
      lastContact: "2024-01-13",
      status: "active",
      deals: 1,
    },
    {
      id: "CUST-004",
      name: "Innovation Hub",
      contact: "Lisa Davis",
      email: "lisa@innovation.com",
      phone: "+234 804 567 8901",
      totalValue: 380000,
      lastContact: "2024-01-12",
      status: "follow-up",
      deals: 2,
    },
  ]

  const recentActivities = [
    {
      id: "ACT-001",
      type: "call",
      customer: "Acme Corporation",
      contact: "John Smith",
      description: "Follow-up call regarding proposal",
      date: "2024-01-15",
      time: "14:30",
      outcome: "positive",
    },
    {
      id: "ACT-002",
      type: "email",
      customer: "Tech Solutions Ltd",
      contact: "Sarah Johnson",
      description: "Sent product demo invitation",
      date: "2024-01-15",
      time: "11:15",
      outcome: "pending",
    },
    {
      id: "ACT-003",
      type: "meeting",
      customer: "Global Enterprises",
      contact: "Michael Brown",
      description: "Product presentation meeting",
      date: "2024-01-14",
      time: "16:00",
      outcome: "positive",
    },
    {
      id: "ACT-004",
      type: "call",
      customer: "Innovation Hub",
      contact: "Lisa Davis",
      description: "Initial qualification call",
      date: "2024-01-14",
      time: "10:30",
      outcome: "qualified",
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "prospect":
        return "bg-blue-100 text-blue-800"
      case "follow-up":
        return "bg-amber-100 text-amber-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "call":
        return <Phone className="w-4 h-4 text-blue-500" />
      case "email":
        return <Mail className="w-4 h-4 text-green-500" />
      case "meeting":
        return <Calendar className="w-4 h-4 text-purple-500" />
      case "message":
        return <MessageSquare className="w-4 h-4 text-amber-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case "positive":
        return "text-green-600"
      case "qualified":
        return "text-blue-600"
      case "pending":
        return "text-amber-600"
      case "negative":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customer Relationship Management</h1>
          <p className="text-muted-foreground">Manage customers, leads, and sales opportunities</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-month">Current Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{crmMetrics.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{crmMetrics.activeLeads}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />
              +8 new this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(crmMetrics.totalDeals)}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{crmMetrics.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />
              +2.3% improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Deal Size</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(crmMetrics.avgDealSize)}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />
              +5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Follow-ups Due</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{crmMetrics.followUpsDue}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Pipeline */}
            <Card>
              <CardHeader>
                <CardTitle>Sales Pipeline</CardTitle>
                <CardDescription>Current deals by stage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pipelineStages.map((stage, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                        <span className="font-medium">{stage.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {stage.count}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{formatCurrency(stage.value)}</div>
                      </div>
                    </div>
                    <Progress
                      value={(stage.value / Math.max(...pipelineStages.map((s) => s.value))) * 100}
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Customers */}
            <Card>
              <CardHeader>
                <CardTitle>Top Customers</CardTitle>
                <CardDescription>Highest value customers and prospects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topCustomers.map((customer) => (
                  <div key={customer.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {customer.contact} • {customer.deals} deals
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{formatCurrency(customer.totalValue)}</div>
                      <Badge className={getStatusColor(customer.status)} variant="secondary">
                        {customer.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest customer interactions and communications</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All Activities
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-3">
                      {getActivityIcon(activity.type)}
                      <div>
                        <div className="font-medium">{activity.description}</div>
                        <div className="text-sm text-muted-foreground">
                          {activity.customer} • {activity.contact} • {activity.date} at {activity.time}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs capitalize mb-1">
                        {activity.type}
                      </Badge>
                      <div className={`text-sm font-medium ${getOutcomeColor(activity.outcome)}`}>
                        {activity.outcome}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Follow-up Reminders */}
          <Card>
            <CardHeader>
              <CardTitle>Follow-up Reminders</CardTitle>
              <CardDescription>Upcoming tasks and scheduled follow-ups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-red-500" />
                      <div>
                        <div className="font-medium text-red-800">Overdue Follow-ups</div>
                        <div className="text-sm text-red-600">3 customers require immediate attention</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-red-300 text-red-700 bg-transparent">
                      View Overdue
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-amber-500" />
                      <div>
                        <div className="font-medium text-amber-800">Today's Follow-ups</div>
                        <div className="text-sm text-amber-600">9 scheduled calls and meetings</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-amber-300 text-amber-700 bg-transparent">
                      View Schedule
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="font-medium text-blue-800">AI Recommendations</div>
                        <div className="text-sm text-blue-600">5 high-priority leads identified for follow-up</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 bg-transparent">
                      View Suggestions
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Customer Management</CardTitle>
                  <CardDescription>Manage your customer database and relationships</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Customer
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search customers..." className="max-w-sm" />
              </div>
              <div className="text-center py-8 text-muted-foreground">
                Customer management table will be implemented here with advanced filtering, sorting, and contact
                management.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lead Management</CardTitle>
              <CardDescription>Track and nurture potential customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Lead management interface will be implemented here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Pipeline</CardTitle>
              <CardDescription>Visual pipeline management and deal tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Interactive pipeline visualization will be implemented here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
              <CardDescription>Complete history of customer interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Activity timeline and communication history will be implemented here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
