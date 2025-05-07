"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Edit, Filter, PlusCircle, Trash } from "lucide-react"

export default function ProblemManagementPage() {
  const [selectedTab, setSelectedTab] = useState("all")

  // Mock data for problems
  const problems = [
    {
      id: 1,
      title: "E-commerce Recommendation Algorithm",
      difficulty: "Intermediate",
      tags: ["Computer Science", "Data Science", "Machine Learning"],
      deadline: "June 15, 2023",
      status: "Pending Assignment",
      points: 150,
      description:
        "Design and implement a recommendation algorithm for an e-commerce platform that suggests products based on user browsing history and purchase patterns.",
      universities: [],
      submissions: 0,
    },
    {
      id: 2,
      title: "Mobile App UI/UX Redesign",
      difficulty: "Intermediate",
      tags: ["Design", "Mobile Development", "UI/UX"],
      deadline: "June 10, 2023",
      status: "Assigned",
      points: 120,
      description:
        "Redesign the user interface and experience for a mobile banking application to improve usability and accessibility.",
      universities: ["Dhaka University"],
      submissions: 5,
    },
    {
      id: 3,
      title: "Sustainable Supply Chain Optimization",
      difficulty: "Advanced",
      tags: ["Business", "Logistics", "Optimization"],
      deadline: "July 20, 2023",
      status: "Pending Assignment",
      points: 200,
      description:
        "Develop a model to optimize supply chain operations while minimizing carbon footprint and environmental impact.",
      universities: [],
      submissions: 0,
    },
    {
      id: 4,
      title: "Data Visualization Dashboard",
      difficulty: "Advanced",
      tags: ["Data Visualization", "Web Development", "JavaScript"],
      deadline: "May 20, 2023",
      status: "Assigned",
      points: 200,
      description:
        "Create an interactive data visualization dashboard for financial analytics using modern web technologies.",
      universities: ["Dhaka University", "BUET"],
      submissions: 12,
    },
    {
      id: 5,
      title: "Inventory Management System",
      difficulty: "Intermediate",
      tags: ["Database", "Backend", "System Design"],
      deadline: "June 30, 2023",
      status: "Assigned",
      points: 150,
      description: "Develop an inventory management system with real-time tracking and reporting capabilities.",
      universities: ["North South University"],
      submissions: 8,
    },
  ]

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Pending Assignment":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/20 dark:text-amber-400"
      case "Assigned":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400"
      case "Completed":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-950/20 dark:text-blue-400"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // Filter problems based on selected tab
  const filteredProblems =
    selectedTab === "all"
      ? problems
      : problems.filter((problem) =>
          selectedTab === "pending" ? problem.status === "Pending Assignment" : problem.status === "Assigned",
        )

  return (
    <div>
      <DashboardHeader title="Problem Management" />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Manage Your Problems</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-orange-600 hover:bg-orange-700 gap-2">
                <PlusCircle className="h-4 w-4" />
                Create New Problem
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Problem</DialogTitle>
                <DialogDescription>
                  Create a new problem for universities to assign to their students.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Problem Title</Label>
                  <Input id="title" placeholder="Enter a descriptive title" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Problem Description</Label>
                  <Textarea id="description" placeholder="Describe the problem in detail" rows={5} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select>
                      <SelectTrigger id="difficulty">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="points">Points</Label>
                    <Input id="points" type="number" placeholder="100" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="deadline">Deadline</Label>
                    <Input id="deadline" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input id="tags" placeholder="e.g. Web, Database, AI" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea id="requirements" placeholder="List the requirements and deliverables" rows={3} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button className="bg-orange-600 hover:bg-orange-700">Create Problem</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" className="space-y-4" onValueChange={setSelectedTab}>
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">All Problems</TabsTrigger>
              <TabsTrigger value="pending">Pending Assignment</TabsTrigger>
              <TabsTrigger value="assigned">Assigned</TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <TabsContent value="all" className="space-y-4">
            {filteredProblems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {filteredProblems.length > 0 ? (
              filteredProblems.map((problem) => <ProblemCard key={problem.id} problem={problem} />)
            ) : (
              <div className="text-center py-8 text-muted-foreground">No problems pending assignment.</div>
            )}
          </TabsContent>

          <TabsContent value="assigned" className="space-y-4">
            {filteredProblems.length > 0 ? (
              filteredProblems.map((problem) => <ProblemCard key={problem.id} problem={problem} />)
            ) : (
              <div className="text-center py-8 text-muted-foreground">No problems have been assigned yet.</div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )

  function ProblemCard({ problem }: { problem: any }) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>{problem.title}</CardTitle>
              <CardDescription className="mt-1">
                Difficulty: {problem.difficulty} • {problem.points} points
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

          {problem.universities.length > 0 && (
            <div className="mb-4">
              <div className="text-sm font-medium mb-1">Assigned to Universities:</div>
              <div className="flex flex-wrap gap-2">
                {problem.universities.map((university: string) => (
                  <Badge key={university} variant="secondary" className="text-xs">
                    {university}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>Deadline: {problem.deadline}</div>
            {problem.status === "Assigned" && <div>{problem.submissions} submissions received</div>}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t pt-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" size="sm" className="gap-1 text-red-600 hover:text-red-600 hover:bg-red-50">
              <Trash className="h-4 w-4" />
              Delete
            </Button>
          </div>

          {problem.status === "Pending Assignment" ? (
            <Button size="sm" className="gap-1">
              <CheckCircle className="h-4 w-4" />
              Track Status
            </Button>
          ) : (
            <Button size="sm">View Submissions</Button>
          )}
        </CardFooter>
      </Card>
    )
  }
}
