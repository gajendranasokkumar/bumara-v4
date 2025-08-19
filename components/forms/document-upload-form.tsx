"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileText, ImageIcon, File, X, CheckCircle, Clock, AlertCircle, Bot, Eye } from "lucide-react"

interface DocumentUploadData {
  documentType: string
  category: string
  title: string
  description: string
  tags: string[]
  priority: "low" | "medium" | "high"
  approvalRequired: boolean
  files: File[]
  expiryDate: string
  relatedFiling: string
}

interface UploadedFile {
  file: File
  progress: number
  status: "uploading" | "completed" | "error"
  preview?: string
}

export function DocumentUploadForm() {
  const [formData, setFormData] = useState<DocumentUploadData>({
    documentType: "",
    category: "",
    title: "",
    description: "",
    tags: [],
    priority: "medium",
    approvalRequired: false,
    files: [],
    expiryDate: "",
    relatedFiling: "",
  })

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [currentTag, setCurrentTag] = useState("")

  const documentTypes = [
    { value: "tax-certificate", label: "Tax Certificate" },
    { value: "financial-statement", label: "Financial Statement" },
    { value: "bank-statement", label: "Bank Statement" },
    { value: "receipt", label: "Receipt/Invoice" },
    { value: "contract", label: "Contract/Agreement" },
    { value: "license", label: "Business License" },
    { value: "audit-report", label: "Audit Report" },
    { value: "regulatory-filing", label: "Regulatory Filing" },
    { value: "other", label: "Other" },
  ]

  const categories = [
    { value: "tax-documents", label: "Tax Documents" },
    { value: "financial-records", label: "Financial Records" },
    { value: "legal-documents", label: "Legal Documents" },
    { value: "regulatory-compliance", label: "Regulatory Compliance" },
    { value: "internal-records", label: "Internal Records" },
  ]

  const handleInputChange = (field: keyof DocumentUploadData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return

    const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
      file,
      progress: 0,
      status: "uploading" as const,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
    }))

    setUploadedFiles((prev) => [...prev, ...newFiles])

    // Simulate upload progress
    newFiles.forEach((uploadFile, index) => {
      const interval = setInterval(() => {
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.file === uploadFile.file
              ? {
                  ...f,
                  progress: Math.min(f.progress + Math.random() * 30, 100),
                  status: f.progress >= 100 ? "completed" : "uploading",
                }
              : f,
          ),
        )
      }, 500)

      setTimeout(() => {
        clearInterval(interval)
        setUploadedFiles((prev) =>
          prev.map((f) => (f.file === uploadFile.file ? { ...f, progress: 100, status: "completed" } : f)),
        )
      }, 3000)
    })
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const removeFile = (fileToRemove: File) => {
    setUploadedFiles((prev) => prev.filter((f) => f.file !== fileToRemove))
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      handleInputChange("tags", [...formData.tags, currentTag.trim()])
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    handleInputChange(
      "tags",
      formData.tags.filter((tag) => tag !== tagToRemove),
    )
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return <ImageIcon className="h-4 w-4" />
    if (file.type.includes("pdf")) return <FileText className="h-4 w-4" />
    return <File className="h-4 w-4" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Document Upload</h2>
        <p className="text-muted-foreground">Upload and manage compliance documents</p>
      </div>

      {/* AI Suggestions */}
      <Alert className="border-blue-200 bg-blue-50">
        <Bot className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>AI Suggestion:</strong> Based on your recent tax filing, consider uploading bank statements and
          receipts to support your submission.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Document Information */}
        <Card>
          <CardHeader>
            <CardTitle>Document Information</CardTitle>
            <CardDescription>Provide details about the document</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="documentType">
                Document Type <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.documentType} onValueChange={(value) => handleInputChange("documentType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">
                Document Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Enter document title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the document..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Additional Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Settings</CardTitle>
            <CardDescription>Configure document properties</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority Level</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: "low" | "medium" | "high") => handleInputChange("priority", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date (if applicable)</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange("expiryDate", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="relatedFiling">Related Filing</Label>
              <Select
                value={formData.relatedFiling}
                onValueChange={(value) => handleInputChange("relatedFiling", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Link to existing filing" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vat-2024-q4">VAT Return Q4 2024</SelectItem>
                  <SelectItem value="income-tax-2024">Income Tax 2024</SelectItem>
                  <SelectItem value="audit-2024">Annual Audit 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add tag"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <Button type="button" variant="outline" onClick={addTag}>
                  Add
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* File Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>File Upload</CardTitle>
          <CardDescription>Drag and drop files or click to browse</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-border"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">Drag and drop files here, or click to browse</p>
            <p className="text-xs text-muted-foreground mb-4">
              Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max 10MB per file)
            </p>
            <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Choose Files
            </Button>
            <input
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
            />
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="mt-6 space-y-3">
              <Label>Uploaded Files</Label>
              {uploadedFiles.map((uploadFile, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                  <div className="flex-shrink-0">
                    {uploadFile.preview ? (
                      <img
                        src={uploadFile.preview || "/placeholder.svg"}
                        alt="Preview"
                        className="h-10 w-10 object-cover rounded"
                      />
                    ) : (
                      getFileIcon(uploadFile.file)
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{uploadFile.file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(uploadFile.file.size)}</p>

                    {uploadFile.status === "uploading" && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>Uploading...</span>
                          <span>{Math.round(uploadFile.progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div
                            className="bg-primary h-1 rounded-full transition-all duration-300"
                            style={{ width: `${uploadFile.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {uploadFile.status === "completed" && <CheckCircle className="h-5 w-5 text-green-600" />}
                    {uploadFile.status === "uploading" && <Clock className="h-5 w-5 text-yellow-600" />}
                    {uploadFile.status === "error" && <AlertCircle className="h-5 w-5 text-red-600" />}

                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => removeFile(uploadFile.file)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Documents will be automatically scanned for compliance requirements
        </p>

        <div className="flex items-center gap-3">
          <Button variant="outline">Save as Draft</Button>
          <Button>Upload Documents</Button>
        </div>
      </div>
    </div>
  )
}
