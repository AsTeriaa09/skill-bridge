import { DashboardHeader } from "@/components/dashboard-header"
import { StatsCard } from "@/components/stats-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Building2, FileText, GraduationCap, PlusCircle, Settings, Users } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  // Mock data for the admin dashboard
  const stats = [
    {
      title: "Total Universities",
      value: "5",
      icon: Building2,
      description: "All active",
    },
    {
      title: "Total Students",
      value: "1,248",
      icon: GraduationCap,
      trend: {
        value: "15% increase",
        positive: true,
      },
    },
    {
      title: "Industry Partners",
      value: "12",
      icon: Users,
      trend: {
        value: "2 new this month",
        positive: true,
      },
    },
    {
      title: "Active Problems",
      value: "48",
      icon: FileText,
      description: "Across all semesters",
    },
  ]

  return (
    <div>
      <DashboardHeader title="Admin Dashboard" />
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
            <TabsTrigger value="universities">Universities</TabsTrigger>
            <TabsTrigger value="industries">Industries</TabsTrigger>
            <TabsTrigger value="problems">Problems</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Platform Overview</CardTitle>
                <CardDescription>Key metrics and performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="text-sm font-medium mb-2">User Engagement</div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Active Students</div>
                        <div className="font-medium">987</div>
                        <div className="text-xs text-orange-600">+12% this month</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Problem Completion</div>
                        <div className="font-medium">72%</div>
                        <div className="text-xs text-orange-600">+5% this month</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Avg. Submissions</div>
                        <div className="font-medium">3.2</div>
                        <div className="text-xs text-muted-foreground">per student</div>
                      </div>
                    </div>
                    <Progress value={72} className="h-2 bg-gray-200">
                      <div className="h-full bg-gradient-to-r from-orange-500 via-orange-300 to-orange-400 rounded-full" />
                    </Progress>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2">University Participation</div>
                    <div className="space-y-3">
                      {[
                        { name: "Dhaka University", students: 487, completion: 78 },
                        { name: "BUET", students: 325, completion: 82 },
                        { name: "North South University", students: 256, completion: 65 },
                        { name: "East West University", students: 180, completion: 70 },
                      ].map((uni, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={`/placeholder.svg?height=32&width=32&text=${uni.name.substring(0, 2)}`}
                              alt={uni.name}
                            />
                            <AvatarFallback>{uni.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <div className="font-medium truncate">{uni.name}</div>
                              <div className="text-sm text-muted-foreground">{uni.completion}%</div>
                            </div>
                            <Progress value={uni.completion} className="h-1.5 bg-gray-200">
                              <div className="h-full bg-gradient-to-r from-orange-500 via-orange-300 to-orange-400 rounded-full" />
                            </Progress>
                          </div>
                          <div className="text-sm text-muted-foreground">{uni.students} students</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Problem Distribution</CardTitle>
                  <CardDescription>Problems by semester and difficulty</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { semester: "Spring 2023", beginner: 8, intermediate: 12, advanced: 6 },
                      { semester: "Fall 2022", beginner: 10, intermediate: 15, advanced: 8 },
                      { semester: "Spring 2022", beginner: 7, intermediate: 10, advanced: 5 },
                    ].map((sem, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="font-medium mb-2">{sem.semester}</div>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <div className="text-xs text-muted-foreground">Beginner</div>
                            <div className="font-medium">{sem.beginner}</div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">Intermediate</div>
                            <div className="font-medium">{sem.intermediate}</div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">Advanced</div>
                            <div className="font-medium">{sem.advanced}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest platform activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        action: "New problem posted",
                        details: "TechCorp Inc. posted 'E-commerce Recommendation Algorithm'",
                        time: "2 hours ago",
                      },
                      {
                        action: "University joined",
                        details: "East West University joined the platform",
                        time: "1 day ago",
                      },
                      {
                        action: "Industry partner joined",
                        details: "DataViz Corp joined as an industry partner",
                        time: "2 days ago",
                      },
                      {
                        action: "Semester started",
                        details: "Spring 2023 semester has been activated",
                        time: "1 week ago",
                      },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                        <div className="w-2 h-2 mt-2 rounded-full bg-orange-500" />
                        <div>
                          <div className="font-medium">{activity.action}</div>
                          <div className="text-sm text-muted-foreground">{activity.details}</div>
                          <div className="text-xs text-muted-foreground mt-1">{activity.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="universities" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Manage Universities</h2>
              <Button className="bg-orange-600 hover:bg-orange-700 gap-2">
                <PlusCircle className="h-4 w-4" />
                Add University
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>University List</CardTitle>
                <CardDescription>All universities registered on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Dhaka University", departments: 5, students: 487, joined: "Jan 2022", status: "Active" },
                    { name: "BUET", departments: 4, students: 325, joined: "Feb 2022", status: "Active" },
                    {
                      name: "North South University",
                      departments: 3,
                      students: 256,
                      joined: "Mar 2022",
                      status: "Active",
                    },
                    {
                      name: "East West University",
                      departments: 3,
                      students: 180,
                      joined: "Apr 2023",
                      status: "Active",
                    },
                    {
                      name: "Jahangirnagar University",
                      departments: 2,
                      students: 0,
                      joined: "May 2023",
                      status: "Pending",
                    },
                  ].map((uni, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={`/placeholder.svg?height=40&width=40&text=${uni.name.substring(0, 2)}`}
                          alt={uni.name}
                        />
                        <AvatarFallback>{uni.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{uni.name}</div>
                        <div className="text-sm text-muted-foreground">Joined: {uni.joined}</div>
                      </div>
                      <div className="text-center px-4">
                        <div className="text-sm font-medium">{uni.departments}</div>
                        <div className="text-xs text-muted-foreground">Departments</div>
                      </div>
                      <div className="text-center px-4">
                        <div className="text-sm font-medium">{uni.students}</div>
                        <div className="text-xs text-muted-foreground">Students</div>
                      </div>
                      <Badge
                        className={
                          uni.status === "Active"
                            ? "bg-orange-100 text-orange-800 dark:bg-orange-950/20 dark:text-orange-400"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-950/20 dark:text-amber-400"
                        }
                      >
                        {uni.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="industries" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Manage Industry Partners</h2>
              <Link href="/dashboard/admin/registration-requests">
                <Button className="bg-orange-600 hover:bg-orange-700 gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Add Industry Partner
                </Button>
              </Link>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Industry Partner List</CardTitle>
                <CardDescription>All industry partners registered on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "TechCorp Inc.",
                      sector: "Software Development",
                      problems: 8,
                      joined: "Jan 2022",
                      status: "Active",
                    },
                    {
                      name: "DataViz Corp",
                      sector: "Data Analytics",
                      problems: 5,
                      joined: "Mar 2022",
                      status: "Active",
                    },
                    {
                      name: "GreenLogistics Ltd.",
                      sector: "Supply Chain",
                      problems: 3,
                      joined: "Apr 2022",
                      status: "Active",
                    },
                    {
                      name: "AppWorks Solutions",
                      sector: "Mobile Development",
                      problems: 6,
                      joined: "Jun 2022",
                      status: "Active",
                    },
                    {
                      name: "EnergyTech",
                      sector: "Renewable Energy",
                      problems: 0,
                      joined: "May 2023",
                      status: "Pending",
                    },
                  ].map((partner, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={`/placeholder.svg?height=40&width=40&text=${partner.name.substring(0, 2)}`}
                          alt={partner.name}
                        />
                        <AvatarFallback>{partner.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{partner.name}</div>
                        <div className="text-sm text-muted-foreground">{partner.sector}</div>
                      </div>
                      <div className="text-center px-4">
                        <div className="text-sm font-medium">{partner.problems}</div>
                        <div className="text-xs text-muted-foreground">Problems</div>
                      </div>
                      <div className="text-center px-4">
                        <div className="text-sm font-medium">{partner.joined}</div>
                        <div className="text-xs text-muted-foreground">Joined</div>
                      </div>
                      <Badge
                        className={
                          partner.status === "Active"
                            ? "bg-orange-100 text-orange-800 dark:bg-orange-950/20 dark:text-orange-400"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-950/20 dark:text-amber-400"
                        }
                      >
                        {partner.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="problems" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Problem Management</CardTitle>
                <CardDescription>Manage all problems across semesters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "E-commerce Recommendation Algorithm",
                      company: "TechCorp Inc.",
                      semester: "Spring 2023",
                      difficulty: "Intermediate",
                      students: 15,
                      submissions: 7,
                      status: "Active",
                    },
                    {
                      title: "Sustainable Supply Chain Optimization",
                      company: "GreenLogistics Ltd.",
                      semester: "Spring 2023",
                      difficulty: "Advanced",
                      students: 8,
                      submissions: 3,
                      status: "Active",
                    },
                    {
                      title: "Mobile App UI/UX Redesign",
                      company: "AppWorks Solutions",
                      semester: "Spring 2023",
                      difficulty: "Intermediate",
                      students: 12,
                      submissions: 5,
                      status: "Active",
                    },
                    {
                      title: "Data Visualization Dashboard",
                      company: "DataViz Corp",
                      semester: "Fall 2022",
                      difficulty: "Advanced",
                      students: 18,
                      submissions: 18,
                      status: "Completed",
                    },
                  ].map((problem, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">{problem.title}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Posted by {problem.company} • Difficulty: {problem.difficulty}
                          </div>
                        </div>
                        <Badge
                          className={
                            problem.status === "Active"
                              ? "bg-orange-100 text-orange-800 dark:bg-orange-950/20 dark:text-orange-400"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                          }
                        >
                          {problem.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Semester</div>
                          <div className="text-sm font-medium">{problem.semester}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Students</div>
                          <div className="text-sm font-medium">{problem.students}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Submissions</div>
                          <div className="text-sm font-medium">{problem.submissions}</div>
                        </div>
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
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
