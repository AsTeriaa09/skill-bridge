"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { CheckCircle, PlusCircle, Trash } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function CourseProblemsPage({ params }: { params: { courseId: string } }) {
  const router = useRouter()
  const courseId = params.courseId
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false)
  const [currentProblem, setCurrentProblem] = useState<any>(null)

  // Mock course data
  const course = {
    id: 1,
    code: "CSE301",
    title: "Database Systems",
    semester: "6",
    department: "Computer Science",
    instructor: "Dr. Anisul Islam",
    students: 45,
    problems: 3,
  }

  // Mock data for available problems from industry
  const [availableProblems, setAvailableProblems] = useState([
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
  ])

  // Mock data for assigned problems
  const [assignedProblems, setAssignedProblems] = useState([
    {
      id: 4,
      title: "Database Design for E-commerce Platform",
      company: "ShopTech Solutions",
      difficulty: "Intermediate",
      tags: ["Database", "E-commerce", "SQL"],
      deadline: "June 20, 2023",
      status: "Assigned",
      points: 150,
      assignedDate: "May 1, 2023",
      description:
        "Design and implement a database schema for an e-commerce platform with complex product relationships and user management.",
    },
    {
      id: 5,
      title: "Query Optimization Challenge",
      company: "DataPerf Inc.",
      difficulty: "Advanced",
      tags: ["Database", "Performance", "SQL"],
      deadline: "June 30, 2023",
      status: "Assigned",
      points: 180,
      assignedDate: "May 5, 2023",
      description:
        "Optimize a set of complex SQL queries to improve performance on a large dataset with millions of records.",
    },
    {
      id: 6,
      title: "NoSQL Database Migration",
      company: "CloudTech Services",
      difficulty: "Advanced",
      tags: ["NoSQL", "Migration", "Database"],
      deadline: "July 15, 2023",
      status: "Assigned",
      points: 200,
      assignedDate: "May 10, 2023",
      description:
        "Design and implement a migration strategy from a relational database to a NoSQL database while maintaining data integrity.",
    },
  ])

  const handleAssignProblem = (problem: any) => {
    setCurrentProblem(problem)
    setAssignDialogOpen(true)
  }

  const handleRemoveProblem = (problem: any) => {
    setCurrentProblem(problem)
    setRemoveDialogOpen(true)
  }

  const confirmAssignment = () => {
    // In a real app, this would make an API call to assign the problem to the course
    setAssignDialogOpen(false)

    // Move problem from available to assigned
    const problemToAssign = availableProblems.find((p) => p.id === currentProblem.id)
    if (problemToAssign) {
      const updatedAvailableProblems = availableProblems.filter((p) => p.id !== currentProblem.id)
      const updatedAssignedProblems = [
        ...assignedProblems,
        {
          ...problemToAssign,
          status: "Assigned",
          assignedDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        },
      ]

      setAvailableProblems(updatedAvailableProblems)
      setAssignedProblems(updatedAssignedProblems)

      toast({
        title: "Problem Assigned",
        description: `"${problemToAssign.title}" has been assigned to ${course.code}: ${course.title} (${course.semester}th Semester).`,
      })
    }
  }

  const confirmRemoval = () => {
    // In a real app, this would make an API call to remove the problem from the course
    setRemoveDialogOpen(false)

    // Move problem from assigned to available
    const problemToRemove = assignedProblems.find((p) => p.id === currentProblem.id)
    if (problemToRemove) {
      const updatedAssignedProblems = assignedProblems.filter((p) => p.id !== currentProblem.id)
      const updatedAvailableProblems = [
        ...availableProblems,
        {
          ...problemToRemove,
          status: "Unassigned",
        },
      ]

      setAssignedProblems(updatedAssignedProblems)
      setAvailableProblems(updatedAvailableProblems)

      toast({
        title: "Problem Removed",
        description: `"${problemToRemove.title}" has been removed from this course.`,
      })
    }
  }

  return (
    <div>
      <DashboardHeader title={`Course Problems: ${course.code} - ${course.title}`} />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">
              {course.code}: {course.title}
            </h2>
            <p className="text-muted-foreground">
              {course.department} • {course.semester}th Semester • {course.instructor}
            </p>
          </div>
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400">
            {course.students} Students
          </Badge>
        </div>

        <Tabs defaultValue="assigned" className="space-y-4">
          <TabsList>
            <TabsTrigger value="assigned">Assigned Problems</TabsTrigger>
            <TabsTrigger value="available">Available Problems</TabsTrigger>
          </TabsList>

          <TabsContent value="assigned" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Problems Assigned to This Course</CardTitle>
                <CardDescription>These problems have been assigned to students in this course</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {assignedProblems.length > 0 ? (
                  assignedProblems.map((problem) => (
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
                          <Button size="sm" variant="outline" onClick={() => router.push(`/problem/${problem.id}`)}>
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleRemoveProblem(problem)}
                          >
                            <Trash className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No problems have been assigned to this course yet.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="available" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Problems from Industry</CardTitle>
                <CardDescription>
                  These problems have been submitted by industry partners and can be assigned to this course
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {availableProblems.length > 0 ? (
                  availableProblems.map((problem) => (
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
                          <Button size="sm" variant="outline" onClick={() => router.push(`/problem/${problem.id}`)}>
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            className="gap-2 bg-emerald-600 hover:bg-emerald-700"
                            onClick={() => handleAssignProblem(problem)}
                          >
                            <PlusCircle className="h-4 w-4" />
                            Assign to Course
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">No available problems to assign.</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Assign Problem Dialog */}
        <AlertDialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle>Assign Problem to Course</AlertDialogTitle>
              <AlertDialogDescription>
                This problem will be assigned to all students in {course.code}: {course.title} ({course.semester}th
                Semester).
              </AlertDialogDescription>
            </AlertDialogHeader>

            {currentProblem && (
              <div className="py-4">
                <h3 className="font-medium">{currentProblem.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Posted by {currentProblem.company} • {currentProblem.points} points
                </p>

                <div className="space-y-4 mt-4">
                  <div className="p-3 bg-muted rounded-md">
                    <div className="font-medium text-sm">Course Information</div>
                    <div className="text-sm mt-1">Semester: {course.semester}th Semester</div>
                    <div className="text-sm">Department: {course.department}</div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify" />
                    <Label htmlFor="notify">Notify students about this assignment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="required" defaultChecked />
                    <Label htmlFor="required">Mark as required for course completion</Label>
                  </div>
                </div>
              </div>
            )}

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmAssignment} className="bg-emerald-600 hover:bg-emerald-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Assign to Course
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Remove Problem Dialog */}
        <AlertDialog open={removeDialogOpen} onOpenChange={setRemoveDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove Problem from Course</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove this problem from the course? Students will no longer have access to it.
              </AlertDialogDescription>
            </AlertDialogHeader>

            {currentProblem && (
              <div className="py-2">
                <h3 className="font-medium">{currentProblem.title}</h3>
              </div>
            )}

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmRemoval} className="bg-red-600 hover:bg-red-700">
                Remove Problem
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
