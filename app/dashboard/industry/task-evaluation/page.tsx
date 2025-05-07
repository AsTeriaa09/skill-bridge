"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Download, FileText, Search, Star } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function TaskEvaluationPage() {
  const [activeTab, setActiveTab] = useState("pending")
  const [searchQuery, setSearchQuery] = useState("")
  const [evaluationDialogOpen, setEvaluationDialogOpen] = useState(false)
  const [currentSubmission, setCurrentSubmission] = useState<any>(null)
  const [evaluationData, setEvaluationData] = useState({
    points: "",
    rating: "3",
    feedback: "",
  })

  // Mock data for task submissions
  const [submissions, setSubmissions] = useState({
    pending: [
      {
        id: 1,
        taskId: 1,
        taskTitle: "E-commerce Recommendation Algorithm",
        student: {
          id: 101,
          name: "Rahul Ahmed",
          avatar: "RA",
          university: "Dhaka University",
          department: "Computer Science",
          semester: "6th Semester",
        },
        submittedAt: "2023-05-20T14:30:00Z",
        files: [
          { name: "recommendation_algorithm.py", size: "45 KB", type: "python" },
          { name: "dataset_preprocessing.py", size: "32 KB", type: "python" },
          { name: "evaluation_metrics.py", size: "28 KB", type: "python" },
          { name: "project_report.pdf", size: "1.2 MB", type: "pdf" },
          { name: "presentation.pptx", size: "3.5 MB", type: "powerpoint" },
        ],
        notes:
          "I've implemented both collaborative filtering and content-based filtering approaches. The hybrid model shows the best performance with an F1-score of 0.82.",
        status: "pending",
      },
      {
        id: 2,
        taskId: 2,
        taskTitle: "Mobile App UI/UX Redesign",
        student: {
          id: 102,
          name: "Fatima Khan",
          avatar: "FK",
          university: "North South University",
          department: "Computer Science",
          semester: "6th Semester",
        },
        submittedAt: "2023-05-21T10:15:00Z",
        files: [
          { name: "usability_analysis.pdf", size: "850 KB", type: "pdf" },
          { name: "wireframes.fig", size: "4.2 MB", type: "figma" },
          { name: "prototype.fig", size: "6.8 MB", type: "figma" },
          { name: "user_testing_results.pdf", size: "1.5 MB", type: "pdf" },
        ],
        notes:
          "I focused on improving the navigation flow and accessibility features. The redesign includes high contrast mode and voice navigation support.",
        status: "pending",
      },
      {
        id: 3,
        taskId: 3,
        taskTitle: "Sustainable Supply Chain Optimization",
        student: {
          id: 103,
          name: "Mohammad Hassan",
          avatar: "MH",
          university: "BUET",
          department: "Industrial Engineering",
          semester: "7th Semester",
        },
        submittedAt: "2023-05-22T09:45:00Z",
        files: [
          { name: "supply_chain_analysis.pdf", size: "1.1 MB", type: "pdf" },
          { name: "optimization_model.xlsx", size: "780 KB", type: "excel" },
          { name: "implementation_code.py", size: "65 KB", type: "python" },
          { name: "validation_results.pdf", size: "950 KB", type: "pdf" },
          { name: "recommendations.pdf", size: "1.3 MB", type: "pdf" },
        ],
        notes:
          "The model reduces carbon emissions by 23% while maintaining operational efficiency. I've included sensitivity analysis for different scenarios.",
        status: "pending",
      },
    ],
    evaluated: [
      {
        id: 4,
        taskId: 1,
        taskTitle: "E-commerce Recommendation Algorithm",
        student: {
          id: 104,
          name: "Ayesha Rahman",
          avatar: "AR",
          university: "Dhaka University",
          department: "Computer Science",
          semester: "6th Semester",
        },
        submittedAt: "2023-05-18T11:20:00Z",
        files: [
          { name: "recommendation_system.py", size: "52 KB", type: "python" },
          { name: "data_processing.py", size: "38 KB", type: "python" },
          { name: "evaluation.py", size: "30 KB", type: "python" },
          { name: "report.pdf", size: "1.4 MB", type: "pdf" },
          { name: "slides.pptx", size: "2.8 MB", type: "powerpoint" },
        ],
        notes:
          "I implemented a hybrid recommendation system combining collaborative filtering and content-based approaches. The system achieves an F1-score of 0.85 on the test dataset.",
        status: "evaluated",
        evaluation: {
          points: 140,
          rating: 5,
          feedback:
            "Excellent work! Your implementation is well-structured and thoroughly documented. The hybrid approach shows impressive results, and your analysis of the performance metrics is comprehensive. The presentation is clear and professional.",
          evaluatedAt: "2023-05-19T15:45:00Z",
        },
      },
      {
        id: 5,
        taskId: 2,
        taskTitle: "Mobile App UI/UX Redesign",
        student: {
          id: 105,
          name: "Kamal Hossain",
          avatar: "KH",
          university: "East West University",
          department: "Computer Science",
          semester: "5th Semester",
        },
        submittedAt: "2023-05-17T13:10:00Z",
        files: [
          { name: "usability_report.pdf", size: "920 KB", type: "pdf" },
          { name: "wireframes_and_mockups.fig", size: "5.1 MB", type: "figma" },
          { name: "prototype.fig", size: "7.2 MB", type: "figma" },
          { name: "user_testing.pdf", size: "1.2 MB", type: "pdf" },
          { name: "design_documentation.pdf", size: "1.8 MB", type: "pdf" },
        ],
        notes:
          "I redesigned the mobile banking app with a focus on simplicity and accessibility. The new design reduces the number of steps for common tasks by 40%.",
        status: "evaluated",
        evaluation: {
          points: 110,
          rating: 4,
          feedback:
            "Very good work on the redesign. The usability analysis is thorough and your design decisions are well-justified. The prototype is intuitive and the accessibility features are well-implemented. Some minor improvements could be made to the information architecture, but overall this is a strong submission.",
          evaluatedAt: "2023-05-19T10:30:00Z",
        },
      },
    ],
  })

  const handleEvaluateSubmission = (submission: any) => {
    setCurrentSubmission(submission)
    setEvaluationData({
      points: submission.taskId === 1 ? "150" : submission.taskId === 2 ? "120" : "200",
      rating: "3",
      feedback: "",
    })
    setEvaluationDialogOpen(true)
  }

  const handleSubmitEvaluation = () => {
    // Validate evaluation data
    if (!evaluationData.points || !evaluationData.feedback) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Update the submission with evaluation
    const updatedSubmission = {
      ...currentSubmission,
      status: "evaluated",
      evaluation: {
        points: Number.parseInt(evaluationData.points),
        rating: Number.parseInt(evaluationData.rating),
        feedback: evaluationData.feedback,
        evaluatedAt: new Date().toISOString(),
      },
    }

    // Remove from pending and add to evaluated
    const updatedPending = submissions.pending.filter((sub) => sub.id !== currentSubmission.id)
    const updatedEvaluated = [updatedSubmission, ...submissions.evaluated]

    setSubmissions({
      pending: updatedPending,
      evaluated: updatedEvaluated,
    })

    setEvaluationDialogOpen(false)

    toast({
      title: "Evaluation Submitted",
      description: `You have successfully evaluated ${currentSubmission.student.name}'s submission.`,
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Filter submissions based on search query
  const filteredSubmissions = {
    pending: submissions.pending.filter(
      (sub) =>
        sub.taskTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.student.university.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
    evaluated: submissions.evaluated.filter(
      (sub) =>
        sub.taskTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.student.university.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  }

  return (
    <div>
      <DashboardHeader title="Task Evaluation" />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Evaluate Student Submissions</h2>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search submissions..."
              className="w-64 pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="pending" className="space-y-4" onValueChange={setActiveTab as any}>
          <TabsList>
            <TabsTrigger value="pending">Pending Evaluation</TabsTrigger>
            <TabsTrigger value="evaluated">Evaluated</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {filteredSubmissions.pending.length > 0 ? (
              filteredSubmissions.pending.map((submission) => (
                <SubmissionCard
                  key={submission.id}
                  submission={submission}
                  onEvaluate={handleEvaluateSubmission}
                  formatDate={formatDate}
                />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {searchQuery
                  ? "No pending submissions match your search criteria."
                  : "No pending submissions to evaluate."}
              </div>
            )}
          </TabsContent>

          <TabsContent value="evaluated" className="space-y-4">
            {filteredSubmissions.evaluated.length > 0 ? (
              filteredSubmissions.evaluated.map((submission) => (
                <SubmissionCard
                  key={submission.id}
                  submission={submission}
                  onEvaluate={handleEvaluateSubmission}
                  formatDate={formatDate}
                />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {searchQuery ? "No evaluated submissions match your search criteria." : "No evaluated submissions yet."}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Evaluation Dialog */}
        <Dialog open={evaluationDialogOpen} onOpenChange={setEvaluationDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Evaluate Submission</DialogTitle>
              <DialogDescription>
                Review and evaluate {currentSubmission?.student.name}'s submission for {currentSubmission?.taskTitle}.
              </DialogDescription>
            </DialogHeader>
            {currentSubmission && (
              <div className="grid gap-4 py-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar>
                      <AvatarImage
                        src={`/placeholder.svg?height=40&width=40&text=${currentSubmission.student.avatar}`}
                        alt={currentSubmission.student.name}
                      />
                      <AvatarFallback>{currentSubmission.student.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{currentSubmission.student.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {currentSubmission.student.university} • {currentSubmission.student.department} •{" "}
                        {currentSubmission.student.semester}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm mb-3">
                    <span className="font-medium">Submitted on:</span> {formatDate(currentSubmission.submittedAt)}
                  </div>
                  <div className="text-sm mb-3">
                    <span className="font-medium">Student Notes:</span>
                    <p className="mt-1">{currentSubmission.notes}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Submitted Files:</span>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {currentSubmission.files.map((file: any, index: number) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-background rounded border text-sm">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1 min-w-0">
                            <div className="truncate">{file.name}</div>
                            <div className="text-xs text-muted-foreground">{file.size}</div>
                          </div>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="points">Points Awarded</Label>
                      <Input
                        id="points"
                        type="number"
                        placeholder="e.g. 100"
                        value={evaluationData.points}
                        onChange={(e) => setEvaluationData({ ...evaluationData, points: e.target.value })}
                      />
                      <div className="text-xs text-muted-foreground">
                        Maximum points:{" "}
                        {currentSubmission.taskId === 1 ? 150 : currentSubmission.taskId === 2 ? 120 : 200}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="rating">Rating</Label>
                      <Select
                        value={evaluationData.rating}
                        onValueChange={(value) => setEvaluationData({ ...evaluationData, rating: value })}
                      >
                        <SelectTrigger id="rating">
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 - Poor</SelectItem>
                          <SelectItem value="2">2 - Fair</SelectItem>
                          <SelectItem value="3">3 - Good</SelectItem>
                          <SelectItem value="4">4 - Very Good</SelectItem>
                          <SelectItem value="5">5 - Excellent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="feedback">Feedback</Label>
                    <Textarea
                      id="feedback"
                      placeholder="Provide detailed feedback on the submission"
                      rows={5}
                      value={evaluationData.feedback}
                      onChange={(e) => setEvaluationData({ ...evaluationData, feedback: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEvaluationDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSubmitEvaluation}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Submit Evaluation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

function SubmissionCard({
  submission,
  onEvaluate,
  formatDate,
}: {
  submission: any
  onEvaluate: (submission: any) => void
  formatDate: (date: string) => string
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{submission.taskTitle}</CardTitle>
            <CardDescription className="mt-1">Submitted on {formatDate(submission.submittedAt)}</CardDescription>
          </div>
          <Badge
            className={
              submission.status === "pending"
                ? "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/20 dark:text-amber-400"
                : "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400"
            }
          >
            {submission.status === "pending" ? "Pending Evaluation" : "Evaluated"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarImage
              src={`/placeholder.svg?height=40&width=40&text=${submission.student.avatar}`}
              alt={submission.student.name}
            />
            <AvatarFallback>{submission.student.avatar}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{submission.student.name}</div>
            <div className="text-sm text-muted-foreground">
              {submission.student.university} • {submission.student.department} • {submission.student.semester}
            </div>
          </div>
        </div>

        <div className="text-sm mb-4">
          <span className="font-medium">Student Notes:</span>
          <p className="mt-1 text-muted-foreground">{submission.notes}</p>
        </div>

        <div>
          <span className="text-sm font-medium">Submitted Files:</span>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {submission.files.map((file: any, index: number) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <div className="truncate">{file.name}</div>
                  <div className="text-xs text-muted-foreground">{file.size}</div>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {submission.status === "evaluated" && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Evaluation</span>
              <div className="flex items-center">
                <span className="text-sm font-medium mr-1">Rating:</span>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < submission.evaluation.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="text-sm mb-2">
              <span className="font-medium">Points Awarded:</span> {submission.evaluation.points} points
            </div>
            <div className="text-sm">
              <span className="font-medium">Feedback:</span>
              <p className="mt-1 text-muted-foreground">{submission.evaluation.feedback}</p>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              Evaluated on {formatDate(submission.evaluation.evaluatedAt)}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end border-t pt-4">
        {submission.status === "pending" ? (
          <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => onEvaluate(submission)}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Evaluate Submission
          </Button>
        ) : (
          <Button variant="outline">View Full Details</Button>
        )}
      </CardFooter>
    </Card>
  )
}
