import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, FileText } from "lucide-react"

interface Problem {
  id: number
  title: string
  company: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  tags: string[]
  deadline: string
  status: "Active" | "Completed" | "Pending" | "Expired"
  points: number
}

interface SemesterProblemsProps {
  semesters: {
    id: string
    name: string
    problems: Problem[]
  }[]
}

export function SemesterProblems({ semesters }: SemesterProblemsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
      case "Completed":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Pending":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100"
      case "Expired":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Semester Problems</CardTitle>
        <CardDescription>Problems organized by semester</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={semesters[0].id}>
          <TabsList className="mb-4">
            {semesters.map((semester) => (
              <TabsTrigger key={semester.id} value={semester.id}>
                {semester.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {semesters.map((semester) => (
            <TabsContent key={semester.id} value={semester.id} className="space-y-4">
              {semester.problems.map((problem) => (
                <div key={problem.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium">{problem.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Posted by {problem.company} • Difficulty: {problem.difficulty}
                      </div>
                    </div>
                    <Badge className={getStatusColor(problem.status)}>{problem.status}</Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    {problem.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Deadline: {problem.deadline}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium text-emerald-600">{problem.points} points</div>
                      <Button size="sm" className="gap-2">
                        <FileText className="h-4 w-4" />
                        View Problem
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
