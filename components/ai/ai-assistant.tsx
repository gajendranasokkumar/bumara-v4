"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bot,
  Send,
  Lightbulb,
  FileText,
  TrendingUp,
  AlertTriangle,
  Calendar,
  Users,
  Zap,
  Brain,
  Target,
  MessageSquare,
  Sparkles,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
} from "lucide-react"

interface ChatMessage {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: string
  context?: {
    type: "form" | "table" | "report" | "general"
    data?: any
  }
  suggestions?: {
    title: string
    action: string
    description: string
  }[]
  attachments?: {
    type: "document" | "chart" | "table"
    title: string
    data: any
  }[]
}

interface AIInsight {
  id: string
  title: string
  description: string
  type: "suggestion" | "warning" | "opportunity" | "prediction"
  priority: "high" | "medium" | "low"
  category: "compliance" | "efficiency" | "risk" | "cost"
  actionable: boolean
  actions?: {
    label: string
    action: string
  }[]
}

interface AIAssistantProps {
  context?: {
    currentPage: string
    formData?: any
    userRole?: string
  }
}

export function AIAssistant({ context }: AIAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm Mura, your AI compliance assistant. I can help you with tax filings, regulatory requirements, document analysis, and compliance insights. What would you like to know?",
      timestamp: new Date().toISOString(),
      suggestions: [
        { title: "Review VAT Filing", action: "review_vat", description: "Check your upcoming VAT return" },
        { title: "Compliance Health Check", action: "health_check", description: "Analyze your compliance status" },
        { title: "Document Analysis", action: "analyze_docs", description: "Review uploaded documents" },
      ],
    },
  ])

  const [currentMessage, setCurrentMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [insights, setInsights] = useState<AIInsight[]>([
    {
      id: "1",
      title: "VAT Filing Optimization",
      description:
        "Your VAT filing process could be streamlined by automating document collection 3 days before the deadline.",
      type: "suggestion",
      priority: "medium",
      category: "efficiency",
      actionable: true,
      actions: [
        { label: "Set Up Automation", action: "setup_automation" },
        { label: "Learn More", action: "learn_more" },
      ],
    },
    {
      id: "2",
      title: "Compliance Risk Alert",
      description:
        "3 regulatory filings are approaching their deadlines within the next 7 days. Consider prioritizing these submissions.",
      type: "warning",
      priority: "high",
      category: "risk",
      actionable: true,
      actions: [
        { label: "View Filings", action: "view_filings" },
        { label: "Schedule Review", action: "schedule_review" },
      ],
    },
    {
      id: "3",
      title: "Cost Savings Opportunity",
      description:
        "Based on your filing patterns, switching to quarterly submissions could reduce processing costs by 15%.",
      type: "opportunity",
      priority: "medium",
      category: "cost",
      actionable: true,
      actions: [
        { label: "Calculate Savings", action: "calculate_savings" },
        { label: "Switch Schedule", action: "switch_schedule" },
      ],
    },
    {
      id: "4",
      title: "Compliance Score Prediction",
      description: "Your compliance score is predicted to reach 97% next quarter if current trends continue.",
      type: "prediction",
      priority: "low",
      category: "compliance",
      actionable: false,
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: currentMessage,
      timestamp: new Date().toISOString(),
      context: context
        ? {
            type: context.currentPage as any,
            data: context.formData,
          }
        : undefined,
    }

    setMessages((prev) => [...prev, userMessage])
    setCurrentMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(currentMessage, context)
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string, context?: any): ChatMessage => {
    const lowerInput = userInput.toLowerCase()

    let response = ""
    let suggestions: any[] = []
    let attachments: any[] = []

    if (lowerInput.includes("vat") || lowerInput.includes("tax")) {
      response =
        "I can help you with VAT and tax-related queries. Your VAT return for Q4 2024 is due in 3 days. All required documents have been uploaded and are ready for review. Would you like me to perform a pre-submission check?"
      suggestions = [
        {
          title: "Pre-submission Check",
          action: "pre_check",
          description: "Validate your VAT return before submission",
        },
        { title: "View Documents", action: "view_docs", description: "Review uploaded supporting documents" },
        { title: "Schedule Submission", action: "schedule", description: "Set a reminder for submission" },
      ]
    } else if (lowerInput.includes("compliance") || lowerInput.includes("status")) {
      response =
        "Your current compliance status looks good! You have a 94% compliance score with 3 pending filings. 2 of these are due this week. I recommend prioritizing the VAT return and PAYE monthly filing."
      attachments = [
        {
          type: "chart",
          title: "Compliance Score Trend",
          data: { score: 94, trend: "up", change: "+2%" },
        },
      ]
    } else if (lowerInput.includes("deadline") || lowerInput.includes("due")) {
      response =
        "Here are your upcoming deadlines:\n\n• VAT Return Q4 2024 - Due in 3 days (High Priority)\n• PAYE Monthly Return - Due in 12 days (Medium Priority)\n• Annual Audit Report - Due in 27 days (Medium Priority)\n\nWould you like me to set up automated reminders for these?"
      suggestions = [
        { title: "Set Reminders", action: "set_reminders", description: "Configure deadline notifications" },
        { title: "Prioritize Tasks", action: "prioritize", description: "Help organize your workflow" },
      ]
    } else if (lowerInput.includes("document") || lowerInput.includes("upload")) {
      response =
        "I can help you with document management. You currently have 7 documents pending review, with 3 awaiting approval. I've analyzed your recent uploads and they appear to be complete and compliant with requirements."
      suggestions = [
        { title: "Review Documents", action: "review_docs", description: "Check pending documents" },
        { title: "Bulk Approve", action: "bulk_approve", description: "Approve multiple documents" },
      ]
    } else if (lowerInput.includes("help") || lowerInput.includes("how")) {
      response =
        "I'm here to help! I can assist you with:\n\n• Tax filing guidance and validation\n• Compliance status monitoring\n• Document analysis and review\n• Deadline management and reminders\n• Risk assessment and recommendations\n• Process optimization suggestions\n\nWhat specific area would you like help with?"
    } else {
      response =
        "I understand you're asking about compliance matters. Based on your current context, I can provide insights about your tax filings, regulatory requirements, or document management. Could you be more specific about what you'd like to know?"
      suggestions = [
        { title: "Tax Guidance", action: "tax_help", description: "Get help with tax filings" },
        { title: "Compliance Check", action: "compliance_check", description: "Review your compliance status" },
        { title: "Document Help", action: "doc_help", description: "Assistance with documents" },
      ]
    }

    return {
      id: Date.now().toString(),
      type: "assistant",
      content: response,
      timestamp: new Date().toISOString(),
      suggestions,
      attachments,
    }
  }

  const handleSuggestionClick = (action: string) => {
    console.log(`Executing AI suggestion: ${action}`)
    // Handle specific AI suggestions
  }

  const handleInsightAction = (action: string) => {
    console.log(`Executing insight action: ${action}`)
    // Handle insight actions
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "suggestion":
        return <Lightbulb className="h-4 w-4 text-blue-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "opportunity":
        return <Target className="h-4 w-4 text-green-600" />
      case "prediction":
        return <TrendingUp className="h-4 w-4 text-purple-600" />
      default:
        return <Brain className="h-4 w-4 text-gray-600" />
    }
  }

  const getInsightColor = (type: string, priority: string) => {
    const baseColors = {
      suggestion: "border-blue-200 bg-blue-50",
      warning: "border-red-200 bg-red-50",
      opportunity: "border-green-200 bg-green-50",
      prediction: "border-purple-200 bg-purple-50",
    }
    return baseColors[type as keyof typeof baseColors] || "border-gray-200 bg-gray-50"
  }

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800",
    }
    return colors[priority as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 p-4 border-b border-border">
        <Bot className="h-5 w-5 text-primary" />
        <div>
          <h3 className="font-semibold">Mura AI Assistant</h3>
          <p className="text-xs text-muted-foreground">Intelligent compliance guidance</p>
        </div>
        <div className="ml-auto">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
            Online
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-4 pt-2">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat" className="text-xs">
              <MessageSquare className="h-3 w-3 mr-1" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="insights" className="text-xs">
              <Brain className="h-3 w-3 mr-1" />
              Insights
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              Analytics
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="chat" className="flex-1 flex flex-col mt-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.type === "assistant" && <Bot className="h-4 w-4 mt-0.5 text-primary" />}
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>

                        {message.attachments && (
                          <div className="mt-3 space-y-2">
                            {message.attachments.map((attachment, index) => (
                              <div key={index} className="p-2 bg-background rounded border">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-3 w-3" />
                                  <span className="text-xs font-medium">{attachment.title}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {message.suggestions && (
                          <div className="mt-3 space-y-2">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="w-full justify-start text-xs bg-background"
                                onClick={() => handleSuggestionClick(suggestion.action)}
                              >
                                <Sparkles className="h-3 w-3 mr-2" />
                                {suggestion.title}
                              </Button>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </span>
                          {message.type === "assistant" && (
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <ThumbsUp className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <ThumbsDown className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-primary" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                placeholder="Ask me about compliance, tax filings, or documents..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!currentMessage.trim() || isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              AI responses are generated based on your compliance data and may not always be accurate.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="flex-1 mt-0">
          <ScrollArea className="h-full p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">AI Insights & Recommendations</h4>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Refresh
                </Button>
              </div>

              {insights.map((insight) => (
                <Card key={insight.id} className={`border-l-4 ${getInsightColor(insight.type, insight.priority)}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">{getInsightIcon(insight.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h5 className="font-medium text-sm">{insight.title}</h5>
                          <Badge className={getPriorityBadge(insight.priority)} variant="outline">
                            {insight.priority}
                          </Badge>
                          <Badge variant="outline" className="text-xs capitalize">
                            {insight.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>

                        {insight.actionable && insight.actions && (
                          <div className="flex gap-2">
                            {insight.actions.map((action, index) => (
                              <Button
                                key={index}
                                variant={index === 0 ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleInsightAction(action.action)}
                              >
                                {action.label}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="analytics" className="flex-1 mt-0">
          <ScrollArea className="h-full p-4">
            <div className="space-y-4">
              <h4 className="font-medium">AI-Powered Analytics</h4>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Compliance Predictions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Next Month Score</span>
                    <span className="font-medium text-green-600">96%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Risk Level</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Efficiency Gain</span>
                    <span className="font-medium text-blue-600">+12%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Smart Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="h-3 w-3 text-yellow-500" />
                      <span className="font-medium">Process Automation</span>
                    </div>
                    <p className="text-muted-foreground text-xs">Automate 3 recurring tasks to save 4 hours/week</p>
                  </div>

                  <div className="text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-3 w-3 text-blue-500" />
                      <span className="font-medium">Schedule Optimization</span>
                    </div>
                    <p className="text-muted-foreground text-xs">Adjust filing schedule to reduce peak workload</p>
                  </div>

                  <div className="text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="h-3 w-3 text-green-500" />
                      <span className="font-medium">Team Efficiency</span>
                    </div>
                    <p className="text-muted-foreground text-xs">Redistribute tasks for 20% faster processing</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Deadline Risk</span>
                      <span className="text-red-600">High</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Compliance Risk</span>
                      <span className="text-yellow-600">Medium</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Document Risk</span>
                      <span className="text-green-600">Low</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
