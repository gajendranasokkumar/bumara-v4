"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Save, Bot, Upload, WifiOff, DollarSign, User, Phone, Mail } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface SalaryComponent {
  id: string
  name: string
  type: "allowance" | "deduction"
  amount: number
  isPercentage: boolean
  isFixed: boolean
}

export function EmployeeForm() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [employeeId, setEmployeeId] = useState("")
  const [department, setDepartment] = useState("")
  const [position, setPosition] = useState("")
  const [hireDate, setHireDate] = useState<Date>()
  const [basicSalary, setBasicSalary] = useState("")
  const [currency, setCurrency] = useState("NGN")
  const [payFrequency, setPayFrequency] = useState("monthly")
  const [bankName, setBankName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [taxId, setTaxId] = useState("")
  const [isActive, setIsActive] = useState(true)
  const [aiSuggestions, setAiSuggestions] = useState(true)
  const [isOffline, setIsOffline] = useState(false)

  const [salaryComponents, setSalaryComponents] = useState<SalaryComponent[]>([
    { id: "1", name: "Housing Allowance", type: "allowance", amount: 25, isPercentage: true, isFixed: false },
    { id: "2", name: "Transport Allowance", type: "allowance", amount: 15000, isPercentage: false, isFixed: true },
    { id: "3", name: "PAYE Tax", type: "deduction", amount: 15, isPercentage: true, isFixed: false },
    { id: "4", name: "Pension", type: "deduction", amount: 8, isPercentage: true, isFixed: false },
  ])

  const departments = [
    "Engineering",
    "Sales",
    "Marketing",
    "Operations",
    "Human Resources",
    "Finance",
    "Customer Support",
    "Legal",
  ]

  const currencies = [
    { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "EUR", name: "Euro", symbol: "€" },
  ]

  const addSalaryComponent = () => {
    const newComponent: SalaryComponent = {
      id: Date.now().toString(),
      name: "",
      type: "allowance",
      amount: 0,
      isPercentage: false,
      isFixed: true,
    }
    setSalaryComponents([...salaryComponents, newComponent])
  }

  const updateSalaryComponent = (id: string, field: keyof SalaryComponent, value: any) => {
    setSalaryComponents(
      salaryComponents.map((component) => (component.id === id ? { ...component, [field]: value } : component)),
    )
  }

  const removeSalaryComponent = (id: string) => {
    setSalaryComponents(salaryComponents.filter((component) => component.id !== id))
  }

  const formatCurrency = (amount: string, currencyCode = currency) => {
    const num = Number.parseFloat(amount)
    if (isNaN(num)) return "₦0"
    const currencyInfo = currencies.find((c) => c.code === currencyCode)
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
    }).format(num)
  }

  const calculateNetSalary = () => {
    const basic = Number.parseFloat(basicSalary) || 0
    let totalAllowances = 0
    let totalDeductions = 0

    salaryComponents.forEach((component) => {
      const amount = component.isPercentage ? (basic * component.amount) / 100 : component.amount
      if (component.type === "allowance") {
        totalAllowances += amount
      } else {
        totalDeductions += amount
      }
    })

    return {
      basic,
      allowances: totalAllowances,
      deductions: totalDeductions,
      net: basic + totalAllowances - totalDeductions,
    }
  }

  const salaryBreakdown = calculateNetSalary()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Add New Employee</h2>
          <p className="text-muted-foreground">Create a new employee record with salary details</p>
        </div>
        <div className="flex items-center space-x-2">
          {isOffline && (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              <WifiOff className="w-3 h-3 mr-1" />
              Offline Mode
            </Badge>
          )}
          <Button variant="outline">Cancel</Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Employee
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="personal" className="space-y-4">
            <TabsList>
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="employment">Employment</TabsTrigger>
              <TabsTrigger value="salary">Salary & Benefits</TabsTrigger>
              <TabsTrigger value="banking">Banking & Tax</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Basic employee details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        placeholder="Enter first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Enter last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="employee@company.com"
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          placeholder="+234 xxx xxx xxxx"
                          className="pl-10"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID *</Label>
                    <Input
                      id="employeeId"
                      placeholder="EMP-001"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="employment" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Employment Details</CardTitle>
                  <CardDescription>Job role and department information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select value={department} onValueChange={setDepartment}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept.toLowerCase()}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">Position/Job Title</Label>
                      <Input
                        id="position"
                        placeholder="Software Engineer"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Hire Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !hireDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {hireDate ? format(hireDate, "PPP") : <span>Pick hire date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={hireDate} onSelect={setHireDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="active" checked={isActive} onCheckedChange={setIsActive} />
                    <Label htmlFor="active">Active employee</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="salary" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Salary & Benefits</CardTitle>
                  <CardDescription>Configure salary structure and components</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="basicSalary">Basic Salary *</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="basicSalary"
                          type="number"
                          placeholder="0"
                          className="pl-10"
                          value={basicSalary}
                          onChange={(e) => setBasicSalary(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((curr) => (
                            <SelectItem key={curr.code} value={curr.code}>
                              {curr.symbol} {curr.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="payFrequency">Pay Frequency</Label>
                      <Select value={payFrequency} onValueChange={setPayFrequency}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Salary Components */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-medium">Salary Components</Label>
                      <Button variant="outline" size="sm" onClick={addSalaryComponent}>
                        Add Component
                      </Button>
                    </div>

                    {salaryComponents.map((component) => (
                      <div key={component.id} className="p-3 rounded-lg border space-y-2">
                        <div className="grid grid-cols-12 gap-2 items-end">
                          <div className="col-span-4">
                            <Label className="text-xs">Component Name</Label>
                            <Input
                              placeholder="Component name"
                              value={component.name}
                              onChange={(e) => updateSalaryComponent(component.id, "name", e.target.value)}
                            />
                          </div>

                          <div className="col-span-2">
                            <Label className="text-xs">Type</Label>
                            <Select
                              value={component.type}
                              onValueChange={(value) => updateSalaryComponent(component.id, "type", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="allowance">Allowance</SelectItem>
                                <SelectItem value="deduction">Deduction</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="col-span-2">
                            <Label className="text-xs">Amount</Label>
                            <Input
                              type="number"
                              placeholder="0"
                              value={component.amount || ""}
                              onChange={(e) =>
                                updateSalaryComponent(component.id, "amount", Number.parseFloat(e.target.value) || 0)
                              }
                            />
                          </div>

                          <div className="col-span-2">
                            <Label className="text-xs">Unit</Label>
                            <Select
                              value={component.isPercentage ? "percentage" : "fixed"}
                              onValueChange={(value) =>
                                updateSalaryComponent(component.id, "isPercentage", value === "percentage")
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="fixed">Fixed Amount</SelectItem>
                                <SelectItem value="percentage">Percentage</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="col-span-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSalaryComponent(component.id)}
                              className="h-9 w-full"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="banking" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Banking & Tax Information</CardTitle>
                  <CardDescription>Bank account and tax identification details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Bank Name</Label>
                      <Input
                        id="bankName"
                        placeholder="First Bank of Nigeria"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input
                        id="accountNumber"
                        placeholder="1234567890"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax Identification Number (TIN)</Label>
                    <Input
                      id="taxId"
                      placeholder="12345678-0001"
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Assistant */}
          {aiSuggestions && (
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-primary" />
                  <CardTitle className="text-base">Mura AI Assistant</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <p className="text-sm text-blue-800">
                    💡 <strong>Salary Benchmark:</strong> For {position} in {department}, market rate is ₦80K-₦120K
                    monthly.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-sm text-green-800">
                    📊 <strong>Tax Optimization:</strong> Current structure results in 15% effective tax rate - within
                    optimal range.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <p className="text-sm text-amber-800">
                    ⚠️ <strong>Compliance:</strong> Ensure pension contribution meets 8% minimum requirement.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Salary Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Salary Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Basic Salary</span>
                  <span className="font-medium">{formatCurrency(basicSalary)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-600">Total Allowances</span>
                  <span className="font-medium text-green-600">
                    +{formatCurrency(salaryBreakdown.allowances.toString())}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-red-600">Total Deductions</span>
                  <span className="font-medium text-red-600">
                    -{formatCurrency(salaryBreakdown.deductions.toString())}
                  </span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Net Salary</span>
                    <span className="font-bold text-lg">{formatCurrency(salaryBreakdown.net.toString())}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employee Photo */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Employee Photo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <User className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">Upload employee photo</p>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
