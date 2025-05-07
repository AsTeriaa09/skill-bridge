"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Filter, PlusCircle, Search } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function ProblemsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [selectedCourse, setSelectedCourse] = useState("")
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [currentProblem, setCurrentProblem] = useState<any>(null)
  const [selectedSemester, setSelectedSemester] = useState("")

  // Mock data for problems
  const problems = [
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
      title: "Database Design for E-commerce Platform",
      company: "ShopTech Solutions",
      difficulty: "Intermediate",
      tags: ["Database", "E-commerce", "SQL"],
      deadline: "June 20, 2023",
      status: "Assigned",
      assignedTo: ["CSE301: Database Systems"],
      points: 150,
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
      assignedTo: ["CSE301: Database Systems", "CSE311: Artificial Intelligence"],
      points: 180,
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
      assignedTo: ["CSE301: Database Systems"],
      points: 200,
      description:
        "Design and implement a migration strategy from a relational database to a NoSQL database while maintaining data integrity.",
    },
    {
      id: 7,
      title: "Weather Forecast Application",
      company: "WeatherTech",
      difficulty: "Beginner",
      tags: ["API Integration", "Frontend", "Mobile"],
      deadline: "June 20, 2023",
      status: "Unassigned",
      points: 100,
      description:
        "Build a weather forecast application that integrates with a weather API to display current and forecasted weather conditions.",
    },
  ]

  // Mock data for courses
  const courses = [
    {
      id: 1,
      code: "CSE301",
      title: "Database Systems",
      semester: "6",
      department: "Computer Science",
    },
    {
      id: 2,
      code: "CSE311",
      title: "Artificial Intelligence",
      semester: "6",
      department: "Computer Science",
    },
    {
      id: 3,
      code: "CSE401",
      title: "Software Engineering",
      semester: "7",
      department: "Computer Science",
    },
    {
      id: 4,
      code: "EEE301",
      title: "Digital Signal Processing",
      semester: "6",
      department: "Electrical Engineering",
    },
    {
      id: 5,
      code: "CSE201",
      title: "Data Structures",
      semester: "4",
      department: "Computer Science",
    },
  ]

  // Filter problems based on selected tab, difficulty, and search query
  const filteredProblems = problems
    .filter((problem) => {
      if (selectedTab === "all") return true
      return problem.status === (selectedTab === "unassigned" ? "Unassigned" : "Assigned")
    })
    .filter((problem) => {
      if (selectedDifficulty === "all") return true
      return problem.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
    })
    .filter((problem) => {
      if (!searchQuery) return true
      return (
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    })

  const handleAssignProblem = (problem: any) => {
    setCurrentProblem(problem)
    setAssignDialogOpen(true)
  }

  const confirmAssignment = () => {
    if (!selectedSemester) {
      toast({
        title: "Error",
        description: "Please select a semester.",
        variant: "destructive",
      })
      return
    }

    if (!selectedCourse) {
      toast({
        title: "Error",
        description: "Please select a course to assign this problem to.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would make an API call to assign the problem to the course
    setAssignDialogOpen(false)

    toast({
      title: "Problem Assigned",
      description: `"${currentProblem.title}" has been assigned to ${selectedCourse} (${selectedSemester}th Semester).`,
    })

    // Reset selected course and semester
    setSelectedCourse("")
    setSelectedSemester("")
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Unassigned":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/20 dark:text-amber-400"
      case "Assigned":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div>
      <DashboardHeader title="Problem Management" />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">All Industry Problems</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search problems..."
                className="w-64 pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Filter Problems</DialogTitle>
                  <DialogDescription>Filter problems by difficulty, tags, or other criteria.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                      <SelectTrigger id="difficulty">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Difficulties</SelectItem>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Tags</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Database", "AI", "Web", "Mobile", "Security", "Cloud"].map((tag) => (
                        <div key={tag} className="flex items-center space-x-2">
                          <Checkbox id={`tag-${tag}`} />
                          <Label htmlFor={`tag-${tag}`}>{tag}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedDifficulty("all")}>
                    Reset Filters
                  </Button>
                  <Button>Apply Filters</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4" onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="all">All Problems</TabsTrigger>
            <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
            <TabsTrigger value="assigned">Assigned</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredProblems.length > 0 ? (
              filteredProblems.map((problem) => (
                <ProblemCard key={problem.id} problem={problem} onAssign={handleAssignProblem} />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">No problems match your search criteria.</div>
            )}
          </TabsContent>

          <TabsContent value="unassigned" className="space-y-4">
            {filteredProblems.length > 0 ? (
              filteredProblems.map((problem) => (
                <ProblemCard key={problem.id} problem={problem} onAssign={handleAssignProblem} />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No unassigned problems match your search criteria.
              </div>
            )}
          </TabsContent>

          <TabsContent value="assigned" className="space-y-4">
            {filteredProblems.length > 0 ? (
              filteredProblems.map((problem) => (
                <ProblemCard key={problem.id} problem={problem} onAssign={handleAssignProblem} />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No assigned problems match your search criteria.
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Assign Problem to Course</DialogTitle>
              <DialogDescription>Select a semester and course to assign this problem to.</DialogDescription>
            </DialogHeader>

            {currentProblem && (
              <div className="py-4">
                <h3 className="font-medium">{currentProblem.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Posted by {currentProblem.company} • {currentProblem.points} points
                </p>

                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="semester">Select Semester</Label>
                    <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                      <SelectTrigger id="semester">
                        <SelectValue placeholder="Select semester" />
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
                    <Label htmlFor="course">Select Course</Label>
                    <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                      <SelectTrigger id="course">
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses
                          .filter((course) => !selectedSemester || course.semester === selectedSemester)
                          .map((course) => (
                            <SelectItem key={course.id} value={`${course.code}: ${course.title}`}>
                              {course.code}: {course.title} ({course.semester}th Semester)
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify" />
                    <Label htmlFor="notify">Notify students about this assignment</Label>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={confirmAssignment}
                className="bg-emerald-600 hover:bg-emerald-700"
                disabled={!selectedSemester || !selectedCourse}
              >
                Assign to Course
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )

  function ProblemCard({ problem, onAssign }: { problem: any; onAssign: (problem: any) => void }) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>{problem.title}</CardTitle>
              <CardDescription className="mt-1">
                Posted by {problem.company} • Difficulty: {problem.difficulty}
              </CardDescription>
            </div>
            <Badge className={getStatusBadgeColor(problem.status)}>{problem.status}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{problem.description}</p>
          <div className="flex items-center gap-2 mb-4">
            {problem.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {problem.status === "Assigned" && problem.assignedTo && (
            <div className="mb-4">
              <div className="text-sm font-medium mb-1">Assigned to Courses:</div>
              <div className="flex flex-wrap gap-2">
                {problem.assignedTo.map((course: string) => (
                  <Badge key={course} variant="secondary" className="text-xs">
                    {course}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>Deadline: {problem.deadline}</div>
            <div>{problem.points} points</div>
          </div>
        </CardContent>
        <div className="px-6 pb-6 pt-0 flex justify-end">
          {problem.status === "Unassigned" ? (
            <Button size="sm" className="gap-2 bg-emerald-600 hover:bg-emerald-700" onClick={() => onAssign(problem)}>
              <PlusCircle className="h-4 w-4" />
              Assign to Course
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={() => router.push(`/problem/${problem.id}`)}>
              View Problem
            </Button>
          )}
        </div>
      </Card>
    )
  }
}
