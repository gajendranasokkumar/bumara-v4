"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  DollarSign,
  Calendar,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Download,
  Filter,
  Search,
  Calculator,
  Banknote,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PayrollDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("current-month")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const payrollMetrics = {
    totalEmployees: 45,
    activeEmployees: 43,
    totalPayroll: 3200000,
    avgSalary: 74400,
    pendingApprovals: 3,
    taxLiability: 480000,
  }

  const departments = [
    { name: "Engineering", employees: 15, payroll: 1200000, avgSalary: 80000 },
    { name: "Sales", employees: 12, payroll: 840000, avgSalary: 70000 },
    { name: "Marketing", employees: 8, payroll: 560000, avgSalary: 70000 },
    { name: "Operations", employees: 6, payroll: 360000, avgSalary: 60000 },
    { name: "HR", employees: 4, payroll: 240000, avgSalary: 60000 },
  ]

  const recentPayrolls = [
    {
      id: "PAY-2024-01",
      period: "January 2024",
      employees: 45,
      totalAmount: 3200000,
      status: "completed",
      processedDate: "2024-01-31",
      taxes: 480000,
    },
    {
      id: "PAY-2023-12",
      period: "December 2023",
      employees: 44,
      totalAmount: 3100000,
      status: "completed",
      processedDate: "2023-12-31",
      taxes: 465000,
    },
    {
      id: "PAY-2023-11",
      period: "November 2023",
      employees: 43,
      totalAmount: 2950000,
      status: "completed",
      processedDate: "2023-11-30",
      taxes: 442500,
    },
  ]

  const upcomingPayroll = [
    {
      employee: "John Doe",
      department: "Engineering",
      basicSalary: 120000,
      allowances: 20000,
      deductions: 18000,
      netPay: 122000,
      status: "pending",
    },
    {
      employee: "Sarah Johnson",
      department: "Sales",
      basicSalary: 95000,
      allowances: 15000,
      deductions: 14000,
      netPay: 96000,
      status: "approved",
    },
    {
      employee: "Michael Brown",
      department: "Marketing",
      basicSalary: 85000,
      allowances: 12000,
      deductions: 12500,
      netPay: 84500,
      status: "pending",
    },
    {
      employee: "Lisa Davis",
      department: "Operations",
      basicSalary: 75000,
      allowances: 10000,
      deductions: 11000,
      netPay: 74000,
      status: "approved",
    },
  ]

  const leaveRequests = [
    {
      employee: "John Doe",
      type: "Annual Leave",
      startDate: "2024-02-15",
      endDate: "2024-02-20",
      days: 5,
      status: "pending",
      appliedDate: "2024-01-15",
    },
    {
      employee: "Sarah Johnson",
      type: "Sick Leave",
      startDate: "2024-02-10",
      endDate: "2024-02-12",
      days: 3,
      status: "approved",
      appliedDate: "2024-01-14",
    },
    {
      employee: "Michael Brown",
      type: "Personal Leave",
      startDate: "2024-02-20",
      endDate: "2024-02-22",
      days: 3,
      status: "pending",
      appliedDate: "2024-01-13",
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
      case "completed":
        return "bg-green-100 text-green-800"
      case "approved":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-amber-100 text-amber-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payroll Management</h1>
          <p className="text-muted-foreground">Manage employee salaries, benefits, and payroll processing</p>
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
            Add Employee
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payrollMetrics.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">{payrollMetrics.activeEmployees} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(payrollMetrics.totalPayroll)}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />
              +5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(payrollMetrics.avgSalary)}</div>
            <p className="text-xs text-muted-foreground">Per employee</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tax Liability</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(payrollMetrics.taxLiability)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{payrollMetrics.pendingApprovals}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payroll Status</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Ready</div>
            <p className="text-xs text-muted-foreground">For processing</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="payroll">Payroll Processing</TabsTrigger>
          <TabsTrigger value="leaves">Leave Management</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Department Breakdown</CardTitle>
                <CardDescription>Payroll distribution by department</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {departments.map((dept, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{dept.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {dept.employees} employees
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{formatCurrency(dept.payroll)}</div>
                        <div className="text-xs text-muted-foreground">Avg: {formatCurrency(dept.avgSalary)}</div>
                      </div>
                    </div>
                    <Progress value={(dept.payroll / payrollMetrics.totalPayroll) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Payroll History */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Payroll History</CardTitle>
                <CardDescription>Last processed payrolls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentPayrolls.map((payroll) => (
                  <div key={payroll.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{payroll.period}</div>
                        <div className="text-sm text-muted-foreground">
                          {payroll.employees} employees • {payroll.processedDate}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{formatCurrency(payroll.totalAmount)}</div>
                      <Badge className={getStatusColor(payroll.status)} variant="secondary">
                        {payroll.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Payroll */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upcoming Payroll - February 2024</CardTitle>
                  <CardDescription>Employee payroll calculations for approval</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Calculator className="w-4 h-4 mr-2" />
                    Recalculate
                  </Button>
                  <Button size="sm">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Process Payroll
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingPayroll.map((employee, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{employee.employee}</div>
                        <div className="text-sm text-muted-foreground">{employee.department}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="text-muted-foreground">Basic</div>
                        <div className="font-medium">{formatCurrency(employee.basicSalary)}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-muted-foreground">Allowances</div>
                        <div className="font-medium text-green-600">+{formatCurrency(employee.allowances)}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-muted-foreground">Deductions</div>
                        <div className="font-medium text-red-600">-{formatCurrency(employee.deductions)}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-muted-foreground">Net Pay</div>
                        <div className="font-bold">{formatCurrency(employee.netPay)}</div>
                      </div>
                      <Badge className={getStatusColor(employee.status)} variant="secondary">
                        {employee.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts and Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Payroll Alerts & Compliance</CardTitle>
              <CardDescription>Important notifications and compliance reminders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                      <div>
                        <div className="font-medium text-amber-800">Tax Filing Due</div>
                        <div className="text-sm text-amber-600">PAYE returns due in 5 days (February 10th)</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-amber-300 text-amber-700 bg-transparent">
                      File Now
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="font-medium text-blue-800">Payroll Schedule</div>
                        <div className="text-sm text-blue-600">Next payroll processing: February 28th, 2024</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 bg-transparent">
                      View Calendar
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <div className="font-medium text-green-800">Compliance Status</div>
                        <div className="text-sm text-green-600">All tax calculations are up to date</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-green-300 text-green-700 bg-transparent">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employees" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Employee Management</CardTitle>
                  <CardDescription>Manage employee records and salary information</CardDescription>
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
                    Add Employee
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search employees..." className="max-w-sm" />
              </div>
              <div className="text-center py-8 text-muted-foreground">
                Employee management table will be implemented here with salary details, benefits, and deductions.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payroll" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Processing</CardTitle>
              <CardDescription>Process monthly payroll and generate payslips</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Payroll processing interface will be implemented here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaves" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Leave Management</CardTitle>
                  <CardDescription>Manage employee leave requests and approvals</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Leave Request
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaveRequests.map((leave, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium">{leave.employee}</div>
                        <div className="text-sm text-muted-foreground">
                          {leave.type} • {leave.startDate} to {leave.endDate} ({leave.days} days)
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(leave.status)} variant="secondary">
                        {leave.status}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">Applied: {leave.appliedDate}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Reports</CardTitle>
              <CardDescription>Generate comprehensive payroll and tax reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Payroll reporting interface will be implemented here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
