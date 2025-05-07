import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { ThemeProvider } from "@/components/theme-provider"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <SidebarProvider>
        <div className="flex min-h-screen">
          <DashboardSidebar />
          <main className="flex-1">{children}</main>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  )
}
