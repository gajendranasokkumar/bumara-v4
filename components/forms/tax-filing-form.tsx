"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Upload, Save, Send, AlertCircle, Bot, Info, WifiOff, Clock } from "lucide-react"

interface TaxFilingFormData {
  filingType: string
  taxPeriod: string
  startDate: string
  endDate: string
  totalRevenue: string
  taxableIncome: string
  vatAmount: string
  payeAmount: string
  companyTax: string
  supportingDocuments: File[]
  declarationAccepted: boolean
  submitterName: string
  submitterRole: string
  additionalNotes: string
}

interface FormValidation {
  field: string
  message: string
  type: "error" | "warning" | "info"
}

export function TaxFilingForm() {
  const [formData, setFormData] = useState<TaxFilingFormData>({
    filingType: "",
    taxPeriod: "",
    startDate: "",
    endDate: "",
    totalRevenue: "",
    taxableIncome: "",
    vatAmount: "",
    payeAmount: "",
    companyTax: "",
    supportingDocuments: [],
    declarationAccepted: false,
    submitterName: "",
    submitterRole: "",
    additionalNotes: "",
  })

  const [validations, setValidations] = useState<FormValidation[]>([])
  const [isOffline, setIsOffline] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showAISuggestions, setShowAISuggestions] = useState(true)
  const [completionProgress, setCompletionProgress] = useState(0)

  // Calculate form completion progress
  const calculateProgress = () => {
    const requiredFields = [
      "filingType",
      "taxPeriod",
      "startDate",
      "endDate",
      "totalRevenue",
      "submitterName",
      "submitterRole",
    ]
    const completedFields = requiredFields.filter((field) => formData[field as keyof TaxFilingFormData])
    return Math.round((completedFields.length / requiredFields.length) * 100)
  }

  // Update progress when form data changes
  useState(() => {
    setCompletionProgress(calculateProgress())
  })

  const handleInputChange = (field: keyof TaxFilingFormData, value: string | boolean | File[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear validation for this field
    setValidations((prev) => prev.filter((v) => v.field !== field))

    // Update progress
    setTimeout(() => setCompletionProgress(calculateProgress()), 100)
  }

  const validateForm = (): FormValidation[] => {
    const errors: FormValidation[] = []

    if (!formData.filingType) {
      errors.push({ field: "filingType", message: "Filing type is required", type: "error" })
    }

    if (!formData.taxPeriod) {
      errors.push({ field: "taxPeriod", message: "Tax period is required", type: "error" })
    }

    if (!formData.startDate || !formData.endDate) {
      errors.push({ field: "dates", message: "Start and end dates are required", type: "error" })
    }

    if (formData.startDate && formData.endDate && formData.startDate >= formData.endDate) {
      errors.push({ field: "dates", message: "End date must be after start date", type: "error" })
    }

    if (!formData.totalRevenue) {
      errors.push({ field: "totalRevenue", message: "Total revenue is required", type: "error" })
    } else if (isNaN(Number(formData.totalRevenue)) || Number(formData.totalRevenue) < 0) {
      errors.push({ field: "totalRevenue", message: "Total revenue must be a valid positive number", type: "error" })
    }

    if (!formData.submitterName) {
      errors.push({ field: "submitterName", message: "Submitter name is required", type: "error" })
    }

    if (!formData.submitterRole) {
      errors.push({ field: "submitterRole", message: "Submitter role is required", type: "error" })
    }

    if (!formData.declarationAccepted) {
      errors.push({
        field: "declarationAccepted",
        message: "You must accept the declaration to proceed",
        type: "error",
      })
    }

    // Add warnings for missing optional but recommended fields
    if (!formData.vatAmount && formData.filingType === "vat") {
      errors.push({ field: "vatAmount", message: "VAT amount is recommended for VAT filings", type: "warning" })
    }

    return errors
  }

  const handleSaveDraft = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)

    // Show success message or handle offline storage
    if (isOffline) {
      // Store locally for offline sync
      localStorage.setItem("tax_filing_draft", JSON.stringify(formData))
    }
  }

  const handleSubmit = async () => {
    const errors = validateForm()
    setValidations(errors)

    if (errors.filter((e) => e.type === "error").length > 0) {
      return
    }

    setIsSaving(true)
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSaving(false)

    // Handle success/offline queue
  }

  const aiSuggestions = [
    {
      field: "vatAmount",
      suggestion:
        "Based on your revenue, estimated VAT should be around 15% (₦" +
        (Number(formData.totalRevenue) * 0.15).toLocaleString() +
        ")",
      show: formData.totalRevenue && !formData.vatAmount,
    },
    {
      field: "taxPeriod",
      suggestion: "Consider filing quarterly to spread your compliance workload",
      show: formData.filingType === "income-tax",
    },
    {
      field: "documents",
      suggestion: "Upload bank statements and receipts to support your filing",
      show: formData.supportingDocuments.length === 0,
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Tax Filing Form</h2>
          <p className="text-muted-foreground">Complete your tax return submission</p>
        </div>
        <div className="flex items-center gap-4">
          {isOffline && (
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              <WifiOff className="h-3 w-3 mr-1" />
              Offline Mode
            </Badge>
          )}
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Clock className="h-3 w-3 mr-1" />
            Auto-saved
          </Badge>
        </div>
      </div>

      {/* Progress Indicator */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Form Completion</span>
            <span className="text-sm text-muted-foreground">{completionProgress}%</span>
          </div>
          <Progress value={completionProgress} className="h-2" />
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      {showAISuggestions && (
        <div className="space-y-3">
          {aiSuggestions
            .filter((suggestion) => suggestion.show)
            .map((suggestion, index) => (
              <Alert key={index} className="border-blue-200 bg-blue-50">
                <Bot className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>AI Suggestion:</strong> {suggestion.suggestion}
                </AlertDescription>
              </Alert>
            ))}
        </div>
      )}

      {/* Form Validation Errors */}
      {validations.length > 0 && (
        <div className="space-y-2">
          {validations.map((validation, index) => (
            <Alert
              key={index}
              className={
                validation.type === "error"
                  ? "border-red-200 bg-red-50"
                  : validation.type === "warning"
                    ? "border-yellow-200 bg-yellow-50"
                    : "border-blue-200 bg-blue-50"
              }
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{validation.message}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Main Form */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Essential details for your tax filing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="filingType">
                Filing Type <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.filingType} onValueChange={(value) => handleInputChange("filingType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select filing type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vat">VAT Return</SelectItem>
                  <SelectItem value="income-tax">Income Tax</SelectItem>
                  <SelectItem value="company-tax">Company Tax</SelectItem>
                  <SelectItem value="paye">PAYE Return</SelectItem>
                  <SelectItem value="withholding-tax">Withholding Tax</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxPeriod">
                Tax Period <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.taxPeriod} onValueChange={(value) => handleInputChange("taxPeriod", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tax period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">
                  Start Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">
                  End Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Information */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Information</CardTitle>
            <CardDescription>Revenue and tax calculations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="totalRevenue">
                Total Revenue (₦) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="totalRevenue"
                type="number"
                placeholder="0.00"
                value={formData.totalRevenue}
                onChange={(e) => handleInputChange("totalRevenue", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Enter total revenue for the tax period</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxableIncome">Taxable Income (₦)</Label>
              <Input
                id="taxableIncome"
                type="number"
                placeholder="0.00"
                value={formData.taxableIncome}
                onChange={(e) => handleInputChange("taxableIncome", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vatAmount">VAT Amount (₦)</Label>
              <Input
                id="vatAmount"
                type="number"
                placeholder="0.00"
                value={formData.vatAmount}
                onChange={(e) => handleInputChange("vatAmount", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="payeAmount">PAYE Amount (₦)</Label>
              <Input
                id="payeAmount"
                type="number"
                placeholder="0.00"
                value={formData.payeAmount}
                onChange={(e) => handleInputChange("payeAmount", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyTax">Company Tax (₦)</Label>
              <Input
                id="companyTax"
                type="number"
                placeholder="0.00"
                value={formData.companyTax}
                onChange={(e) => handleInputChange("companyTax", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Supporting Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Supporting Documents</CardTitle>
          <CardDescription>Upload required documents to support your filing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">Drag and drop files here, or click to browse</p>
            <p className="text-xs text-muted-foreground mb-4">
              Supported formats: PDF, DOC, DOCX, XLS, XLSX (Max 10MB per file)
            </p>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Choose Files
            </Button>
          </div>

          {formData.supportingDocuments.length > 0 && (
            <div className="mt-4 space-y-2">
              <Label>Uploaded Documents</Label>
              {formData.supportingDocuments.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 border border-border rounded">
                  <span className="text-sm">{file.name}</span>
                  <Button variant="ghost" size="sm">
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Submitter Information */}
      <Card>
        <CardHeader>
          <CardTitle>Submitter Information</CardTitle>
          <CardDescription>Details of the person submitting this filing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="submitterName">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="submitterName"
                placeholder="Enter full name"
                value={formData.submitterName}
                onChange={(e) => handleInputChange("submitterName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="submitterRole">
                Role/Position <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.submitterRole}
                onValueChange={(value) => handleInputChange("submitterRole", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="accountant">Accountant</SelectItem>
                  <SelectItem value="finance-manager">Finance Manager</SelectItem>
                  <SelectItem value="compliance-officer">Compliance Officer</SelectItem>
                  <SelectItem value="ceo">CEO/Managing Director</SelectItem>
                  <SelectItem value="tax-consultant">Tax Consultant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalNotes">Additional Notes</Label>
            <Textarea
              id="additionalNotes"
              placeholder="Any additional information or comments..."
              value={formData.additionalNotes}
              onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Declaration */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="declaration"
              checked={formData.declarationAccepted}
              onCheckedChange={(checked) => handleInputChange("declarationAccepted", checked as boolean)}
            />
            <div className="space-y-1">
              <Label
                htmlFor="declaration"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Declaration and Acceptance <span className="text-red-500">*</span>
              </Label>
              <p className="text-xs text-muted-foreground">
                I declare that the information provided in this tax filing is true, complete, and accurate to the best
                of my knowledge. I understand that providing false information may result in penalties under applicable
                tax laws.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-blue-600" />
          <span className="text-sm text-muted-foreground">
            {isOffline ? "Changes saved locally. Will sync when online." : "All changes are automatically saved."}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleSaveDraft} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Draft"}
          </Button>
          <Button onClick={handleSubmit} disabled={isSaving || completionProgress < 70}>
            <Send className="h-4 w-4 mr-2" />
            {isSaving ? "Submitting..." : "Submit Filing"}
          </Button>
        </div>
      </div>
    </div>
  )
}
