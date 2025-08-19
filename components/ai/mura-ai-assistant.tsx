"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Bot,
  Send,
  TrendingUp,
  CheckCircle,
  BarChart3,
  Users,
  FileText,
  DollarSign,
  Package,
  Calendar,
  Zap,
  Workflow,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  module?: string
  confidence?: number
}

interface AIInsight {
  id: string
  title: string
  description: string
  module: string
  priority: "high" | "medium" | "low"
  action?: string
  impact: string
  confidence: number
}

export function MuraAIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm Mura, your AI assistant for Bumara ERP. I can help you with insights across all modules, automate workflows, and provide intelligent recommendations. How can I assist you today?",
      timestamp: new Date(),
      confidence: 100,
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const aiInsights: AIInsight[] = [
    {
      id: "1",
      title: "Cash Flow Optimization",
      description: "Based on your accounting data, I recommend adjusting payment terms to improve cash flow by 15%",
      module: "Accounting",
      priority: "high",
      action: "Adjust payment terms",
      impact: "15% cash flow improvement",
      confidence: 87,
    },
    {
      id: "2",
      title: "Inventory Reorder Alert",
      description: "5 products are approaching low stock levels. Automated reorder suggestions ready.",
      module: "Inventory",
      priority: "medium",
      action: "Review reorder suggestions",
      impact: "Prevent stockouts",
      confidence: 92,
    },
    {
      id: "3",
      title: "Lead Conversion Opportunity",
      description: "3 high-value leads haven't been contacted in 7 days. Immediate follow-up recommended.",
      module: "CRM",
      priority: "high",
      action: "Schedule follow-ups",
      impact: "Potential $45K revenue",
      confidence: 78,
    },
    {
      id: "4",
      title: "Compliance Deadline Reminder",
      description: "Tax filing deadline in 5 days. All required documents are ready for submission.",
      module: "Compliance",
      priority: "medium",
      action: "Review and submit",
      impact: "Avoid penalties",
      confidence: 95,
    },
    {
      id: "5",
      title: "Payroll Optimization",
      description: "Overtime costs increased 23% this month. Consider workforce planning adjustments.",
      module: "Payroll",
      priority: "medium",
      action: "Review staffing",
      impact: "Reduce overtime costs",
      confidence: 84,
    },
  ]

  const automationSuggestions = [
    {
      title: "Invoice Generation Automation",
      description: "Automatically generate invoices when inventory items are shipped",
      modules: ["Inventory", "Accounting"],
      savings: "4 hours/week",
    },
    {
      title: "Lead Nurturing Workflow",
      description: "Auto-send follow-up emails based on lead engagement scores",
      modules: ["CRM", "Documents"],
      savings: "6 hours/week",
    },
    {
      title: "Compliance Monitoring",
      description: "Automated alerts for upcoming deadlines and missing documents",
      modules: ["Compliance", "Documents"],
      savings: "3 hours/week",
    },
    {
      title: "Payroll Integration",
      description: "Sync attendance data with payroll calculations automatically",
      modules: ["Payroll", "Accounting"],
      savings: "5 hours/week",
    },
  ]

  const crossModuleAnalytics = [
    {
      metric: "Revenue Impact",
      value: "$127K",
      change: "+12%",
      description: "CRM leads converted to Accounting revenue",
    },
    {
      metric: "Cost Savings",
      value: "$23K",
      change: "+8%",
      description: "Inventory optimization reducing carrying costs",
    },
    {
      metric: "Compliance Score",
      value: "94%",
      change: "+3%",
      description: "Document management improving compliance",
    },
    {
      metric: "Efficiency Gain",
      value: "18 hrs",
      change: "+15%",
      description: "AI automation saving weekly hours",
    },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: generateAIResponse(inputMessage),
        timestamp: new Date(),
        confidence: Math.floor(Math.random() * 20) + 80,
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("revenue") || lowerInput.includes("sales")) {
      return "Based on your CRM and Accounting data, I see opportunities to increase revenue by 15% through better lead nurturing and faster invoice processing. Would you like me to create an action plan?"
    }

    if (lowerInput.includes("inventory") || lowerInput.includes("stock")) {
      return "Your inventory analysis shows 5 items need reordering and 3 slow-moving items could be promoted. I can automate reorder points and suggest marketing campaigns for slow movers."
    }

    if (lowerInput.includes("compliance") || lowerInput.includes("tax")) {
      return "Your compliance status is strong at 94%. I've identified 2 upcoming deadlines and can help automate document preparation. All tax filings are on track."
    }

    if (lowerInput.includes("payroll") || lowerInput.includes("employee")) {
      return "Payroll analysis shows overtime costs up 23%. I recommend reviewing staffing patterns and can help optimize schedules to reduce costs while maintaining productivity."
    }

    return "I can help you with insights across all your ERP modules. Try asking about revenue optimization, inventory management, compliance status, or payroll efficiency. What specific area interests you most?"
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

  const getModuleIcon = (module: string) => {
    switch (module) {
      case "Accounting":
        return <DollarSign className="h-4 w-4" />
      case "Inventory":
        return <Package className="h-4 w-4" />
      case "CRM":
        return <Users className="h-4 w-4" />
      case "Compliance":
        return <FileText className="h-4 w-4" />
      case "Payroll":
        return <Calendar className="h-4 w-4" />
      default:
        return <BarChart3 className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Bot className="h-8 w-8 text-amber-600" />
            Mura AI Assistant
          </h1>
          <p className="text-gray-600">Intelligent insights and automation across all ERP modules</p>
        </div>
        <Badge className="bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          AI Active
        </Badge>
      </div>

      {/* Cross-Module Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {crossModuleAnalytics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{metric.change}</span> {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chat">AI Chat</TabsTrigger>
          <TabsTrigger value="insights">Smart Insights</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chat with Mura</CardTitle>
              <CardDescription>Ask questions about your business data and get AI-powered insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ScrollArea className="h-96 w-full border rounded-lg p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                            <span>{message.timestamp.toLocaleTimeString()}</span>
                            {message.confidence && <span>Confidence: {message.confidence}%</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg p-3">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask Mura about your business..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Insights</CardTitle>
              <CardDescription>Smart recommendations based on your business data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiInsights.map((insight) => (
                  <div key={insight.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {getModuleIcon(insight.module)}
                        <div>
                          <h3 className="font-medium">{insight.title}</h3>
                          <p className="text-sm text-gray-600">{insight.description}</p>
                        </div>
                      </div>
                      <Badge className={getPriorityColor(insight.priority)}>{insight.priority}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{insight.module}</span>
                        <span>Impact: {insight.impact}</span>
                        <span>Confidence: {insight.confidence}%</span>
                      </div>
                      {insight.action && (
                        <Button size="sm" variant="outline">
                          {insight.action}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automation Opportunities</CardTitle>
              <CardDescription>AI-suggested workflows to save time and reduce errors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {automationSuggestions.map((suggestion, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium flex items-center gap-2">
                          <Workflow className="h-4 w-4" />
                          {suggestion.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{suggestion.description}</p>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        <Zap className="h-3 w-3 mr-1" />
                        {suggestion.savings}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {suggestion.modules.map((module) => (
                          <Badge key={module} variant="secondary" className="text-xs">
                            {module}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Learn More
                        </Button>
                        <Button size="sm">Enable Automation</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Predictions Accuracy</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Automation Success Rate</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Time Saved This Month</span>
                    <span className="font-medium">47 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cost Savings Generated</span>
                    <span className="font-medium">$12,400</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Module Integration Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Accounting ↔ CRM</span>
                    <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Inventory ↔ Accounting</span>
                    <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Payroll ↔ Compliance</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Documents ↔ All Modules</span>
                    <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
