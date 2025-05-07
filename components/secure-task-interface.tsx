"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, Clock, Eye, Upload } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface SecureTaskInterfaceProps {
  taskId: number
  title: string
  description: string
  timeLimit: number
  questions: {
    id: number
    type: "multiple_choice" | "text" | "code"
    question: string
    options?: string[]
  }[]
  onSubmit: (answers: any) => void
  onCancel: () => void
}

export function SecureTaskInterface({
  taskId,
  title,
  description,
  timeLimit,
  questions,
  onSubmit,
  onCancel,
}: SecureTaskInterfaceProps) {
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [answers, setAnswers] = useState<Record<number, any>>({})
  const [currentTab, setCurrentTab] = useState("1")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [securityViolations, setSecurityViolations] = useState<string[]>([])

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Security monitoring effect
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setSecurityViolations((prev) => [...prev, "Tab switching detected"])
      }
    }

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false)
        setSecurityViolations((prev) => [...prev, "Exited fullscreen mode"])
      } else {
        setIsFullscreen(true)
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const requestFullscreen = () => {
    document.documentElement
      .requestFullscreen()
      .then(() => {
        setIsFullscreen(true)
      })
      .catch((err) => {
        setSecurityViolations((prev) => [...prev, `Fullscreen request failed: ${err.message}`])
      })
  }

  const handleAnswerChange = (questionId: number, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    // In a real app, you would send the answers and security violations to the server
    onSubmit({
      taskId,
      answers,
      securityViolations,
      timeSpent: timeLimit * 60 - timeRemaining,
    })
  }

  const progressPercentage = (Object.keys(answers).length / questions.length) * 100

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] flex flex-col">
        <CardHeader className="bg-gradient-to-br from-orange-500 via-orange-300 to-orange-400 text-white">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription className="text-white/90">Secure Assessment Mode</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                <Clock className="mr-1 h-3 w-3" /> {formatTime(timeRemaining)}
              </Badge>
              {!isFullscreen && (
                <Button size="sm" variant="outline" className="border-white/30 text-white" onClick={requestFullscreen}>
                  <Eye className="mr-1 h-4 w-4" /> Enter Fullscreen
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto p-0">
          {securityViolations.length > 0 && (
            <Alert variant="destructive" className="m-6 mb-0">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Security Violation Detected</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-5 mt-2">
                  {securityViolations.map((violation, index) => (
                    <li key={index}>{violation}</li>
                  ))}
                </ul>
                <p className="mt-2">These violations will be reported with your submission.</p>
              </AlertDescription>
            </Alert>
          )}

          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Task Description</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>

            <div className="mb-4">
              <div className="flex justify-between mb-1 text-sm">
                <span>Completion Progress</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <Progress
                value={progressPercentage}
                className="h-2"
                indicatorClassName="bg-gradient-to-r from-orange-600 to-orange-500"
              />
            </div>

            <Tabs value={currentTab} onValueChange={setCurrentTab} className="mt-6">
              <TabsList className="w-full justify-start overflow-auto">
                {questions.map((_, index) => (
                  <TabsTrigger
                    key={index}
                    value={(index + 1).toString()}
                    className="data-[state=active]:text-orange-600"
                  >
                    Question {index + 1}
                  </TabsTrigger>
                ))}
              </TabsList>

              {questions.map((question, index) => (
                <TabsContent key={index} value={(index + 1).toString()} className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Question {index + 1}</h4>
                      <p>{question.question}</p>
                    </div>

                    {question.type === "multiple_choice" && question.options && (
                      <div className="space-y-2">
                        {question.options.map((option, optIndex) => (
                          <div key={optIndex} className="flex items-center">
                            <input
                              type="radio"
                              id={`q${question.id}-opt${optIndex}`}
                              name={`question-${question.id}`}
                              value={option}
                              checked={answers[question.id] === option}
                              onChange={() => handleAnswerChange(question.id, option)}
                              className="mr-2"
                            />
                            <label htmlFor={`q${question.id}-opt${optIndex}`}>{option}</label>
                          </div>
                        ))}
                      </div>
                    )}

                    {question.type === "text" && (
                      <Textarea
                        placeholder="Type your answer here..."
                        value={answers[question.id] || ""}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        className="min-h-[100px]"
                      />
                    )}

                    {question.type === "code" && (
                      <Textarea
                        placeholder="Write your code here..."
                        value={answers[question.id] || ""}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        className="min-h-[200px] font-mono"
                      />
                    )}
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button
                      variant="outline"
                      onClick={() => {
                        const prevQuestion = Math.max(1, Number.parseInt(currentTab) - 1)
                        setCurrentTab(prevQuestion.toString())
                      }}
                      disabled={currentTab === "1"}
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={() => {
                        if (Number.parseInt(currentTab) < questions.length) {
                          const nextQuestion = Number.parseInt(currentTab) + 1
                          setCurrentTab(nextQuestion.toString())
                        }
                      }}
                      disabled={Number.parseInt(currentTab) === questions.length}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      Next
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </CardContent>
        <CardFooter className="border-t p-4 flex justify-between">
          <Button variant="outline" onClick={onCancel}>
            Save & Exit
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-orange-600 hover:bg-orange-700">
            <Upload className="mr-2 h-4 w-4" />
            Submit Task
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
