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
import { Save, Bot, Upload, DollarSign, MapPin, WifiOff, Camera } from "lucide-react"

interface LocationStock {
  locationId: string
  locationName: string
  currentStock: number
  minStock: number
  maxStock: number
}

export function ProductForm() {
  const [productName, setProductName] = useState("")
  const [sku, setSku] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [unitPrice, setUnitPrice] = useState("")
  const [costPrice, setCostPrice] = useState("")
  const [isTrackable, setIsTrackable] = useState(true)
  const [isActive, setIsActive] = useState(true)
  const [aiSuggestions, setAiSuggestions] = useState(true)
  const [isOffline, setIsOffline] = useState(false)

  const [locationStocks, setLocationStocks] = useState<LocationStock[]>([
    { locationId: "main", locationName: "Main Warehouse", currentStock: 0, minStock: 10, maxStock: 100 },
    { locationId: "retail", locationName: "Retail Store", currentStock: 0, minStock: 5, maxStock: 50 },
    { locationId: "backup", locationName: "Backup Storage", currentStock: 0, minStock: 0, maxStock: 25 },
  ])

  const categories = [
    "Electronics",
    "Furniture",
    "Accessories",
    "Office Supplies",
    "Equipment",
    "Software",
    "Services",
    "Raw Materials",
  ]

  const updateLocationStock = (locationId: string, field: keyof LocationStock, value: number) => {
    setLocationStocks(
      locationStocks.map((stock) => (stock.locationId === locationId ? { ...stock, [field]: value } : stock)),
    )
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

  const calculateProfitMargin = () => {
    const cost = Number.parseFloat(costPrice) || 0
    const price = Number.parseFloat(unitPrice) || 0
    if (cost === 0) return 0
    return ((price - cost) / cost) * 100
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Add New Product</h2>
          <p className="text-muted-foreground">Create a new product in your inventory</p>
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
            Save Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList>
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="locations">Locations</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Product Information</CardTitle>
                  <CardDescription>Basic details about the product</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="productName">Product Name *</Label>
                      <Input
                        id="productName"
                        placeholder="Enter product name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sku">SKU *</Label>
                      <Input id="sku" placeholder="PRD-001" value={sku} onChange={(e) => setSku(e.target.value)} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat.toLowerCase()}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter product description..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="trackable" checked={isTrackable} onCheckedChange={setIsTrackable} />
                      <Label htmlFor="trackable">Track inventory</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="active" checked={isActive} onCheckedChange={setIsActive} />
                      <Label htmlFor="active">Active product</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing Information</CardTitle>
                  <CardDescription>Set cost and selling prices</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="costPrice">Cost Price</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="costPrice"
                          type="number"
                          placeholder="0.00"
                          className="pl-10"
                          value={costPrice}
                          onChange={(e) => setCostPrice(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="unitPrice">Selling Price</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="unitPrice"
                          type="number"
                          placeholder="0.00"
                          className="pl-10"
                          value={unitPrice}
                          onChange={(e) => setUnitPrice(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {costPrice && unitPrice && (
                    <div className="p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Profit Margin</span>
                        <div className="text-right">
                          <div className="font-bold text-lg">
                            {formatCurrency((Number.parseFloat(unitPrice) - Number.parseFloat(costPrice)).toString())}
                          </div>
                          <div className={`text-sm ${calculateProfitMargin() > 0 ? "text-green-600" : "text-red-600"}`}>
                            {calculateProfitMargin().toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Settings</CardTitle>
                  <CardDescription>Configure stock tracking and reorder points</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    Global inventory settings will be configured here.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="locations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Location Stock Levels</CardTitle>
                  <CardDescription>Set stock levels for each location</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {locationStocks.map((location) => (
                    <div key={location.locationId} className="p-4 rounded-lg border">
                      <div className="flex items-center space-x-2 mb-3">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <h4 className="font-medium">{location.locationName}</h4>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Current Stock</Label>
                          <Input
                            type="number"
                            placeholder="0"
                            value={location.currentStock || ""}
                            onChange={(e) =>
                              updateLocationStock(
                                location.locationId,
                                "currentStock",
                                Number.parseInt(e.target.value) || 0,
                              )
                            }
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Min Stock</Label>
                          <Input
                            type="number"
                            placeholder="0"
                            value={location.minStock || ""}
                            onChange={(e) =>
                              updateLocationStock(location.locationId, "minStock", Number.parseInt(e.target.value) || 0)
                            }
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Max Stock</Label>
                          <Input
                            type="number"
                            placeholder="0"
                            value={location.maxStock || ""}
                            onChange={(e) =>
                              updateLocationStock(location.locationId, "maxStock", Number.parseInt(e.target.value) || 0)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
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
                    💡 <strong>SKU Suggestion:</strong> Based on your category, consider using format: ELC-
                    {productName.slice(0, 3).toUpperCase()}-XXX
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-sm text-green-800">
                    📊 <strong>Pricing Insight:</strong> Similar electronics products have an average margin of 35-45%.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <p className="text-sm text-amber-800">
                    ⚠️ <strong>Stock Reminder:</strong> Set minimum stock levels to avoid stockouts during peak seasons.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Product Image */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Product Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">Upload product image</p>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Locations</span>
                <span className="font-medium">{locationStocks.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Stock</span>
                <span className="font-medium">{locationStocks.reduce((sum, loc) => sum + loc.currentStock, 0)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Estimated Value</span>
                <span className="font-medium">
                  {formatCurrency(
                    (
                      locationStocks.reduce((sum, loc) => sum + loc.currentStock, 0) *
                      (Number.parseFloat(unitPrice) || 0)
                    ).toString(),
                  )}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
