"use client"

import { usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import {
  Award,
  BarChart3,
  BookOpen,
  Building2,
  CreditCard,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  Settings,
  TrendingUp,
  UserCheck,
  Users,
  CheckCircle,
  BadgeIcon as Certificate,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

// Mock function to get user role - in a real app, this would come from auth
const getUserRole = () => {
  const pathname = usePathname()
  if (pathname.includes("/dashboard/student")) return "student"
  if (pathname.includes("/dashboard/university")) return "university"
  if (pathname.includes("/dashboard/industry")) return "industry"
  if (pathname.includes("/dashboard/admin")) return "admin"
  return "student" // Default
}

// Mock function to get user data - in a real app, this would come from auth/API
const getUserData = (role: string) => {
  switch (role) {
    case "student":
      return { name: "Rahul Ahmed", details: "Computer Science, Year 3", avatar: "RA" }
    case "university":
      return { name: "Dhaka University", details: "Computer Science Dept.", avatar: "DU" }
    case "industry":
      return { name: "TechCorp Inc.", details: "Software Solutions", avatar: "TC" }
    case "admin":
      return { name: "Admin User", details: "Super Administrator", avatar: "AD" }
    default:
      return { name: "User", details: "", avatar: "U" }
  }
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const role = getUserRole()
  const userData = getUserData(role)
  const currentTab = searchParams.get("tab")

  const isActive = (path: string, tab?: string) => {
    if (tab) {
      return pathname === path && currentTab === tab
    }
    // For paths with potential query params, just check the base path
    if (path.includes("?")) {
      const basePath = path.split("?")[0]
      return pathname === basePath
    }
    return pathname === path
  }

  const menuItems = {
    student: [
      { href: "/dashboard/student", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/dashboard/student?tab=courses", icon: BookOpen, label: "Courses & Tasks" },
      { href: "/dashboard/student/problems", icon: FileText, label: "All Problems" },
      { href: "/dashboard/student/submissions", icon: CheckCircle, label: "My Submissions" },
      { href: "/dashboard/student?tab=performance", icon: Award, label: "Performance" },
      { href: "/dashboard/student/certificates", icon: Certificate, label: "Certificates" },
      { href: "/dashboard/student/leaderboard", icon: TrendingUp, label: "Leaderboard" },
      { href: "/dashboard/student/settings", icon: Settings, label: "Settings" },
    ],
    university: [
      { href: "/dashboard/university", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/dashboard/university/courses", icon: BookOpen, label: "Courses" },
      { href: "/dashboard/university/students", icon: Users, label: "Students" },
      { href: "/dashboard/university/problems", icon: FileText, label: "Problems" },
      { href: "/dashboard/university/problem-assignment", icon: PlusCircle, label: "Problem Assignment" },
      { href: "/dashboard/university/analytics", icon: BarChart3, label: "Analytics" },
      { href: "/dashboard/university/departments", icon: Building2, label: "Departments" },
      { href: "/dashboard/university/settings", icon: Settings, label: "Settings" },
    ],
    industry: [
      { href: "/dashboard/industry", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/dashboard/industry/task-creation", icon: PlusCircle, label: "Task Creation" },
      { href: "/dashboard/industry/problem-management", icon: FileText, label: "Problem Management" },
      { href: "/dashboard/industry/task-evaluation", icon: CheckCircle, label: "Task Evaluation" },
      { href: "/dashboard/industry/submissions", icon: BookOpen, label: "Submissions" },
     
    ],
    admin: [
      { href: "/dashboard/admin", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/dashboard/admin/registration-requests", icon: UserCheck, label: "Registration Requests" },
      { href: "/dashboard/admin/subscription-packages", icon: CreditCard, label: "Subscription Packages" },
      { href: "/dashboard/admin/universities", icon: Building2, label: "Universities" },
      { href: "/dashboard/admin/students", icon: GraduationCap, label: "Students" },
      { href: "/dashboard/admin/industries", icon: Building2, label: "Industries" },
      { href: "/dashboard/admin/problems", icon: FileText, label: "All Problems" },
      
    ],
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          {/* <TrendingUp className="h-6 w-6 text-orange-600" />
          <span className="text-xl font-bold">SkillBridge</span> */}
           <img src="/logo.png" alt="" className="w-44" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems[role as keyof typeof menuItems].map((item) => {
            const href = item.href
            const tab = href.includes("?tab=") ? href.split("?tab=")[1] : undefined
            const path = tab ? href.split("?")[0] : href

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={isActive(path, tab)}>
                  <Link href={item.href} className="pl-6">
                    <item.icon className="h-5 w-5 text-orange-600 hover:text-orange-700" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${userData.avatar}`} alt="User" />
              <AvatarFallback>{userData.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{userData.name}</div>
              <div className="text-xs text-muted-foreground">{userData.details}</div>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="w-full justify-start mt-4">
            <LogOut className="h-4 w-4 mr-2" />
            Log Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
