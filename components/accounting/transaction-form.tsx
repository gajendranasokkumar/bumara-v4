"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { CalendarIcon, Plus, Trash2, Save, Bot, AlertTriangle, CheckCircle, WifiOff, Upload } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface TransactionEntry {
  id: string
  account: string
  description: string
  debit: number
  credit: number
}

export function TransactionForm() {
  const [date, setDate] = useState<Date>(new Date())
  const [reference, setReference] = useState("")
  const [description, setDescription] = useState("")
  const [entries, setEntries] = useState<TransactionEntry[]>([
    { id: "1", account: "", description: "", debit: 0, credit: 0 },
    { id: "2", account: "", description: "", debit: 0, credit: 0 },
  ])
  const [isRecurring, setIsRecurring] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState(true)
  const [isOffline, setIsOffline] = useState(false)

  const accounts = [
    { value: "cash", label: "Cash & Bank", type: "Asset" },
    { value: "ar", label: "Accounts Receivable", type: "Asset" },
    { value: "inventory", label: "Inventory", type: "Asset" },
    { value: "equipment", label: "Equipment", type: "Asset" },
    { value: "ap", label: "Accounts Payable", type: "Liability" },
    { value: "revenue", label: "Sales Revenue", type: "Revenue" },
    { value: "cogs", label: "Cost of Goods Sold", type: "Expense" },
    { value: "rent", label: "Rent Expense", type: "Expense" },
    { value: "utilities", label: "Utilities Expense", type: "Expense" },
  ]

  const addEntry = () => {
    const newEntry: TransactionEntry = {
      id: Date.now().toString(),
      account: "",
      description: "",
      debit: 0,
      credit: 0,
    }
    setEntries([...entries, newEntry])
  }

  const removeEntry = (id: string) => {
    if (entries.length > 2) {
      setEntries(entries.filter((entry) => entry.id !== id))
    }
  }

  const updateEntry = (id: string, field: keyof TransactionEntry, value: string | number) => {
    setEntries(entries.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)))
  }

  const getTotalDebits = () => entries.reduce((sum, entry) => sum + (entry.debit || 0), 0)
  const getTotalCredits = () => entries.reduce((sum, entry) => sum + (entry.credit || 0), 0)
  const isBalanced = () => getTotalDebits() === getTotalCredits() && getTotalDebits() > 0

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">New Transaction</h2>
          <p className="text-muted-foreground">Create a new journal entry</p>
        </div>
        <div className="flex items-center space-x-2">
          {isOffline && (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              <WifiOff className="w-3 h-3 mr-1" />
              Offline Mode
            </Badge>
          )}
          <Button variant="outline">Cancel</Button>
          <Button disabled={!isBalanced()}>
            <Save className="w-4 h-4 mr-2" />
            Save Transaction
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Details</CardTitle>
              <CardDescription>Enter the basic information for this transaction</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Transaction Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reference">Reference Number</Label>
                  <Input
                    id="reference"
                    placeholder="TXN-2024-001"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter transaction description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="recurring" checked={isRecurring} onCheckedChange={setIsRecurring} />
                <Label htmlFor="recurring">Make this a recurring transaction</Label>
              </div>
            </CardContent>
          </Card>

          {/* Journal Entries */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Journal Entries</CardTitle>
                  <CardDescription>Add debit and credit entries for this transaction</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={addEntry}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Entry
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {entries.map((entry, index) => (
                  <div key={entry.id} className="grid grid-cols-12 gap-3 items-end p-3 rounded-lg bg-muted/50">
                    <div className="col-span-4">
                      <Label className="text-xs">Account</Label>
                      <Select value={entry.account} onValueChange={(value) => updateEntry(entry.id, "account", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent>
                          {accounts.map((account) => (
                            <SelectItem key={account.value} value={account.value}>
                              <div className="flex items-center justify-between w-full">
                                <span>{account.label}</span>
                                <Badge variant="outline" className="ml-2 text-xs">
                                  {account.type}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="col-span-3">
                      <Label className="text-xs">Description</Label>
                      <Input
                        placeholder="Entry description"
                        value={entry.description}
                        onChange={(e) => updateEntry(entry.id, "description", e.target.value)}
                      />
                    </div>

                    <div className="col-span-2">
                      <Label className="text-xs">Debit</Label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={entry.debit || ""}
                        onChange={(e) => updateEntry(entry.id, "debit", Number.parseFloat(e.target.value) || 0)}
                      />
                    </div>

                    <div className="col-span-2">
                      <Label className="text-xs">Credit</Label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={entry.credit || ""}
                        onChange={(e) => updateEntry(entry.id, "credit", Number.parseFloat(e.target.value) || 0)}
                      />
                    </div>

                    <div className="col-span-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEntry(entry.id)}
                        disabled={entries.length <= 2}
                        className="h-9 w-9 p-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Totals */}
                <div className="border-t pt-4">
                  <div className="grid grid-cols-12 gap-3 font-medium">
                    <div className="col-span-7 text-right">Totals:</div>
                    <div className="col-span-2 text-center">{formatCurrency(getTotalDebits())}</div>
                    <div className="col-span-2 text-center">{formatCurrency(getTotalCredits())}</div>
                    <div className="col-span-1 flex justify-center">
                      {isBalanced() ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                      )}
                    </div>
                  </div>
                  {!isBalanced() && getTotalDebits() !== getTotalCredits() && (
                    <p className="text-sm text-amber-600 mt-2 text-center">
                      Difference: {formatCurrency(Math.abs(getTotalDebits() - getTotalCredits()))}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
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
                    💡 <strong>Suggestion:</strong> Based on the description, this looks like a sales transaction.
                    Consider debiting Cash/Bank and crediting Sales Revenue.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <p className="text-sm text-amber-800">
                    ⚠️ <strong>Reminder:</strong> Don't forget to account for any applicable taxes (VAT, WHT) for
                    compliance reporting.
                  </p>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <Bot className="w-4 h-4 mr-2" />
                  Get More Suggestions
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Upload className="w-4 h-4 mr-2" />
                Attach Receipt
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Set Reminder
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark for Review
              </Button>
            </CardContent>
          </Card>

          {/* Transaction Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Common Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                Sales Invoice
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                Expense Payment
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                Bank Transfer
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                Asset Purchase
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
