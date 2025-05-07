import { DashboardHeader } from "@/components/dashboard-header"
import { StatsCard } from "@/components/stats-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { BarChart3, BookOpen, CheckCircle, FileText, Users } from "lucide-react"
import Link from "next/link"

export default function UniversityDashboard() {
  // Mock data for the university dashboard
  const stats = [
    {
      title: "Total Students",
      value: "487",
      icon: Users,
      trend: {
        value: "12% increase",
        positive: true,
      },
    },
    {
      title: "Active Problems",
      value: "24",
      icon: FileText,
      description: "8 new this week",
    },
    {
      title: "Departments",
      value: "5",
      icon: BookOpen,
      description: "All participating",
    },
    {
      title: "Completion Rate",
      value: "68%",
      icon: CheckCircle,
      trend: {
        value: "5% increase",
        positive: true,
      },
    },
  ]

  return (
    <div>
      <DashboardHeader title="University Dashboard" />
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

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="semesters">Semesters</TabsTrigger>
            <TabsTrigger value="problems">Problems</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>Student participation and completion rates by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium">Computer Science</div>
                      <div className="text-sm text-muted-foreground">92%</div>
                    </div>
                    <Progress value={92} className="h-2 bg-gray-200">
                      <div className="h-full bg-gradient-to-r from-orange-500 via-orange-300 to-orange-400 rounded-full" />
                    </Progress>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium">Electrical Engineering</div>
                      <div className="text-sm text-muted-foreground">78%</div>
                    </div>
                    <Progress value={78} className="h-2 bg-gray-200">
                      <div className="h-full bg-gradient-to-r from-orange-500 via-orange-300 to-orange-400 rounded-full" />
                    </Progress>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium">Business Administration</div>
                      <div className="text-sm text-muted-foreground">64%</div>
                    </div>
                    <Progress value={64} className="h-2 bg-gray-200">
                      <div className="h-full bg-gradient-to-r from-orange-500 via-orange-300 to-orange-400 rounded-full" />
                    </Progress>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium">Mechanical Engineering</div>
                      <div className="text-sm text-muted-foreground">56%</div>
                    </div>
                    <Progress value={56} className="h-2 bg-gray-200">
                      <div className="h-full bg-gradient-to-r from-orange-500 via-orange-300 to-orange-400 rounded-full" />
                    </Progress>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium">Civil Engineering</div>
                      <div className="text-sm text-muted-foreground">48%</div>
                    </div>
                    <Progress value={48} className="h-2 bg-gray-200">
                      <div className="h-full bg-gradient-to-r from-orange-500 via-orange-300 to-orange-400 rounded-full" />
                    </Progress>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest student submissions and industry feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=40&width=40&text=S${i}`} alt="Student" />
                        <AvatarFallback>S{i}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">Rahul Ahmed</div>
                          <div className="text-xs text-muted-foreground">2 hours ago</div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Submitted a solution for "E-commerce Recommendation Algorithm"
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            Computer Science
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-xs bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400"
                          >
                            Pending Review
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departments" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Department Overview</CardTitle>
                  <CardDescription>Performance metrics by department</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    "Computer Science",
                    "Electrical Engineering",
                    "Business Administration",
                    "Mechanical Engineering",
                    "Civil Engineering",
                  ].map((dept, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{dept}</div>
                        <Badge variant="outline">
                          {index === 0
                            ? "Excellent"
                            : index === 1
                              ? "Very Good"
                              : index === 2
                                ? "Good"
                                : "Satisfactory"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Students</div>
                          <div className="font-medium">{120 - index * 15}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Problems Solved</div>
                          <div className="font-medium">{85 - index * 10}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Avg. Score</div>
                          <div className="font-medium">{90 - index * 5}%</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-1">Overall Performance</div>
                        <Progress value={92 - index * 11} className="h-2 bg-gray-200">
                          <div className="h-full bg-gradient-to-r from-orange-500 via-orange-300 to-orange-400 rounded-full" />
                        </Progress>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="semesters" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Semester Performance</CardTitle>
                <CardDescription>Problem completion rates by semester</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {["Spring 2023 (Current)", "Fall 2022", "Spring 2022", "Fall 2021"].map((semester, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{semester}</div>
                        <div className="text-sm text-muted-foreground">{index === 0 ? "In Progress" : "Completed"}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Problems</div>
                          <div className="font-medium">{24 - index * 3}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Completion Rate</div>
                          <div className="font-medium">{index === 0 ? "68" : 95 - index * 5}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Avg. Score</div>
                          <div className="font-medium">{index === 0 ? "76" : 85 - index * 3}%</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-1">Overall Performance</div>
                        <Progress value={index === 0 ? 68 : 95 - index * 5} className="h-2 bg-gray-200">
                          <div className="h-full bg-gradient-to-r from-orange-500 via-orange-300 to-orange-400 rounded-full" />
                        </Progress>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="problems" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Active Industry Problems</CardTitle>
                  <CardDescription>Current challenges posted by industry partners</CardDescription>
                </div>
                <Link href="/dashboard/university/problems">
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                    Browse All Problems
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "E-commerce Recommendation Algorithm",
                      company: "TechCorp Inc.",
                      department: "Computer Science",
                      semester: "6th Semester",
                      students: 15,
                    },
                    {
                      title: "Sustainable Supply Chain Optimization",
                      company: "GreenLogistics Ltd.",
                      department: "Business Administration",
                      semester: "6th Semester",
                      students: 8,
                    },
                    {
                      title: "Mobile App UI/UX Redesign",
                      company: "AppWorks Solutions",
                      department: "Computer Science",
                      semester: "4th Semester",
                      students: 12,
                    },
                    {
                      title: "Smart Energy Management System",
                      company: "EnergyTech",
                      department: "Electrical Engineering",
                      semester: "6th Semester",
                      students: 10,
                    },
                  ].map((problem, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">{problem.title}</div>
                          <div className="text-sm text-muted-foreground mt-1">Posted by {problem.company}</div>
                        </div>
                        <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-950/20 dark:text-orange-400">
                          Active
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="outline" className="text-xs">
                          {problem.department}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {problem.semester}
                        </Badge>
                        <div className="text-xs text-muted-foreground ml-auto">
                          {problem.students} students working on this
                        </div>
                      </div>
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
