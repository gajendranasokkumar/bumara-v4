"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Package,
  TrendingUp,
  AlertTriangle,
  ShoppingCart,
  Truck,
  BarChart3,
  Plus,
  Download,
  Filter,
  Search,
  MapPin,
  DollarSign,
  Box,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function InventoryDashboard() {
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("current-month")

  const inventoryMetrics = {
    totalItems: 1247,
    totalValue: 8500000,
    lowStockItems: 12,
    outOfStockItems: 3,
    pendingOrders: 34,
    reorderSuggestions: 8,
  }

  const locations = [
    { id: "main", name: "Main Warehouse", items: 856, value: 6200000 },
    { id: "retail", name: "Retail Store", items: 234, value: 1800000 },
    { id: "backup", name: "Backup Storage", items: 157, value: 500000 },
  ]

  const topProducts = [
    {
      id: "PRD-001",
      name: "Premium Office Chair",
      sku: "OFC-CHR-001",
      category: "Furniture",
      stock: 45,
      minStock: 10,
      value: 2250000,
      movement: 12,
      trend: "up",
    },
    {
      id: "PRD-002",
      name: "Wireless Headphones",
      sku: "ELC-HDP-002",
      category: "Electronics",
      stock: 8,
      minStock: 15,
      value: 480000,
      movement: -7,
      trend: "down",
    },
    {
      id: "PRD-003",
      name: "Standing Desk",
      sku: "FUR-DSK-003",
      category: "Furniture",
      stock: 23,
      minStock: 5,
      value: 1380000,
      movement: 5,
      trend: "up",
    },
    {
      id: "PRD-004",
      name: "Laptop Bag",
      sku: "ACC-BAG-004",
      category: "Accessories",
      stock: 2,
      minStock: 20,
      value: 60000,
      movement: -18,
      trend: "down",
    },
  ]

  const recentMovements = [
    {
      id: "MOV-001",
      type: "sale",
      product: "Premium Office Chair",
      quantity: -3,
      location: "Retail Store",
      date: "2024-01-15",
      reference: "SO-2024-001",
    },
    {
      id: "MOV-002",
      type: "purchase",
      product: "Wireless Headphones",
      quantity: 25,
      location: "Main Warehouse",
      date: "2024-01-15",
      reference: "PO-2024-012",
    },
    {
      id: "MOV-003",
      type: "transfer",
      product: "Standing Desk",
      quantity: -5,
      location: "Main Warehouse → Retail Store",
      date: "2024-01-14",
      reference: "TRF-2024-003",
    },
    {
      id: "MOV-004",
      type: "adjustment",
      product: "Laptop Bag",
      quantity: -2,
      location: "Main Warehouse",
      date: "2024-01-14",
      reference: "ADJ-2024-001",
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStockStatus = (current: number, minimum: number) => {
    if (current === 0) return { status: "out-of-stock", color: "text-red-600", bg: "bg-red-100" }
    if (current <= minimum) return { status: "low-stock", color: "text-amber-600", bg: "bg-amber-100" }
    return { status: "in-stock", color: "text-green-600", bg: "bg-green-100" }
  }

  const getMovementIcon = (type: string) => {
    switch (type) {
      case "sale":
        return <ShoppingCart className="w-4 h-4 text-blue-500" />
      case "purchase":
        return <Truck className="w-4 h-4 text-green-500" />
      case "transfer":
        return <Package className="w-4 h-4 text-purple-500" />
      case "adjustment":
        return <BarChart3 className="w-4 h-4 text-amber-500" />
      default:
        return <Box className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground">Track stock levels, orders, and inventory movements</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryMetrics.totalItems.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all locations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(inventoryMetrics.totalValue)}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{inventoryMetrics.lowStockItems}</div>
            <p className="text-xs text-muted-foreground">Items below minimum</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{inventoryMetrics.outOfStockItems}</div>
            <p className="text-xs text-muted-foreground">Items with zero stock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryMetrics.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">Purchase orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Suggestions</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{inventoryMetrics.reorderSuggestions}</div>
            <p className="text-xs text-muted-foreground">Reorder recommendations</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="movements">Movements</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle>Top Products by Value</CardTitle>
                <CardDescription>Highest value inventory items</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stock, product.minStock)
                  return (
                    <div key={product.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${stockStatus.bg}`} />
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {product.sku} • {product.category}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{formatCurrency(product.value)}</div>
                        <div className="text-sm text-muted-foreground">
                          Stock: {product.stock} / Min: {product.minStock}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Location Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Location Overview</CardTitle>
                <CardDescription>Inventory distribution across locations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {locations.map((location) => (
                  <div key={location.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{location.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{formatCurrency(location.value)}</div>
                        <div className="text-sm text-muted-foreground">{location.items} items</div>
                      </div>
                    </div>
                    <Progress value={(location.value / inventoryMetrics.totalValue) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Stock Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Stock Alerts & AI Recommendations</CardTitle>
              <CardDescription>Items requiring attention and AI-powered suggestions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      <div>
                        <div className="font-medium text-red-800">Out of Stock Alert</div>
                        <div className="text-sm text-red-600">3 items are completely out of stock</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-red-300 text-red-700 bg-transparent">
                      View Items
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                      <div>
                        <div className="font-medium text-amber-800">Low Stock Warning</div>
                        <div className="text-sm text-amber-600">12 items are below minimum stock levels</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-amber-300 text-amber-700 bg-transparent">
                      Reorder Now
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="font-medium text-blue-800">AI Reorder Suggestions</div>
                        <div className="text-sm text-blue-600">
                          8 items recommended for reordering based on sales trends
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 bg-transparent">
                      View Suggestions
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Movements */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Stock Movements</CardTitle>
                  <CardDescription>Latest inventory transactions</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All Movements
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentMovements.map((movement) => (
                  <div key={movement.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-3">
                      {getMovementIcon(movement.type)}
                      <div>
                        <div className="font-medium">{movement.product}</div>
                        <div className="text-sm text-muted-foreground">
                          {movement.location} • {movement.date} • {movement.reference}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${movement.quantity > 0 ? "text-green-600" : "text-red-600"}`}>
                        {movement.quantity > 0 ? "+" : ""}
                        {movement.quantity}
                      </div>
                      <Badge variant="outline" className="text-xs capitalize">
                        {movement.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Product Management</CardTitle>
                  <CardDescription>Manage your product catalog and stock levels</CardDescription>
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
                    Add Product
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search products..." className="max-w-sm" />
              </div>
              <div className="text-center py-8 text-muted-foreground">
                Product management table will be implemented here with advanced filtering, sorting, and bulk actions.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Purchase & Sales Orders</CardTitle>
              <CardDescription>Manage incoming and outgoing orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Order management interface will be implemented here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stock Movements</CardTitle>
              <CardDescription>Track all inventory movements and adjustments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Stock movement tracking interface will be implemented here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Multi-Location Management</CardTitle>
              <CardDescription>Manage inventory across multiple locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Multi-location management interface will be implemented here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
