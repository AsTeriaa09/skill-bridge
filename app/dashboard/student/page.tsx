"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { StatsCard } from "@/components/stats-card"
import { Leaderboard } from "@/components/leaderboard"
import { RewardsCard } from "@/components/rewards-card"
import { Award, BookOpen, CheckCircle, FileText, Clock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function StudentDashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")

  const [studentType, setStudentType] = useState<"university" | "individual">("university")
  const [activeTab, setActiveTab] = useState(tabParam || "overview")
  const [showSecureTask, setShowSecureTask] = useState(false)
  const [currentTask, setCurrentTask] = useState<any>(null)

  useEffect(() => {
    // Get student type from localStorage or default to university
    const savedType = localStorage.getItem("studentType") as "university" | "individual" | null
    if (savedType) {
      setStudentType(savedType)
    }
  }, [])

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value)

    // Update the URL with the new tab
    if (value === "overview") {
      router.push("/dashboard/student")
    } else {
      router.push(`/dashboard/student?tab=${value}`)
    }
  }

  // Sync with URL parameters
  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam)
    } else {
      setActiveTab("overview")
    }
  }, [tabParam])

  // Mock data for the student dashboard
  const stats =
    studentType === "university"
      ? [
          {
            title: "Problems Solved",
            value: "12/24",
            icon: CheckCircle,
            description: "50% completion rate",
          },
          {
            title: "Current Semester",
            value: "Spring 2023",
            icon: BookOpen,
            description: "3rd Year, 6th Semester",
          },
          {
            title: "Total Points",
            value: "1,250",
            icon: Award,
            trend: {
              value: "150 points this month",
              positive: true,
            },
          },
          {
            title: "Active Tasks",
            value: "8",
            icon: FileText,
            description: "3 due this week",
          },
        ]
      : [
          {
            title: "Tasks Completed",
            value: "18/45",
            icon: CheckCircle,
            description: "40% completion rate",
          },
          {
            title: "Experience Level",
            value: "Intermediate",
            icon: BookOpen,
            description: "2 years experience",
          },
          {
            title: "Total Points",
            value: "2,150",
            icon: Award,
            trend: {
              value: "250 points this month",
              positive: true,
            },
          },
          {
            title: "Available Tasks",
            value: "45",
            icon: FileText,
            description: "All tasks accessible",
          },
        ]

  const leaderboardEntries = [
    {
      id: 1,
      name: "Rahul Ahmed",
      avatar: "RA",
      points: 1250,
      rank: 1,
      department: "Computer Science",
      semester: "6th Semester",
      badges: ["Problem Solver", "Top Contributor"],
    },
    {
      id: 2,
      name: "Fatima Khan",
      avatar: "FK",
      points: 1180,
      rank: 2,
      department: "Electrical Engineering",
      semester: "6th Semester",
      badges: ["Code Master"],
    },
    {
      id: 3,
      name: "Mohammad Hassan",
      avatar: "MH",
      points: 1050,
      rank: 3,
      department: "Computer Science",
      semester: "6th Semester",
    },
    {
      id: 4,
      name: "Ayesha Rahman",
      avatar: "AR",
      points: 980,
      rank: 4,
      department: "Computer Science",
      semester: "4th Semester",
    },
    {
      id: 5,
      name: "Kamal Hossain",
      avatar: "KH",
      points: 920,
      rank: 5,
      department: "Mechanical Engineering",
      semester: "6th Semester",
    },
  ]

  const rewards = {
    points: studentType === "university" ? 1250 : 2150,
    nextMilestone: studentType === "university" ? 1500 : 2500,
    badges: [
      {
        name: "Problem Solver",
        description: "Solved 10+ problems",
        earned: true,
        icon: "trophy",
      },
      {
        name: "Top Contributor",
        description: "Top 3 in leaderboard",
        earned: studentType === "university",
        icon: "award",
      },
      {
        name: "Code Master",
        description: "Perfect score on 5 problems",
        earned: studentType === "individual",
        icon: "star",
      },
      {
        name: "Industry Ready",
        description: "Completed all semester problems",
        earned: false,
        icon: "gift",
      },
    ],
  }

  // Mock data for assigned courses
  const assignedCourses = [
    {
      id: 1,
      title: "Data Structures and Algorithms",
      code: "CS301",
      instructor: "Dr. Anwar Khan",
      progress: 65,
      tasks: [
        {
          id: 101,
          title: "Implement a Binary Search Tree",
          type: "online",
          status: "completed",
          dueDate: "May 15, 2023",
          points: 100,
          secureMode: true,
          timeLimit: 120,
          feedback: {
            rating: 4,
            comment: "Good implementation with proper time complexity analysis. Could improve code documentation.",
            evaluatedBy: "Dr. Anwar Khan",
            evaluatedOn: "May 16, 2023",
          },
        },
        {
          id: 102,
          title: "Graph Algorithms Implementation",
          type: "online",
          status: "in_progress",
          dueDate: "June 10, 2023",
          points: 150,
          secureMode: true,
          timeLimit: 180,
        },
        {
          id: 103,
          title: "Algorithm Complexity Analysis",
          type: "offline",
          status: "pending",
          dueDate: "June 20, 2023",
          points: 120,
        },
      ],
    },
    {
      id: 2,
      title: "Database Management Systems",
      code: "CS302",
      instructor: "Prof. Saima Jabeen",
      progress: 40,
      tasks: [
        {
          id: 201,
          title: "Design an E-commerce Database Schema",
          type: "online",
          status: "completed",
          dueDate: "May 5, 2023",
          points: 100,
          feedback: {
            rating: 5,
            comment: "Excellent schema design with proper normalization and indexing strategy.",
            evaluatedBy: "Prof. Saima Jabeen",
            evaluatedOn: "May 7, 2023",
          },
        },
        {
          id: 202,
          title: "SQL Query Optimization",
          type: "online",
          status: "pending",
          dueDate: "June 15, 2023",
          points: 120,
          secureMode: true,
          timeLimit: 90,
        },
      ],
    },
    {
      id: 3,
      title: "Software Engineering",
      code: "CS303",
      instructor: "Dr. Imran Ali",
      progress: 75,
      tasks: [
        {
          id: 301,
          title: "Agile Development Case Study",
          type: "offline",
          status: "completed",
          dueDate: "April 25, 2023",
          points: 80,
          feedback: {
            rating: 4,
            comment: "Good analysis of the case study with practical insights.",
            evaluatedBy: "Dr. Imran Ali",
            evaluatedOn: "April 28, 2023",
          },
        },
        {
          id: 302,
          title: "Software Requirements Specification",
          type: "online",
          status: "evaluated",
          dueDate: "May 20, 2023",
          points: 100,
          feedback: {
            rating: 3,
            comment: "Adequate coverage of functional requirements, but non-functional requirements need more detail.",
            evaluatedBy: "Dr. Imran Ali",
            evaluatedOn: "May 22, 2023",
          },
        },
        {
          id: 303,
          title: "Software Testing Plan",
          type: "online",
          status: "in_progress",
          dueDate: "June 25, 2023",
          points: 120,
        },
      ],
    },
  ]

  // Mock data for performance records
  const performanceRecords = [
    {
      id: 1,
      taskTitle: "Implement a Binary Search Tree",
      courseCode: "CS301",
      completionDate: "May 15, 2023",
      score: 85,
      maxScore: 100,
      feedback: "Good implementation with proper time complexity analysis. Could improve code documentation.",
      skills: ["Data Structures", "Algorithms", "Java Programming"],
    },
    {
      id: 2,
      taskTitle: "Design an E-commerce Database Schema",
      courseCode: "CS302",
      completionDate: "May 5, 2023",
      score: 95,
      maxScore: 100,
      feedback: "Excellent schema design with proper normalization and indexing strategy.",
      skills: ["Database Design", "SQL", "ERD Modeling"],
    },
    {
      id: 3,
      taskTitle: "Agile Development Case Study",
      courseCode: "CS303",
      completionDate: "April 25, 2023",
      score: 78,
      maxScore: 100,
      feedback: "Good analysis of the case study with practical insights.",
      skills: ["Agile Methodology", "Project Management", "Case Analysis"],
    },
    {
      id: 4,
      taskTitle: "Software Requirements Specification",
      courseCode: "CS303",
      completionDate: "May 20, 2023",
      score: 75,
      maxScore: 100,
      feedback: "Adequate coverage of functional requirements, but non-functional requirements need more detail.",
      skills: ["Requirements Engineering", "Documentation", "UML"],
    },
  ]

  // Mock data for certificates
  const certificates = [
    {
      id: 1,
      title: "Data Structures and Algorithms Proficiency",
      issueDate: "June 1, 2023",
      issuer: "SkillBridge University Program",
      skills: ["Data Structures", "Algorithms", "Problem Solving"],
      downloadUrl: "#",
    },
    {
      id: 2,
      title: "Database Management Systems",
      issueDate: "May 30, 2023",
      issuer: "SkillBridge University Program",
      skills: ["SQL", "Database Design", "Data Modeling"],
      downloadUrl: "#",
    },
  ]

  // Mock data for secure task
  const mockSecureTask = {
    taskId: 102,
    title: "Graph Algorithms Implementation",
    description:
      "Implement Dijkstra's algorithm and Breadth-First Search for the given graph problems. Your implementation should handle edge cases and be optimized for performance.",
    timeLimit: 180,
    questions: [
      {
        id: 1,
        type: "multiple_choice",
        question: "Which of the following is NOT a valid application of Dijkstra's algorithm?",
        options: [
          "Finding the shortest path in a weighted graph",
          "Finding the minimum spanning tree in a graph",
          "Network routing protocols",
          "GPS navigation systems",
        ],
      },
      {
        id: 2,
        type: "code",
        question:
          "Implement Dijkstra's algorithm in your preferred programming language. The function should take a graph representation and a source vertex as input and return the shortest distances to all vertices.",
      },
      {
        id: 3,
        type: "text",
        question: "Explain the time complexity of your implementation and how it could be optimized further.",
      },
      {
        id: 4,
        type: "code",
        question:
          "Implement a Breadth-First Search algorithm that finds the shortest path between two vertices in an unweighted graph.",
      },
    ],
  }

  const handleStartSecureTask = (taskId: number) => {
    setCurrentTask(mockSecureTask)
    setShowSecureTask(true)
  }

  const handleSubmitTask = (data: any) => {
    console.log("Task submitted:", data)
    setShowSecureTask(false)
    // In a real app, you would send this data to the server
  }

  // Render the AssignedCourses component
  const renderAssignedCourses = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">
          {studentType === "university" ? "Your Assigned Courses" : "Available Tasks"}
        </h2>

        {assignedCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-medium">{course.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {course.code} • {course.instructor}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium">{course.progress}% Complete</div>
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 via-orange-300 to-orange-400"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium">Tasks</h4>
              {course.tasks.map((task) => (
                <div key={task.id} className="border rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          task.status === "completed"
                            ? "bg-green-500"
                            : task.status === "in_progress"
                              ? "bg-orange-500"
                              : "bg-gray-400"
                        }`}
                      ></div>
                      <h5 className="font-medium">{task.title}</h5>
                      {task.secureMode && (
                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-0.5 rounded-full">
                          Secure Mode
                        </span>
                      )}
                      {task.type === "offline" && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">Field Task</span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">Due: {task.dueDate}</div>
                  </div>

                  {task.status === "completed" && task.feedback && (
                    <div className="mt-2 p-2 bg-muted rounded-md">
                      <div className="flex items-center gap-1 mb-1">
                        <div className="text-xs font-medium">Feedback:</div>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              className={`w-3 h-3 ${i < task.feedback.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{task.feedback.comment}</p>
                      <div className="text-xs text-muted-foreground mt-1">
                        Evaluated by {task.feedback.evaluatedBy} on {task.feedback.evaluatedOn}
                      </div>
                    </div>
                  )}

                  {task.status !== "completed" && (
                    <div className="mt-2 flex justify-end">
                      {task.status === "in_progress" && (
                        <Button
                          size="sm"
                          className="bg-orange-600 hover:bg-orange-700"
                          onClick={() => handleStartSecureTask(task.id)}
                        >
                          {task.secureMode ? (
                            <>
                              <Clock className="mr-1 h-3 w-3" />
                              Continue in Secure Mode
                            </>
                          ) : (
                            "Continue Task"
                          )}
                        </Button>
                      )}
                      {task.status === "pending" && (
                        <Button size="sm" variant="outline" onClick={() => handleStartSecureTask(task.id)}>
                          Start Task
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Render the Performance Records component
  const renderPerformanceRecords = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Performance Records</h2>
          <div className="text-sm font-medium text-orange-600">
            Overall Score: {studentType === "university" ? "85" : "88"}/100
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="text-lg font-medium mb-4">Completed Tasks</h3>
          <div className="space-y-4">
            {performanceRecords.map((record) => (
              <div key={record.id} className="border rounded-md p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{record.taskTitle}</h4>
                    <p className="text-sm text-muted-foreground">
                      {record.courseCode} • Completed on {record.completionDate}
                    </p>
                  </div>
                  <div className="text-sm font-medium">
                    Score:{" "}
                    <span className="text-orange-600">
                      {record.score}/{record.maxScore}
                    </span>
                  </div>
                </div>

                <div className="mt-2 p-2 bg-muted rounded-md">
                  <div className="text-xs font-medium mb-1">Feedback:</div>
                  <p className="text-xs text-muted-foreground">{record.feedback}</p>
                </div>

                <div className="mt-2 flex flex-wrap gap-1">
                  {record.skills.map((skill, index) => (
                    <span key={index} className="bg-orange-100 text-orange-800 text-xs px-2 py-0.5 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="text-lg font-medium mb-4">Certificates</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {certificates.map((cert) => (
              <div key={cert.id} className="border rounded-md p-4 bg-gradient-to-br from-orange-50 to-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{cert.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      Issued on {cert.issueDate} by {cert.issuer}
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="text-orange-600 border-orange-200">
                    Download
                  </Button>
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {cert.skills.map((skill, index) => (
                    <span key={index} className="bg-orange-100 text-orange-800 text-xs px-2 py-0.5 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <DashboardHeader title={`${studentType === "university" ? "University" : "Individual"} Student Dashboard`} />

      <div className="p-6 space-y-6">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-orange-600">
              Overview
            </TabsTrigger>
            <TabsTrigger value="courses" className="data-[state=active]:bg-white data-[state=active]:text-orange-600">
              {studentType === "university" ? "Courses & Tasks" : "Available Tasks"}
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="data-[state=active]:bg-white data-[state=active]:text-orange-600"
            >
              Performance & Certificates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
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

            <div className="grid gap-6 md:grid-cols-2">
              <Leaderboard
                entries={leaderboardEntries}
                title={studentType === "university" ? "Department Leaderboard" : "Global Leaderboard"}
                description={
                  studentType === "university"
                    ? "Top performers in your department"
                    : "Top performers across all students"
                }
              />
              <RewardsCard points={rewards.points} nextMilestone={rewards.nextMilestone} badges={rewards.badges} />
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6 mt-6">
            {renderAssignedCourses()}
          </TabsContent>

          <TabsContent value="performance" className="space-y-6 mt-6">
            {renderPerformanceRecords()}
          </TabsContent>
        </Tabs>
      </div>

      {showSecureTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b sticky top-0 bg-white z-10">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">{currentTask.title}</h2>
                  <p className="text-sm text-muted-foreground">Secure Mode Enabled • Time Remaining: 03:00:00</p>
                </div>
                <Button variant="outline" onClick={() => setShowSecureTask(false)}>
                  Exit Secure Mode
                </Button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Task Description</h3>
                <p className="text-muted-foreground">{currentTask.description}</p>
              </div>

              <div className="space-y-6">
                {currentTask.questions.map((question: any) => (
                  <div key={question.id} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Question {question.id}</h4>
                    <p className="mb-4">{question.question}</p>

                    {question.type === "multiple_choice" && (
                      <div className="space-y-2">
                        {question.options.map((option: string, index: number) => (
                          <div key={index} className="flex items-center">
                            <input
                              type="radio"
                              id={`q${question.id}_option${index}`}
                              name={`question_${question.id}`}
                              className="mr-2"
                            />
                            <label htmlFor={`q${question.id}_option${index}`}>{option}</label>
                          </div>
                        ))}
                      </div>
                    )}

                    {question.type === "code" && (
                      <div className="border rounded-md p-2 bg-gray-50">
                        <textarea
                          className="w-full h-32 p-2 font-mono text-sm bg-transparent resize-none focus:outline-none"
                          placeholder="Write your code here..."
                        ></textarea>
                      </div>
                    )}

                    {question.type === "text" && (
                      <textarea
                        className="w-full h-24 p-3 border rounded-md"
                        placeholder="Write your answer here..."
                      ></textarea>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <Button className="bg-orange-600 hover:bg-orange-700" onClick={() => handleSubmitTask({})}>
                  Submit Task
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
