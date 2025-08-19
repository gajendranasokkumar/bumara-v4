"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Bot, Lightbulb, AlertTriangle, CheckCircle, X, Zap, Calculator, Clock } from "lucide-react"

interface FormField {
  name: string
  value: any
  type: string
  required?: boolean
}

interface AIFormSuggestion {
  id: string
  field: string
  type: "validation" | "suggestion" | "calculation" | "warning" | "completion"
  title: string
  message: string
  action?: {
    label: string
    value: any
  }
  confidence: number
}

interface AIFormAssistantProps {
  formData: Record<string, any>
  formType: "tax-filing" | "document-upload" | "regulatory-report"
  onSuggestionApply: (field: string, value: any) => void
  onFieldFocus?: (field: string) => void
}

export function AIFormAssistant({ formData, formType, onSuggestionApply, onFieldFocus }: AIFormAssistantProps) {
  const [suggestions, setSuggestions] = useState<AIFormSuggestion[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showAssistant, setShowAssistant] = useState(true)

  useEffect(() => {
    analyzeForm()
  }, [formData, formType])

  const analyzeForm = async () => {
    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      const newSuggestions = generateSuggestions(formData, formType)
      setSuggestions(newSuggestions)
      setIsAnalyzing(false)
    }, 1000)
  }

  const generateSuggestions = (data: Record<string, any>, type: string): AIFormSuggestion[] => {
    const suggestions: AIFormSuggestion[] = []

    if (type === "tax-filing") {
      // VAT calculation suggestion
      if (data.totalRevenue && !data.vatAmount) {
        const suggestedVAT = Number.parseFloat(data.totalRevenue) * 0.075 // 7.5% VAT rate
        suggestions.push({
          id: "vat-calc",
          field: "vatAmount",
          type: "calculation",
          title: "VAT Amount Calculation",
          message: `Based on your total revenue of ₦${Number.parseFloat(data.totalRevenue).toLocaleString()}, the VAT amount should be approximately ₦${suggestedVAT.toLocaleString()} (7.5% rate).`,
          action: {
            label: "Apply Calculation",
            value: suggestedVAT.toString(),
          },
          confidence: 95,
        })
      }

      // Tax period validation
      if (data.filingType === "vat" && data.taxPeriod !== "monthly") {
        suggestions.push({
          id: "tax-period",
          field: "taxPeriod",
          type: "suggestion",
          title: "Recommended Tax Period",
          message:
            "For VAT filings, monthly submissions are typically required for businesses with annual turnover above ₦25 million.",
          action: {
            label: "Switch to Monthly",
            value: "monthly",
          },
          confidence: 80,
        })
      }

      // Date validation
      if (data.startDate && data.endDate) {
        const start = new Date(data.startDate)
        const end = new Date(data.endDate)
        const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24))

        if (diffDays > 93) {
          // More than 3 months
          suggestions.push({
            id: "date-range",
            field: "endDate",
            type: "warning",
            title: "Unusual Date Range",
            message: `The selected period spans ${diffDays} days, which is longer than typical quarterly filings. Please verify the dates are correct.`,
            confidence: 70,
          })
        }
      }

      // Completion suggestion
      const requiredFields = ["filingType", "taxPeriod", "startDate", "endDate", "totalRevenue", "submitterName"]
      const completedFields = requiredFields.filter((field) => data[field])
      const completionRate = (completedFields.length / requiredFields.length) * 100

      if (completionRate >= 70 && completionRate < 100) {
        suggestions.push({
          id: "completion",
          field: "form",
          type: "completion",
          title: "Form Almost Complete",
          message: `Your form is ${Math.round(completionRate)}% complete. Complete the remaining required fields to submit.`,
          confidence: 100,
        })
      }

      // PAYE calculation
      if (data.filingType === "paye" && data.totalRevenue && !data.payeAmount) {
        const estimatedPAYE = Number.parseFloat(data.totalRevenue) * 0.1 // Rough estimate
        suggestions.push({
          id: "paye-calc",
          field: "payeAmount",
          type: "calculation",
          title: "PAYE Estimation",
          message: `Based on your revenue, estimated PAYE could be around ₦${estimatedPAYE.toLocaleString()}. Please verify with actual payroll data.`,
          action: {
            label: "Use Estimate",
            value: estimatedPAYE.toString(),
          },
          confidence: 60,
        })
      }
    }

    if (type === "document-upload") {
      // Document type suggestion
      if (!data.documentType && data.title) {
        const title = data.title.toLowerCase()
        let suggestedType = ""

        if (title.includes("bank") || title.includes("statement")) {
          suggestedType = "bank-statement"
        } else if (title.includes("receipt") || title.includes("invoice")) {
          suggestedType = "receipt"
        } else if (title.includes("certificate")) {
          suggestedType = "tax-certificate"
        }

        if (suggestedType) {
          suggestions.push({
            id: "doc-type",
            field: "documentType",
            type: "suggestion",
            title: "Document Type Suggestion",
            message: `Based on the title "${data.title}", this appears to be a ${suggestedType.replace("-", " ")}.`,
            action: {
              label: "Apply Suggestion",
              value: suggestedType,
            },
            confidence: 85,
          })
        }
      }

      // Category suggestion
      if (data.documentType && !data.category) {
        const categoryMap: Record<string, string> = {
          "tax-certificate": "tax-documents",
          "bank-statement": "financial-records",
          receipt: "financial-records",
          contract: "legal-documents",
          license: "legal-documents",
        }

        const suggestedCategory = categoryMap[data.documentType]
        if (suggestedCategory) {
          suggestions.push({
            id: "category",
            field: "category",
            type: "suggestion",
            title: "Category Suggestion",
            message: `Documents of type "${data.documentType}" typically belong to the "${suggestedCategory.replace("-", " ")}" category.`,
            action: {
              label: "Apply Category",
              value: suggestedCategory,
            },
            confidence: 90,
          })
        }
      }

      // Priority suggestion
      if (data.documentType === "tax-certificate" && data.priority !== "high") {
        suggestions.push({
          id: "priority",
          field: "priority",
          type: "suggestion",
          title: "Priority Recommendation",
          message: "Tax certificates typically require high priority processing due to compliance requirements.",
          action: {
            label: "Set High Priority",
            value: "high",
          },
          confidence: 80,
        })
      }
    }

    return suggestions
  }

  const applySuggestion = (suggestion: AIFormSuggestion) => {
    if (suggestion.action) {
      onSuggestionApply(suggestion.field, suggestion.action.value)
      setSuggestions((prev) => prev.filter((s) => s.id !== suggestion.id))
    }
  }

  const dismissSuggestion = (suggestionId: string) => {
    setSuggestions((prev) => prev.filter((s) => s.id !== suggestionId))
  }

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case "calculation":
        return <Calculator className="h-4 w-4 text-blue-600" />
      case "suggestion":
        return <Lightbulb className="h-4 w-4 text-yellow-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "validation":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "completion":
        return <Clock className="h-4 w-4 text-purple-600" />
      default:
        return <Bot className="h-4 w-4 text-gray-600" />
    }
  }

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case "calculation":
        return "border-blue-200 bg-blue-50"
      case "suggestion":
        return "border-yellow-200 bg-yellow-50"
      case "warning":
        return "border-red-200 bg-red-50"
      case "validation":
        return "border-green-200 bg-green-50"
      case "completion":
        return "border-purple-200 bg-purple-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  if (!showAssistant || (suggestions.length === 0 && !isAnalyzing)) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowAssistant(true)}
        className="fixed bottom-4 right-4 z-50"
      >
        <Bot className="h-4 w-4 mr-2" />
        AI Assistant
      </Button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80">
      <Card className="border-2 border-primary/20 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">AI Form Assistant</span>
              {isAnalyzing && (
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-primary rounded-full animate-bounce" />
                  <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowAssistant(false)} className="h-6 w-6 p-0">
              <X className="h-3 w-3" />
            </Button>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {suggestions.map((suggestion) => (
              <Alert key={suggestion.id} className={getSuggestionColor(suggestion.type)}>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">{getSuggestionIcon(suggestion.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{suggestion.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {suggestion.confidence}% confident
                      </Badge>
                    </div>
                    <AlertDescription className="text-xs mb-3">{suggestion.message}</AlertDescription>
                    <div className="flex items-center gap-2">
                      {suggestion.action && (
                        <Button size="sm" onClick={() => applySuggestion(suggestion)} className="text-xs">
                          <Zap className="h-3 w-3 mr-1" />
                          {suggestion.action.label}
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dismissSuggestion(suggestion.id)}
                        className="text-xs"
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
              </Alert>
            ))}

            {isAnalyzing && (
              <div className="text-center py-4">
                <Bot className="h-8 w-8 text-primary mx-auto mb-2 animate-pulse" />
                <p className="text-sm text-muted-foreground">Analyzing your form...</p>
              </div>
            )}

            {suggestions.length === 0 && !isAnalyzing && (
              <div className="text-center py-4">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Your form looks good! No suggestions at this time.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
