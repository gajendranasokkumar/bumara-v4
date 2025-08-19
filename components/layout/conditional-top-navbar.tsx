"use client"

import { usePathname } from "next/navigation"
import { TopNavbar } from "@/components/layout/top-navbar"

export function ConditionalTopNavbar() {
  const pathname = usePathname()
  if (pathname === "/") return null
  return <TopNavbar />
}


