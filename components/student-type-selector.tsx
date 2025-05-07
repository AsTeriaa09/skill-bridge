"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Building2, ChevronDown, GraduationCap, UserCheck } from "lucide-react"

export function StudentTypeSelector() {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [studentType, setStudentType] = useState<"university" | "individual">("university")

  // Check if we're on a student page
  const isStudentPage = pathname.includes("/dashboard/student")

  useEffect(() => {
    // Get student type from localStorage or default to university
    const savedType = localStorage.getItem("studentType") as "university" | "individual" | null
    if (savedType) {
      setStudentType(savedType)
    }
  }, [])

  const handleTypeChange = (type: "university" | "individual") => {
    setStudentType(type)
    localStorage.setItem("studentType", type)
    setOpen(false)

    // If we're on a student page, refresh to show the correct view
    if (isStudentPage) {
      router.refresh()
    }
  }

  // Only show on student pages
  if (!isStudentPage) return null

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          {studentType === "university" ? <Building2 className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
          <span>{studentType === "university" ? "University Student" : "Individual/Graduate"}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Student Type</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleTypeChange("university")}
          className={studentType === "university" ? "bg-muted" : ""}
        >
          <Building2 className="mr-2 h-4 w-4" />
          <span>University Student</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleTypeChange("individual")}
          className={studentType === "individual" ? "bg-muted" : ""}
        >
          <GraduationCap className="mr-2 h-4 w-4" />
          <span>Individual/Graduate</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
