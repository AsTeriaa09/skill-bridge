"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Building2, ChevronDown, GraduationCap, ShieldCheck, Users } from "lucide-react"

export function RoleSwitcher() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const roles = [
    { name: "Student", path: "/dashboard/student", icon: GraduationCap },
    { name: "University", path: "/dashboard/university", icon: Building2 },
    { name: "Industry", path: "/dashboard/industry", icon: Users },
    { name: "Admin", path: "/dashboard/admin", icon: ShieldCheck },
  ]

  const getCurrentRole = () => {
    // This is a simple implementation - in a real app, you'd get this from auth
    const path = window.location.pathname
    if (path.includes("/dashboard/student")) return "Student"
    if (path.includes("/dashboard/university")) return "University"
    if (path.includes("/dashboard/industry")) return "Industry"
    if (path.includes("/dashboard/admin")) return "Admin"
    return "Select Role"
  }

  const handleRoleChange = (path: string) => {
    setOpen(false)
    router.push(path)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <span>Role: {getCurrentRole()}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {roles.map((role) => (
          <DropdownMenuItem key={role.name} onClick={() => handleRoleChange(role.path)}>
            <role.icon className="mr-2 h-4 w-4" />
            <span>{role.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
