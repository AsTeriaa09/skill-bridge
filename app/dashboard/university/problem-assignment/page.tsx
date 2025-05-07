"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CheckCircle, Filter, PlusCircle } from "lucide-react"

export default function ProblemAssignmentPage() {
  const [selectedSemester, setSelectedSemester] = useState<string>("6")
  const [selectedDepartment, setSelectedDepartment] = useState<string>("cs")
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [currentProblem, setCurrentProblem] = useState<any>(null)

  // Mock data for available problems from industry
  const availableProblems = [
    {
      id: 1,
      title: "E-commerce Recommendation Algorithm",
      company: "TechCorp Inc.",
      difficulty: "Intermediate",
      tags: ["Computer Science", "Data Science", "Machine Learning"],
      deadline: "June 15, 2023",
      status: "Unassigned",
      points: 150,
      description:
        "Design and implement a recommendation algorithm for an e-commerce platform that suggests products based on user browsing history and purchase patterns.",
    },
    {
      id: 2,
      title: "Mobile App UI/UX Redesign",
      company: "AppWorks Solutions",
      difficulty: "Intermediate",
      tags: ["Design", "Mobile Development", "UI/UX"],
      deadline: "June 10, 2023",
      status: "Unassigned",
      points: 120,
      description:
        "Redesign the user interface and experience for a mobile banking application to improve usability and accessibility.",
    },
    {
      id: 3,
      title: "Sustainable Supply Chain Optimization",
      company: "GreenLogistics Ltd.",
      difficulty: "Advanced",
      tags: ["Business", "Logistics", "Optimization"],
      deadline: "July 20, 2023",
      status: "Unassigned",
      points: 200,
      description:
        "Develop a model to optimize supply chain operations while minimizing carbon footprint and environmental impact.",
    },
    {
      id: 4,
      title: "Healthcare Patient Management System",
      company: "MediTech",
      difficulty: "Intermediate",
      tags: ["Healthcare", "Database", "Security"],
      deadline: "July 25, 2023",
      status: "Unassigned",
      points: 180,
      description: "Design and implement a secure patient management system for healthcare providers.",
    },
  ]

  // Mock data for assigned problems
  const assignedProblems = [
    {
      id: 5,
      title: "Data Visualization Dashboard",
      company: "DataViz Corp",
      difficulty: "Advanced",
      tags: ["Data Visualization", "Web Development", "JavaScript"],
      deadline: "May 20, 2023",
      status: "Assigned",
      points: 200,
      semester: "6",
      department: "cs",
      assignedDate: "April 15, 2023",
      description:
        "Create an interactive data visualization dashboard for financial analytics using modern web technologies.",
    },
    {
      id: 6,
      title: "Inventory Management System",
      company: "LogiTech Solutions",
      difficulty: "Intermediate",
      tags: ["Database", "Backend", "System Design"],
      deadline: "June 30, 2023",
      status: "Assigned",
      points: 150,
      semester: "6",
      department: "cs",
      assignedDate: "May 1, 2023",
      description: "Develop an inventory management system with real-time tracking and reporting capabilities.",
    },
    {
      id: 7,
      title: "Social Media Analytics Tool",
      company: "SocialInsight",
      difficulty: "Advanced",
      tags: ["Data Analysis", "API Integration", "Frontend"],
      deadline: "July 15, 2023",
      status: "Assigned",
      points: 180,
      semester: "5",
      department: "cs",
      assignedDate: "April 20, 2023",
      description: "Build a tool to analyze social media data and generate actionable insights for marketing teams.",
    },
    {
      id: 8,
      title: "Smart Energy Management System",
      company: "EnergyTech",
      difficulty: "Advanced",
      tags: ["IoT", "Energy", "Data Analysis"],
      deadline: "August 10, 2023",
      status: "Assigned",
      points: 220,
      semester: "4",
      department: "ee",
      assignedDate: "May 5, 2023",
      description:
        "Develop a smart energy management system that optimizes energy consumption in commercial buildings.",
    },
  ]

  const handleAssignProblem = (problem: any) => {
    setCurrentProblem(problem)
    setAssignDialogOpen(true)
  }

  const confirmAssignment = () => {
    // In a real app, this would make an API call to assign the problem
    setAssignDialogOpen(false)
    // Show success message or update UI
  }

  // Filter assigned problems based on selected semester and department
  const filteredAssignedProblems = assignedProblems.filter(
    (problem) =>
      problem.semester === selectedSemester &&
      (selectedDepartment === "all" || problem.department === selectedDepartment),
  )

  return (
    <div>
      <DashboardHeader title="Problem Assignment" />
      <div className="p-6 space-y-6">
        <Tabs defaultValue="available" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="available">Available Problems</TabsTrigger>
              <TabsTrigger value="assigned">Assigned Problems</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">4th Semester</SelectItem>
                  <SelectItem value="5">5th Semester</SelectItem>
                  <SelectItem value="6">6th Semester</SelectItem>
                  <SelectItem value="7">7th Semester</SelectItem>
                  <SelectItem value="8">8th Semester</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="ee">Electrical Engineering</SelectItem>
                  <SelectItem value="me">Mechanical Engineering</SelectItem>
                  <SelectItem value="ba">Business Administration</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="available" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Problems from Industry</CardTitle>
                <CardDescription>
                  These problems have been submitted by industry partners and are available for assignment to students
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {availableProblems.map((problem) => (
                  <div key={problem.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{problem.title}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Posted by {problem.company} • Difficulty: {problem.difficulty}
                        </div>
                      </div>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/20 dark:text-amber-400">
                        Unassigned
                      </Badge>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">{problem.description}</div>
                    <div className="flex items-center gap-2 mt-3">
                      {problem.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-muted-foreground">Deadline: {problem.deadline}</div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium text-emerald-600">{problem.points} points</div>
                        <Button size="sm" className="gap-2" onClick={() => handleAssignProblem(problem)}>
                          <PlusCircle className="h-4 w-4" />
                          Assign to Students
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assigned" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Assigned Problems</CardTitle>
                <CardDescription>
                  Problems that have been assigned to students in semester {selectedSemester}
                  {selectedDepartment !== "all" && ` (${selectedDepartment.toUpperCase()} Department)`}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredAssignedProblems.length > 0 ? (
                  filteredAssignedProblems.map((problem) => (
                    <div key={problem.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">{problem.title}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Posted by {problem.company} • Difficulty: {problem.difficulty}
                          </div>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400">
                          Assigned
                        </Badge>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">{problem.description}</div>
                      <div className="flex items-center gap-2 mt-3">
                        {problem.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-muted-foreground">
                          Assigned on: {problem.assignedDate} • Deadline: {problem.deadline}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium text-emerald-600">{problem.points} points</div>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No problems assigned for the selected semester and department.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <AlertDialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle>Assign Problem to Students</AlertDialogTitle>
              <AlertDialogDescription>
                Select the semester and department to assign this problem to students.
              </AlertDialogDescription>
            </AlertDialogHeader>

            {currentProblem && (
              <div className="py-4">
                <h3 className="font-medium">{currentProblem.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Posted by {currentProblem.company} • {currentProblem.points} points
                </p>

                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="semester">Semester</Label>
                    <Select defaultValue="6">
                      <SelectTrigger id="semester">
                        <SelectValue placeholder="Select Semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4">4th Semester</SelectItem>
                        <SelectItem value="5">5th Semester</SelectItem>
                        <SelectItem value="6">6th Semester</SelectItem>
                        <SelectItem value="7">7th Semester</SelectItem>
                        <SelectItem value="8">8th Semester</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select defaultValue="cs">
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cs">Computer Science</SelectItem>
                        <SelectItem value="ee">Electrical Engineering</SelectItem>
                        <SelectItem value="me">Mechanical Engineering</SelectItem>
                        <SelectItem value="ba">Business Administration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deadline">Deadline</Label>
                    <Input id="deadline" type="date" defaultValue="2023-06-15" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify" />
                    <Label htmlFor="notify">Notify students about this assignment</Label>
                  </div>
                </div>
              </div>
            )}

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmAssignment} className="bg-emerald-600 hover:bg-emerald-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Assign Problem
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
