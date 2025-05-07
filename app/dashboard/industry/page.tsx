import { DashboardHeader } from "@/components/dashboard-header"
import { StatsCard } from "@/components/stats-card"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart3, CheckCircle, FileText, PlusCircle, Star, Users } from "lucide-react"
import Link from "next/link"

export default function IndustryDashboard() {
  // Mock data for the industry dashboard
  const stats = [
    {
      title: "Active Problems",
      value: "8",
      icon: FileText,
      description: "2 new this month",
    },
    {
      title: "Total Submissions",
      value: "124",
      icon: CheckCircle,
      trend: {
        value: "15% increase",
        positive: true,
      },
    },
    {
      title: "Talent Identified",
      value: "12",
      icon: Users,
      description: "Students with excellent ratings",
    },
    {
      title: "Universities",
      value: "5",
      icon: BarChart3,
      description: "Partnered institutions",
    },
  ]

  return (
    <div>
      <DashboardHeader title="Industry Dashboard" />
      <div className="p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              icon={stat.icon}
              trend={stat.trend}
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Manage Your Problems</h2>
          <Link href="/dashboard/industry/task-creation">
            <Button className="bg-orange-600 hover:bg-orange-700 gap-2">
              <PlusCircle className="h-4 w-4" />
              Post New Problem
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="problems" className="space-y-4">
          <TabsList>
            <TabsTrigger value="problems">Active Problems</TabsTrigger>
            <TabsTrigger value="submissions">Recent Submissions</TabsTrigger>
            <TabsTrigger value="talent">Talent Pool</TabsTrigger>
            <TabsTrigger value="semesters">Semester Planning</TabsTrigger>
          </TabsList>

          <TabsContent value="problems" className="space-y-4">
            {[
              {
                title: "E-commerce Recommendation Algorithm",
                difficulty: "Intermediate",
                status: "Active",
                students: 15,
                submissions: 7,
                semester: "Spring 2023",
                tags: ["Computer Science", "Data Science", "Machine Learning"],
              },
              {
                title: "Sustainable Supply Chain Optimization",
                difficulty: "Advanced",
                status: "Active",
                students: 8,
                submissions: 3,
                semester: "Spring 2023",
                tags: ["Business", "Logistics", "Optimization"],
              },
              {
                title: "Mobile App UI/UX Redesign",
                difficulty: "Intermediate",
                status: "Active",
                students: 12,
                submissions: 5,
                semester: "Spring 2023",
                tags: ["Design", "Mobile Development", "UI/UX"],
              },
            ].map((problem, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{problem.title}</CardTitle>
                      <CardDescription className="mt-1">
                        Posted 2 weeks ago • Difficulty: {problem.difficulty}
                      </CardDescription>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-950/20 dark:text-orange-400">
                      {problem.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mt-4">
                    {problem.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm">
                      <span className="font-medium">{problem.students}</span> students working on this
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">{problem.submissions}</span> submissions received
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Semester:</span> {problem.semester}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t pt-4">
                  <Link href="/dashboard/industry/problem-management">
                    <Button variant="outline">Edit Problem</Button>
                  </Link>
                  <Link href="/dashboard/industry/task-evaluation">
                    <Button className="bg-orange-600 hover:bg-orange-700">View Submissions</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="submissions" className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>Mobile App UI/UX Redesign</CardTitle>
                      <CardDescription className="mt-1">
                        Submitted by Rahul Ahmed • Computer Science, Year 3
                      </CardDescription>
                    </div>
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/20 dark:text-amber-400">
                      Pending Review
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Redesign of the mobile banking application with improved usability and accessibility features.
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <Badge variant="outline" className="text-xs">
                      Design
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Mobile Development
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      UI/UX
                    </Badge>
                  </div>
                  <div className="mt-4 p-3 bg-muted/50 rounded-md">
                    <div className="text-sm font-medium mb-1">Student Note</div>
                    <p className="text-xs text-muted-foreground">
                      "I focused on improving the navigation flow and accessibility features. The redesign includes high
                      contrast mode and voice navigation support."
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">Submitted 2 days ago</div>
                  <div className="flex gap-2">
                    <Button variant="outline">Download Files</Button>
                    <Link href="/dashboard/industry/task-evaluation">
                      <Button className="bg-orange-600 hover:bg-orange-700">Review Submission</Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="talent" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Students</CardTitle>
                <CardDescription>Students who have consistently delivered high-quality solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=40&width=40&text=S${i}`} alt="Student" />
                        <AvatarFallback>S{i}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">Rahul Ahmed</div>
                        <div className="text-sm text-muted-foreground">Computer Science, Year 3</div>
                        <div className="flex items-center mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          <span className="ml-2 text-xs text-muted-foreground">5.0 (8 submissions)</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-muted-foreground">Skills</div>
                        <div className="flex flex-wrap gap-1 mt-1 justify-center">
                          <Badge variant="outline" className="text-xs">
                            Python
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            ML
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            React
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        Contact
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="semesters" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Semester Problem Planning</CardTitle>
                <CardDescription>Plan and organize problems by semester</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { name: "Spring 2023 (Current)", status: "Active", problems: 8, remaining: 2 },
                    { name: "Fall 2023 (Upcoming)", status: "Planning", problems: 3, remaining: 7 },
                    { name: "Fall 2022", status: "Completed", problems: 10, remaining: 0 },
                    { name: "Spring 2022", status: "Completed", problems: 12, remaining: 0 },
                  ].map((semester, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{semester.name}</div>
                        <Badge
                          className={
                            semester.status === "Active"
                              ? "bg-orange-100 text-orange-800 dark:bg-orange-950/20 dark:text-orange-400"
                              : semester.status === "Planning"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-950/20 dark:text-blue-400"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                          }
                        >
                          {semester.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Problems Posted</div>
                          <div className="font-medium">{semester.problems}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Slots Remaining</div>
                          <div className="font-medium">{semester.remaining}</div>
                        </div>
                      </div>
                      {(semester.status === "Active" || semester.status === "Planning") && (
                        <Button
                          size="sm"
                          variant={semester.status === "Active" ? "default" : "outline"}
                          className={semester.status === "Active" ? "bg-orange-600 hover:bg-orange-700" : ""}
                        >
                          {semester.status === "Active" ? "Add Problem" : "Plan Problems"}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
