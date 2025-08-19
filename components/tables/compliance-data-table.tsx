"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Bot,
  RefreshCw,
  X,
} from "lucide-react"

interface ComplianceRecord {
  id: string
  title: string
  type: "tax-filing" | "regulatory-report" | "document" | "audit"
  status: "completed" | "pending" | "overdue" | "draft"
  priority: "high" | "medium" | "low"
  dueDate: string
  submittedDate?: string
  submittedBy: string
  amount?: number
  tags: string[]
  lastModified: string
  approvalStatus: "approved" | "pending" | "rejected" | "not-required"
}

interface TableFilters {
  search: string
  type: string
  status: string
  priority: string
  approvalStatus: string
  dateRange: string
}

interface SortConfig {
  key: keyof ComplianceRecord | null
  direction: "asc" | "desc"
}

export function ComplianceDataTable() {
  const [records] = useState<ComplianceRecord[]>([
    {
      id: "1",
      title: "VAT Return Q4 2024",
      type: "tax-filing",
      status: "pending",
      priority: "high",
      dueDate: "2025-01-22",
      submittedBy: "John Doe",
      amount: 125000,
      tags: ["VAT", "Q4", "2024"],
      lastModified: "2025-01-19T10:30:00Z",
      approvalStatus: "pending",
    },
    {
      id: "2",
      title: "Annual Financial Statement",
      type: "document",
      status: "completed",
      priority: "medium",
      dueDate: "2024-12-31",
      submittedDate: "2024-12-28",
      submittedBy: "Jane Smith",
      tags: ["Annual", "Financial", "2024"],
      lastModified: "2024-12-28T14:15:00Z",
      approvalStatus: "approved",
    },
    {
      id: "3",
      title: "Regulatory Compliance Report",
      type: "regulatory-report",
      status: "overdue",
      priority: "high",
      dueDate: "2025-01-15",
      submittedBy: "Mike Johnson",
      tags: ["Regulatory", "Compliance"],
      lastModified: "2025-01-18T09:45:00Z",
      approvalStatus: "not-required",
    },
    {
      id: "4",
      title: "PAYE Monthly Return",
      type: "tax-filing",
      status: "draft",
      priority: "medium",
      dueDate: "2025-02-15",
      submittedBy: "Sarah Wilson",
      amount: 45000,
      tags: ["PAYE", "Monthly", "January"],
      lastModified: "2025-01-19T16:20:00Z",
      approvalStatus: "not-required",
    },
    {
      id: "5",
      title: "Internal Audit Report",
      type: "audit",
      status: "completed",
      priority: "low",
      dueDate: "2024-12-20",
      submittedDate: "2024-12-18",
      submittedBy: "David Brown",
      tags: ["Audit", "Internal", "2024"],
      lastModified: "2024-12-18T11:30:00Z",
      approvalStatus: "approved",
    },
  ])

  const [filters, setFilters] = useState<TableFilters>({
    search: "",
    type: "all",
    status: "all",
    priority: "all",
    approvalStatus: "all",
    dateRange: "",
  })

  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" })
  const [selectedRecords, setSelectedRecords] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Filter and sort data
  const filteredAndSortedRecords = useMemo(() => {
    const filtered = records.filter((record) => {
      const matchesSearch =
        record.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        record.submittedBy.toLowerCase().includes(filters.search.toLowerCase()) ||
        record.tags.some((tag) => tag.toLowerCase().includes(filters.search.toLowerCase()))

      const matchesType = filters.type === "all" || record.type === filters.type
      const matchesStatus = filters.status === "all" || record.status === filters.status
      const matchesPriority = filters.priority === "all" || record.priority === filters.priority
      const matchesApproval = filters.approvalStatus === "all" || record.approvalStatus === filters.approvalStatus

      return matchesSearch && matchesType && matchesStatus && matchesPriority && matchesApproval
    })

    // Sort data
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key!]
        const bValue = b[sortConfig.key!]

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [records, filters, sortConfig])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedRecords.length / itemsPerPage)
  const paginatedRecords = filteredAndSortedRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSort = (key: keyof ComplianceRecord) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }))
  }

  const handleSelectRecord = (recordId: string) => {
    setSelectedRecords((prev) => (prev.includes(recordId) ? prev.filter((id) => id !== recordId) : [...prev, recordId]))
  }

  const handleSelectAll = () => {
    setSelectedRecords(selectedRecords.length === paginatedRecords.length ? [] : paginatedRecords.map((r) => r.id))
  }

  const handleExport = (format: "csv" | "excel" | "pdf") => {
    // Simulate export functionality
    console.log(`Exporting ${selectedRecords.length || filteredAndSortedRecords.length} records as ${format}`)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "draft":
        return <FileText className="h-4 w-4 text-gray-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200"
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200"
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Compliance Records</h2>
          <p className="text-muted-foreground">
            Showing {filteredAndSortedRecords.length} of {records.length} records
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExport("csv")}>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("excel")}>Export as Excel</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("pdf")}>Export as PDF</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            <div className="lg:col-span-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search records..."
                  value={filters.search}
                  onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label>Type</Label>
              <Select value={filters.type} onValueChange={(value) => setFilters((prev) => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  <SelectItem value="tax-filing">Tax Filing</SelectItem>
                  <SelectItem value="regulatory-report">Regulatory Report</SelectItem>
                  <SelectItem value="document">Document</SelectItem>
                  <SelectItem value="audit">Audit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Status</Label>
              <Select
                value={filters.status}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Priority</Label>
              <Select
                value={filters.priority}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, priority: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Approval</Label>
              <Select
                value={filters.approvalStatus}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, approvalStatus: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All approvals" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All approvals</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="not-required">Not Required</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          {(filters.search !== "" ||
            filters.type !== "all" ||
            filters.status !== "all" ||
            filters.priority !== "all" ||
            filters.approvalStatus !== "all") && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {filters.search && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {filters.search}
                  <button onClick={() => setFilters((prev) => ({ ...prev, search: "" }))}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filters.type !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Type: {filters.type}
                  <button onClick={() => setFilters((prev) => ({ ...prev, type: "all" }))}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filters.status !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Status: {filters.status}
                  <button onClick={() => setFilters((prev) => ({ ...prev, status: "all" }))}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filters.priority !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Priority: {filters.priority}
                  <button onClick={() => setFilters((prev) => ({ ...prev, priority: "all" }))}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filters.approvalStatus !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Approval: {filters.approvalStatus}
                  <button onClick={() => setFilters((prev) => ({ ...prev, approvalStatus: "all" }))}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setFilters({
                    search: "",
                    type: "all",
                    status: "all",
                    priority: "all",
                    approvalStatus: "all",
                    dateRange: "",
                  })
                }
              >
                Clear all
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedRecords.length === paginatedRecords.length && paginatedRecords.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("title")}
                      className="h-auto p-0 font-semibold"
                    >
                      Title
                      {sortConfig.key === "title" &&
                        (sortConfig.direction === "asc" ? (
                          <ArrowUp className="ml-2 h-4 w-4" />
                        ) : (
                          <ArrowDown className="ml-2 h-4 w-4" />
                        ))}
                      {sortConfig.key !== "title" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                    </Button>
                  </TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("dueDate")}
                      className="h-auto p-0 font-semibold"
                    >
                      Due Date
                      {sortConfig.key === "dueDate" &&
                        (sortConfig.direction === "asc" ? (
                          <ArrowUp className="ml-2 h-4 w-4" />
                        ) : (
                          <ArrowDown className="ml-2 h-4 w-4" />
                        ))}
                      {sortConfig.key !== "dueDate" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                    </Button>
                  </TableHead>
                  <TableHead>Submitted By</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Approval</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedRecords.map((record) => (
                  <TableRow key={record.id} className="hover:bg-muted/50">
                    <TableCell>
                      <Checkbox
                        checked={selectedRecords.includes(record.id)}
                        onCheckedChange={() => handleSelectRecord(record.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{record.title}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {record.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {record.type.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(record.status)}
                        <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(record.priority)}>{record.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className={record.status === "overdue" ? "text-red-600 font-medium" : ""}>
                          {formatDate(record.dueDate)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{record.submittedBy}</TableCell>
                    <TableCell>{record.amount ? formatCurrency(record.amount) : "-"}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          record.approvalStatus === "approved"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : record.approvalStatus === "pending"
                              ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                              : record.approvalStatus === "rejected"
                                ? "bg-red-100 text-red-800 border-red-200"
                                : "bg-gray-100 text-gray-800 border-gray-200"
                        }
                      >
                        {record.approvalStatus.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-border">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Rows per page:</span>
              <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                  First
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  Last
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedRecords.length > 0 && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedRecords.length} record{selectedRecords.length > 1 ? "s" : ""} selected
              </span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Bot className="h-4 w-4 mr-2" />
                  AI Review
                </Button>
                <Button variant="outline" size="sm">
                  Bulk Export
                </Button>
                <Button variant="outline" size="sm">
                  Bulk Approve
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
