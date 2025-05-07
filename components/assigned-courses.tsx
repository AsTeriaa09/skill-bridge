import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, AlertTriangle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface Task {
  id: number
  title: string
  type: "online" | "offline"
  status: "pending" | "in_progress" | "completed" | "evaluated"
  dueDate: string
  points: number
  secureMode?: boolean
  timeLimit?: number
  feedback?: {
    rating: number
    comment: string
    evaluatedBy: string
    evaluatedOn: string
  }
}

interface Course {
  id: number
  title: string
  code: string
  instructor: string
  progress: number
  tasks: Task[]
}

interface AssignedCoursesProps {
  courses: Course[]
  studentType: "university" | "individual"
}

export function AssignedCourses({ courses, studentType }: AssignedCoursesProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100"
      case "in_progress":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100"
      case "completed":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "evaluated":
        return "bg-orange-100 text-orange-700 hover:bg-orange-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending"
      case "in_progress":
        return "In Progress"
      case "completed":
        return "Completed"
      case "evaluated":
        return "Evaluated"
      default:
        return status
    }
  }

  return (
    <Card>
      <CardHeader className="bg-gradient-to-br from-orange-500 via-orange-300 to-orange-400 text-white">
        <CardTitle>{studentType === "university" ? "Assigned Courses" : "Available Courses"}</CardTitle>
        <CardDescription className="text-white/90">
          {studentType === "university"
            ? "Courses assigned to you by your university"
            : "All available courses you can access"}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue={courses[0]?.id.toString()} className="w-full">
          <TabsList className="w-full justify-start px-6 pt-2 bg-gray-50 border-b overflow-auto">
            {courses.map((course) => (
              <TabsTrigger key={course.id} value={course.id.toString()} className="data-[state=active]:text-orange-600">
                {course.code}
              </TabsTrigger>
            ))}
          </TabsList>

          {courses.map((course) => (
            <TabsContent key={course.id} value={course.id.toString()} className="p-0">
              <div className="p-6 border-b">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                  </div>
                  <Badge variant="outline" className="border-orange-200 bg-orange-50">
                    {course.code}
                  </Badge>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Course Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress
                    value={course.progress}
                    className="h-2"
                    indicatorClassName="bg-gradient-to-r from-orange-600 to-orange-500"
                  />
                </div>
              </div>

              <div className="p-6">
                <h4 className="text-sm font-medium mb-4">Course Tasks</h4>
                <div className="space-y-4">
                  {course.tasks.map((task) => (
                    <div key={task.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {task.title}
                            {task.type === "online" ? (
                              <Badge variant="outline" className="bg-blue-50 border-blue-200">
                                Online
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-purple-50 border-purple-200">
                                Offline
                              </Badge>
                            )}
                            {task.secureMode && (
                              <Badge variant="outline" className="bg-red-50 border-red-200 flex items-center gap-1">
                                <AlertTriangle className="h-3 w-3" />
                                Secure Mode
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                            <Clock className="h-3.5 w-3.5" />
                            {task.timeLimit ? `Time Limit: ${task.timeLimit} minutes` : "No time limit"}
                            <span className="mx-1">•</span>
                            Due: {task.dueDate}
                          </div>
                        </div>
                        <Badge className={getStatusColor(task.status)}>{getStatusLabel(task.status)}</Badge>
                      </div>

                      {task.status === "evaluated" && task.feedback && (
                        <div className="mt-3 bg-gray-50 p-3 rounded-md">
                          <div className="text-sm font-medium">Feedback</div>
                          <div className="flex items-center mt-1">
                            <div className="flex">
                              {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`h-4 w-4 ${i < task.feedback!.rating ? "text-orange-500" : "text-gray-300"}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                            </div>
                            <span className="text-xs text-muted-foreground ml-2">
                              Evaluated by {task.feedback.evaluatedBy} on {task.feedback.evaluatedOn}
                            </span>
                          </div>
                          <p className="text-sm mt-2">{task.feedback.comment}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-4">
                        <div className="text-sm font-medium text-orange-600">{task.points} points</div>
                        <div className="flex gap-2">
                          {task.status === "pending" || task.status === "in_progress" ? (
                            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                              {task.status === "pending" ? "Start Task" : "Continue Task"}
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" className="border-orange-200 text-orange-700">
                              View Submission
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
