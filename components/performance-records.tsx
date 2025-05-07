import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Download, ExternalLink, Star } from "lucide-react"

interface Certificate {
  id: number
  title: string
  issueDate: string
  issuer: string
  skills: string[]
  downloadUrl: string
}

interface PerformanceRecord {
  id: number
  taskTitle: string
  courseCode?: string
  completionDate: string
  score: number
  maxScore: number
  feedback?: string
  skills: string[]
}

interface PerformanceRecordsProps {
  records: PerformanceRecord[]
  certificates: Certificate[]
  studentType: "university" | "individual"
}

export function PerformanceRecords({ records, certificates, studentType }: PerformanceRecordsProps) {
  return (
    <Card>
      <CardHeader className="bg-gradient-to-br from-orange-500 via-orange-300 to-orange-400 text-white">
        <CardTitle>Performance & Achievements</CardTitle>
        <CardDescription className="text-white/90">
          Your task performance records and earned certificates
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="w-full justify-start px-6 pt-2 bg-gray-50 border-b">
            <TabsTrigger value="performance" className="data-[state=active]:text-orange-600">
              Performance Records
            </TabsTrigger>
            <TabsTrigger value="certificates" className="data-[state=active]:text-orange-600">
              Certificates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="p-6">
            <div className="space-y-4">
              {records.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No performance records available yet.</div>
              ) : (
                records.map((record) => (
                  <div key={record.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{record.taskTitle}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {record.courseCode && `${record.courseCode} • `}Completed on {record.completionDate}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="flex">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => {
                              const scorePercentage = (record.score / record.maxScore) * 5
                              return (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < scorePercentage ? "text-orange-500 fill-orange-500" : "text-gray-300"}`}
                                />
                              )
                            })}
                        </div>
                        <span className="ml-2 text-sm font-medium">
                          {record.score}/{record.maxScore}
                        </span>
                      </div>
                    </div>

                    {record.feedback && (
                      <div className="mt-3 bg-gray-50 p-3 rounded-md">
                        <div className="text-sm font-medium">Feedback</div>
                        <p className="text-sm mt-1">{record.feedback}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mt-3">
                      {record.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="bg-orange-50 border-orange-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="certificates" className="p-6">
            <div className="grid gap-4 md:grid-cols-2">
              {certificates.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground md:col-span-2">No certificates earned yet.</div>
              ) : (
                certificates.map((certificate) => (
                  <Card key={certificate.id} className="overflow-hidden">
                    <CardHeader className="bg-orange-50 border-b pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">{certificate.title}</CardTitle>
                          <CardDescription>
                            Issued by {certificate.issuer} on {certificate.issueDate}
                          </CardDescription>
                        </div>
                        <Award className="h-6 w-6 text-orange-600" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {certificate.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="bg-orange-50 border-orange-200">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="w-full gap-1">
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                        <Button size="sm" className="w-full gap-1 bg-orange-600 hover:bg-orange-700">
                          <ExternalLink className="h-4 w-4" />
                          Verify
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
