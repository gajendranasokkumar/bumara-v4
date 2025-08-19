"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Receipt,
  FileText,
  Plus,
  Download,
  Filter,
  Search,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AccountingDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("current-month")

  const financialMetrics = {
    revenue: { amount: 2400000, change: 12, trend: "up" },
    expenses: { amount: 1800000, change: -5, trend: "down" },
    profit: { amount: 600000, change: 25, trend: "up" },
    cashFlow: { amount: 450000, change: 8, trend: "up" },
  }

  const accountBalances = [
    { name: "Cash & Bank", balance: 1250000, currency: "NGN", change: 5.2 },
    { name: "Accounts Receivable", balance: 850000, currency: "NGN", change: -2.1 },
    { name: "Inventory", balance: 650000, currency: "NGN", change: 8.7 },
    { name: "Accounts Payable", balance: -420000, currency: "NGN", change: 3.4 },
  ]

  const recentTransactions = [
    {
      id: "TXN-001",
      date: "2024-01-15",
      description: "Sales Invoice #INV-2024-001",
      account: "Revenue",
      amount: 125000,
      type: "credit",
      status: "completed",
    },
    {
      id: "TXN-002",
      date: "2024-01-15",
      description: "Office Rent Payment",
      account: "Rent Expense",
      amount: -85000,
      type: "debit",
      status: "completed",
    },
    {
      id: "TXN-003",
      date: "2024-01-14",
      description: "Equipment Purchase",
      account: "Fixed Assets",
      amount: -250000,
      type: "debit",
      status: "pending",
    },
    {
      id: "TXN-004",
      date: "2024-01-14",
      description: "Customer Payment - ABC Corp",
      account: "Accounts Receivable",
      amount: 180000,
      type: "credit",
      status: "completed",
    },
  ]

  const formatCurrency = (amount: number, currency = "NGN") => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Accounting</h1>
          <p className="text-muted-foreground">Financial management and reporting</p>
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
            New Transaction
          </Button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(financialMetrics.revenue.amount)}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />+{financialMetrics.revenue.change}% from last
              month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(financialMetrics.expenses.amount)}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline w-3 h-3 mr-1 text-green-500" />
              {financialMetrics.expenses.change}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(financialMetrics.profit.amount)}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />+{financialMetrics.profit.change}% from last
              month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cash Flow</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(financialMetrics.cashFlow.amount)}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />+{financialMetrics.cashFlow.change}% from
              last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="accounts">Chart of Accounts</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="reconciliation">Reconciliation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Account Balances */}
            <Card>
              <CardHeader>
                <CardTitle>Account Balances</CardTitle>
                <CardDescription>Current balances across major account categories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {accountBalances.map((account, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <div className="font-medium">{account.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {account.change > 0 ? "+" : ""}
                        {account.change}% this month
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${account.balance < 0 ? "text-red-600" : "text-foreground"}`}>
                        {formatCurrency(Math.abs(account.balance))}
                      </div>
                      <div className="text-xs text-muted-foreground">{account.currency}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Cash Flow Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Trend</CardTitle>
                <CardDescription>Monthly cash flow over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { month: "Aug", inflow: 1200000, outflow: 900000 },
                    { month: "Sep", inflow: 1350000, outflow: 1050000 },
                    { month: "Oct", inflow: 1100000, outflow: 850000 },
                    { month: "Nov", inflow: 1450000, outflow: 1100000 },
                    { month: "Dec", inflow: 1600000, outflow: 1200000 },
                    { month: "Jan", inflow: 1800000, outflow: 1350000 },
                  ].map((data, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{data.month}</span>
                        <span className="font-medium">Net: {formatCurrency(data.inflow - data.outflow)}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${(data.inflow / 2000000) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{formatCurrency(data.inflow)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full" />
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <div
                              className="bg-red-500 h-2 rounded-full"
                              style={{ width: `${(data.outflow / 2000000) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{formatCurrency(data.outflow)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest financial transactions</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          transaction.status === "completed"
                            ? "bg-green-500"
                            : transaction.status === "pending"
                              ? "bg-amber-500"
                              : "bg-red-500"
                        }`}
                      />
                      <div>
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-sm text-muted-foreground">
                          {transaction.account} • {transaction.date}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                        {transaction.amount > 0 ? "+" : ""}
                        {formatCurrency(Math.abs(transaction.amount))}
                      </div>
                      <Badge variant={transaction.status === "completed" ? "default" : "secondary"} className="text-xs">
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Transaction Management</CardTitle>
                  <CardDescription>View and manage all financial transactions</CardDescription>
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
                    Add Transaction
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search transactions..." className="max-w-sm" />
              </div>
              <div className="text-center py-8 text-muted-foreground">
                Transaction table will be implemented here with advanced filtering, sorting, and export capabilities.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chart of Accounts</CardTitle>
              <CardDescription>Manage your account structure and categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Chart of accounts management interface will be implemented here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>Generate comprehensive financial statements and reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Financial reporting interface will be implemented here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reconciliation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bank Reconciliation</CardTitle>
              <CardDescription>Reconcile bank statements with your records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Bank reconciliation interface will be implemented here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
