"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Save, Bot, Phone, Mail, WifiOff, Star, User } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface ContactInfo {
  name: string
  title: string
  email: string
  phone: string
  isPrimary: boolean
}

export function LeadForm() {
  const [companyName, setCompanyName] = useState("")
  const [industry, setIndustry] = useState("")
  const [website, setWebsite] = useState("")
  const [address, setAddress] = useState("")
  const [leadSource, setLeadSource] = useState("")
  const [leadScore, setLeadScore] = useState(0)
  const [estimatedValue, setEstimatedValue] = useState("")
  const [expectedCloseDate, setExpectedCloseDate] = useState<Date>()
  const [notes, setNotes] = useState("")
  const [isQualified, setIsQualified] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState(true)
  const [isOffline, setIsOffline] = useState(false)

  const [contacts, setContacts] = useState<ContactInfo[]>([
    { name: "", title: "", email: "", phone: "", isPrimary: true },
  ])

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Manufacturing",
    "Retail",
    "Education",
    "Real Estate",
    "Consulting",
    "Government",
    "Non-profit",
  ]

  const leadSources = [
    "Website",
    "Social Media",
    "Referral",
    "Cold Call",
    "Email Campaign",
    "Trade Show",
    "Advertisement",
    "Partner",
    "Direct Mail",
    "Other",
  ]

  const pipelineStages = ["Prospecting", "Qualification", "Proposal", "Negotiation", "Closed Won", "Closed Lost"]

  const addContact = () => {
    setContacts([...contacts, { name: "", title: "", email: "", phone: "", isPrimary: false }])
  }

  const updateContact = (index: number, field: keyof ContactInfo, value: string | boolean) => {
    const updatedContacts = contacts.map((contact, i) => (i === index ? { ...contact, [field]: value } : contact))
    setContacts(updatedContacts)
  }

  const removeContact = (index: number) => {
    if (contacts.length > 1) {
      setContacts(contacts.filter((_, i) => i !== index))
    }
  }

  const formatCurrency = (amount: string) => {
    const num = Number.parseFloat(amount)
    if (isNaN(num)) return "₦0"
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(num)
  }

  const getLeadScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100"
    if (score >= 60) return "text-amber-600 bg-amber-100"
    if (score >= 40) return "text-blue-600 bg-blue-100"
    return "text-gray-600 bg-gray-100"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Add New Lead</h2>
          <p className="text-muted-foreground">Create a new lead opportunity</p>
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
            Save Lead
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="company" className="space-y-4">
            <TabsList>
              <TabsTrigger value="company">Company Info</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
              <TabsTrigger value="opportunity">Opportunity</TabsTrigger>
              <TabsTrigger value="notes">Notes & Tasks</TabsTrigger>
            </TabsList>

            <TabsContent value="company" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                  <CardDescription>Basic details about the prospect company</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        placeholder="Enter company name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((ind) => (
                            <SelectItem key={ind} value={ind.toLowerCase()}>
                              {ind}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      placeholder="https://company.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter company address..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="leadSource">Lead Source</Label>
                      <Select value={leadSource} onValueChange={setLeadSource}>
                        <SelectTrigger>
                          <SelectValue placeholder="How did you find this lead?" />
                        </SelectTrigger>
                        <SelectContent>
                          {leadSources.map((source) => (
                            <SelectItem key={source} value={source.toLowerCase()}>
                              {source}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="leadScore">Lead Score</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="leadScore"
                          type="number"
                          min="0"
                          max="100"
                          placeholder="0-100"
                          value={leadScore || ""}
                          onChange={(e) => setLeadScore(Number.parseInt(e.target.value) || 0)}
                        />
                        <Badge className={getLeadScoreColor(leadScore)} variant="secondary">
                          {leadScore >= 80 ? "Hot" : leadScore >= 60 ? "Warm" : leadScore >= 40 ? "Cold" : "New"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="qualified" checked={isQualified} onCheckedChange={setIsQualified} />
                    <Label htmlFor="qualified">Mark as qualified lead</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contacts" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Contact Information</CardTitle>
                      <CardDescription>Add key contacts at this company</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={addContact}>
                      <User className="w-4 h-4 mr-2" />
                      Add Contact
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contacts.map((contact, index) => (
                    <div key={index} className="p-4 rounded-lg border space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">Contact {index + 1}</span>
                          {contact.isPrimary && (
                            <Badge variant="secondary" className="text-xs">
                              Primary
                            </Badge>
                          )}
                        </div>
                        {contacts.length > 1 && (
                          <Button variant="ghost" size="sm" onClick={() => removeContact(index)}>
                            Remove
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Full Name</Label>
                          <Input
                            placeholder="Contact name"
                            value={contact.name}
                            onChange={(e) => updateContact(index, "name", e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Job Title</Label>
                          <Input
                            placeholder="Job title"
                            value={contact.title}
                            onChange={(e) => updateContact(index, "title", e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Email</Label>
                          <Input
                            type="email"
                            placeholder="email@company.com"
                            value={contact.email}
                            onChange={(e) => updateContact(index, "email", e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Phone</Label>
                          <Input
                            placeholder="+234 xxx xxx xxxx"
                            value={contact.phone}
                            onChange={(e) => updateContact(index, "phone", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={contact.isPrimary}
                          onCheckedChange={(checked) => updateContact(index, "isPrimary", checked)}
                        />
                        <Label className="text-xs">Primary contact</Label>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="opportunity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Opportunity Details</CardTitle>
                  <CardDescription>Sales opportunity and deal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="estimatedValue">Estimated Deal Value</Label>
                      <Input
                        id="estimatedValue"
                        type="number"
                        placeholder="0"
                        value={estimatedValue}
                        onChange={(e) => setEstimatedValue(e.target.value)}
                      />
                      {estimatedValue && (
                        <p className="text-sm text-muted-foreground">{formatCurrency(estimatedValue)}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Expected Close Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !expectedCloseDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {expectedCloseDate ? format(expectedCloseDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={expectedCloseDate}
                            onSelect={setExpectedCloseDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notes & Follow-up Tasks</CardTitle>
                  <CardDescription>Additional information and next steps</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Enter any additional notes about this lead..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={6}
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
                    💡 <strong>Lead Score:</strong> Based on company size and industry, this lead scores 75/100 - High
                    potential!
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-sm text-green-800">
                    📞 <strong>Next Action:</strong> Schedule a discovery call within 48 hours for best conversion
                    rates.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <p className="text-sm text-amber-800">
                    🎯 <strong>Similar Deals:</strong> Companies in this industry typically close deals worth
                    ₦120K-₦200K.
                  </p>
                </div>
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
                <Phone className="w-4 h-4 mr-2" />
                Schedule Call
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Book Meeting
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Star className="w-4 h-4 mr-2" />
                Add to Favorites
              </Button>
            </CardContent>
          </Card>

          {/* Lead Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Lead Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Lead Score</span>
                <Badge className={getLeadScoreColor(leadScore)} variant="secondary">
                  {leadScore}/100
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Estimated Value</span>
                <span className="font-medium">{formatCurrency(estimatedValue)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Contacts</span>
                <span className="font-medium">{contacts.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <Badge variant={isQualified ? "default" : "secondary"}>{isQualified ? "Qualified" : "New"}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
