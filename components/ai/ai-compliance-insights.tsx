"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp, AlertTriangle, Clock, Target } from "lucide-react"

interface AIInsight {
  id: string
  type: "risk" | "opportunity" | "deadline" | "optimization"
  title: string
  description: string
  confidence: number
  priority: "high" | "medium" | "low"
  actionable: boolean
  estimatedImpact: string
}

export function AIComplianceInsights() {
  const [insights, setInsights] = useState<AIInsight[]>([
    {
      id: "1",
      type: "deadline",
      title: "VAT Filing Deadline Approaching",
      description: "Your VAT return is due in 3 days. All required documents are ready for submission.",
      confidence: 95,
      priority: "high",
      actionable: true,
      estimatedImpact: "Avoid penalties",
    },
    {
      id: "2",
      type: "optimization",
      title: "Automate Monthly PAYE Returns",
      description: "Based on your filing patterns, automating PAYE returns could save 4 hours monthly.",
      confidence: 87,
      priority: "medium",
      actionable: true,
      estimatedImpact: "Save 48 hours/year",
    },
    {
      id: "3",
      type: "risk",
      title: "Potential Compliance Gap",
      description: "Missing documentation for Q4 regulatory report may cause delays.",
      confidence: 78,
      priority: "high",
      actionable: true,
      estimatedImpact: "Prevent delays",
    },
    {
      id: "4",
      type: "opportunity",
      title: "Tax Optimization Available",
      description: "Recent expense patterns suggest potential tax deductions worth reviewing.",
      confidence: 82,
      priority: "medium",
      actionable: true,
      estimatedImpact: "Potential savings",
    },
  ])

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "risk":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "opportunity":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "deadline":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "optimization":
        return <Target className="h-4 w-4 text-blue-500" />
      default:
        return <Brain className="h-4 w-4" />
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Compliance Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getInsightIcon(insight.type)}
                  <h3 className="font-medium">{insight.title}</h3>
                </div>
                <Badge className={getPriorityColor(insight.priority)}>{insight.priority}</Badge>
              </div>

              <p className="text-sm text-muted-foreground">{insight.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Confidence:</span>
                  <Progress value={insight.confidence} className="w-16 h-2" />
                  <span className="text-xs font-medium">{insight.confidence}%</span>
                </div>
                <span className="text-xs text-green-600 font-medium">{insight.estimatedImpact}</span>
              </div>

              {insight.actionable && (
                <Button size="sm" variant="outline" className="w-full bg-transparent">
                  Take Action
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
