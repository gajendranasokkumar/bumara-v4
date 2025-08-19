"use client"

import { useState } from "react"
import { ERPSidebar } from "@/components/layout/erp-sidebar"
import { ERPOverview } from "@/components/dashboard/erp-overview"
import { ComplianceDashboard } from "@/components/compliance-dashboard"
import { AccountingDashboard } from "@/components/accounting/accounting-dashboard"
import { InventoryDashboard } from "@/components/inventory/inventory-dashboard"
import { CRMDashboard } from "@/components/crm/crm-dashboard"
import { PayrollDashboard } from "@/components/payroll/payroll-dashboard"
import { DocumentsDashboard } from "@/components/documents/documents-dashboard"
import { MuraAIAssistant } from "@/components/ai/mura-ai-assistant"

export default function DashboardPage() {
  const [currentModule, setCurrentModule] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const renderModule = () => {
    switch (currentModule) {
      case "dashboard":
        return <ERPOverview onModuleSelect={setCurrentModule} />
      case "compliance":
        return <ComplianceDashboard />
      case "accounting":
        return <AccountingDashboard />
      case "inventory":
        return <InventoryDashboard />
      case "crm":
        return <CRMDashboard />
      case "payroll":
        return <PayrollDashboard />
      case "documents":
        return <DocumentsDashboard />
      case "ai-assistant":
        return <MuraAIAssistant />
      default:
        return <ERPOverview onModuleSelect={setCurrentModule} />
    }
  }

  return (
    <>
      <ERPSidebar
        currentModule={currentModule}
        onModuleChange={setCurrentModule}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className="flex-1 overflow-auto">
        <div className="p-6 min-h-full">{renderModule()}</div>
      </main>
    </>
  )
}


