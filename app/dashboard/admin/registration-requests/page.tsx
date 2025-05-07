"use client"

import { Suspense, useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Building2, CheckCircle, GraduationCap, Info, Users, XCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function RegistrationRequestsPage() {
  const [activeTab, setActiveTab] = useState("university")
  const [viewDetailsDialogOpen, setViewDetailsDialogOpen] = useState(false)
  const [currentRequest, setCurrentRequest] = useState<any>(null)

  // Mock data for registration requests
  const [requests, setRequests] = useState({
    university: [
      {
        id: 1,
        name: "East West University",
        email: "admin@ewu.edu",
        type: "university",
        details: {
          address: "A/2 Jahurul Islam Avenue, Jahurul Islam City, Aftabnagar, Dhaka-1212",
          website: "https://www.ewubd.edu",
          contactPerson: "Dr. Mohammed Rahman",
          contactPhone: "+880 1712-345678",
          departments: ["Computer Science", "Electrical Engineering", "Business Administration"],
          establishedYear: 1996,
          totalStudents: 8500,
        },
        submittedAt: "2023-05-15T10:30:00Z",
        status: "pending",
      },
      {
        id: 2,
        name: "American International University-Bangladesh",
        email: "admin@aiub.edu",
        type: "university",
        details: {
          address: "408/1, Kuratoli, Khilkhet, Dhaka 1229",
          website: "https://www.aiub.edu",
          contactPerson: "Dr. Fatima Khan",
          contactPhone: "+880 1812-345678",
          departments: ["Computer Science", "Electrical Engineering", "Business Administration", "Architecture"],
          establishedYear: 1994,
          totalStudents: 10000,
        },
        submittedAt: "2023-05-14T14:45:00Z",
        status: "pending",
      },
    ],
    industry: [
      {
        id: 3,
        name: "DataViz Corp",
        email: "admin@dataviz.com",
        type: "industry",
        details: {
          address: "House 42, Road 3, Banani, Dhaka-1213",
          website: "https://www.dataviz.com",
          contactPerson: "Kamal Hossain",
          contactPhone: "+880 1912-345678",
          industry: "Data Analytics",
          employeeCount: 120,
          foundedYear: 2015,
        },
        submittedAt: "2023-05-16T09:15:00Z",
        status: "pending",
      },
      {
        id: 4,
        name: "EnergyTech",
        email: "admin@energytech.com",
        type: "industry",
        details: {
          address: "Plot 15, Block D, Bashundhara R/A, Dhaka-1229",
          website: "https://www.energytech.com",
          contactPerson: "Rahima Begum",
          contactPhone: "+880 1612-345678",
          industry: "Renewable Energy",
          employeeCount: 85,
          foundedYear: 2018,
        },
        submittedAt: "2023-05-15T16:20:00Z",
        status: "pending",
      },
    ],
    individual: [
      {
        id: 5,
        name: "Arif Khan",
        email: "arif.khan@gmail.com",
        type: "individual",
        details: {
          address: "House 7, Road 5, Dhanmondi, Dhaka-1205",
          phone: "+880 1512-345678",
          education: "BSc in Computer Science, Dhaka University",
          experience: "2 years as a Software Developer",
          skills: ["JavaScript", "React", "Node.js", "Python"],
          interests: ["Web Development", "Machine Learning", "Data Science"],
        },
        submittedAt: "2023-05-17T11:10:00Z",
        status: "pending",
      },
      {
        id: 6,
        name: "Nusrat Jahan",
        email: "nusrat.jahan@gmail.com",
        type: "individual",
        details: {
          address: "Apartment 3A, Building 12, Uttara, Dhaka-1230",
          phone: "+880 1612-987654",
          education: "BSc in Electrical Engineering, BUET",
          experience: "1 year as an Electrical Engineer",
          skills: ["Circuit Design", "MATLAB", "AutoCAD", "PLC Programming"],
          interests: ["Renewable Energy", "IoT", "Embedded Systems"],
        },
        submittedAt: "2023-05-16T14:30:00Z",
        status: "pending",
      },
    ],
  })

  const handleViewDetails = (request: any) => {
    setCurrentRequest(request)
    setViewDetailsDialogOpen(true)
  }

  const handleApprove = (id: number, type: "university" | "industry" | "individual") => {
    // Update the status of the request
    const updatedRequests = {
      ...requests,
      [type]: requests[type].map((req) => (req.id === id ? { ...req, status: "approved" } : req)),
    }
    setRequests(updatedRequests)

    // Show success message
    toast({
      title: "Registration Approved",
      description: `The registration request has been approved successfully.`,
    })
  }

  const handleReject = (id: number, type: "university" | "industry" | "individual") => {
    // Update the status of the request
    const updatedRequests = {
      ...requests,
      [type]: requests[type].map((req) => (req.id === id ? { ...req, status: "rejected" } : req)),
    }
    setRequests(updatedRequests)

    // Show success message
    toast({
      title: "Registration Rejected",
      description: `The registration request has been rejected.`,
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/20 dark:text-amber-400">
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400">
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-950/20 dark:text-red-400">
            Rejected
          </Badge>
        )
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case "university":
        return <Building2 className="h-5 w-5" />
      case "industry":
        return <Users className="h-5 w-5" />
      case "individual":
        return <GraduationCap className="h-5 w-5" />
      default:
        return <Info className="h-5 w-5" />
    }
  }

  return (

    <Suspense fallback={<div>Loading...</div>}>
    <div>
      <DashboardHeader title="Registration Requests" />
      <div className="p-6 space-y-6">
        <Tabs defaultValue="university" className="space-y-4" onValueChange={setActiveTab as any}>
          <TabsList>
            <TabsTrigger value="university">University Requests</TabsTrigger>
            <TabsTrigger value="industry">Industry Requests</TabsTrigger>
            <TabsTrigger value="individual">Individual Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="university" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>University Registration Requests</CardTitle>
                <CardDescription>Review and approve university registration requests</CardDescription>
              </CardHeader>
              <CardContent>
                {requests.university.length > 0 ? (
                  <div className="space-y-4">
                    {requests.university.map((request) => (
                      <div key={request.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40&text=${request.name.substring(0, 2)}`}
                            alt={request.name}
                          />
                          <AvatarFallback>{request.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{request.name}</div>
                          <div className="text-sm text-muted-foreground">{request.email}</div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Submitted: {formatDate(request.submittedAt)}
                        </div>
                        {getStatusBadge(request.status)}
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewDetails(request)}>
                            View Details
                          </Button>
                          {request.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-emerald-600 hover:bg-emerald-700"
                                onClick={() => handleApprove(request.id, "university")}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-600 hover:bg-red-50"
                                onClick={() => handleReject(request.id, "university")}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">No university registration requests.</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="industry" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Industry Registration Requests</CardTitle>
                <CardDescription>Review and approve industry registration requests</CardDescription>
              </CardHeader>
              <CardContent>
                {requests.industry.length > 0 ? (
                  <div className="space-y-4">
                    {requests.industry.map((request) => (
                      <div key={request.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40&text=${request.name.substring(0, 2)}`}
                            alt={request.name}
                          />
                          <AvatarFallback>{request.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{request.name}</div>
                          <div className="text-sm text-muted-foreground">{request.email}</div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Submitted: {formatDate(request.submittedAt)}
                        </div>
                        {getStatusBadge(request.status)}
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewDetails(request)}>
                            View Details
                          </Button>
                          {request.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-emerald-600 hover:bg-emerald-700"
                                onClick={() => handleApprove(request.id, "industry")}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-600 hover:bg-red-50"
                                onClick={() => handleReject(request.id, "industry")}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">No industry registration requests.</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="individual" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Individual Registration Requests</CardTitle>
                <CardDescription>Review and approve individual skill gainer registration requests</CardDescription>
              </CardHeader>
              <CardContent>
                {requests.individual.length > 0 ? (
                  <div className="space-y-4">
                    {requests.individual.map((request) => (
                      <div key={request.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40&text=${request.name.substring(0, 2)}`}
                            alt={request.name}
                          />
                          <AvatarFallback>{request.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{request.name}</div>
                          <div className="text-sm text-muted-foreground">{request.email}</div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Submitted: {formatDate(request.submittedAt)}
                        </div>
                        {getStatusBadge(request.status)}
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewDetails(request)}>
                            View Details
                          </Button>
                          {request.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-emerald-600 hover:bg-emerald-700"
                                onClick={() => handleApprove(request.id, "individual")}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-600 hover:bg-red-50"
                                onClick={() => handleReject(request.id, "individual")}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">No individual registration requests.</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* View Details Dialog */}
        <AlertDialog open={viewDetailsDialogOpen} onOpenChange={setViewDetailsDialogOpen}>
          <AlertDialogContent className="max-w-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                {getIconForType(currentRequest?.type || "")}
                {currentRequest?.name} Details
              </AlertDialogTitle>
              <AlertDialogDescription>
                Registration request submitted on {currentRequest && formatDate(currentRequest.submittedAt)}
              </AlertDialogDescription>
            </AlertDialogHeader>

            {currentRequest && (
              <div className="py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-sm">Contact Information</h3>
                    <div className="mt-2 space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Email:</span> {currentRequest.email}
                      </div>
                      {currentRequest.type === "university" || currentRequest.type === "industry" ? (
                        <>
                          <div>
                            <span className="font-medium">Contact Person:</span> {currentRequest.details.contactPerson}
                          </div>
                          <div>
                            <span className="font-medium">Contact Phone:</span> {currentRequest.details.contactPhone}
                          </div>
                          <div>
                            <span className="font-medium">Website:</span> {currentRequest.details.website}
                          </div>
                        </>
                      ) : (
                        <div>
                          <span className="font-medium">Phone:</span> {currentRequest.details.phone}
                        </div>
                      )}
                      <div>
                        <span className="font-medium">Address:</span> {currentRequest.details.address}
                      </div>
                    </div>
                  </div>

                  <div>
                    {currentRequest.type === "university" && (
                      <>
                        <h3 className="font-medium text-sm">University Information</h3>
                        <div className="mt-2 space-y-2 text-sm">
                          <div>
                            <span className="font-medium">Established:</span> {currentRequest.details.establishedYear}
                          </div>
                          <div>
                            <span className="font-medium">Total Students:</span>{" "}
                            {currentRequest.details.totalStudents.toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium">Departments:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {currentRequest.details.departments.map((dept: string) => (
                                <Badge key={dept} variant="outline" className="text-xs">
                                  {dept}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {currentRequest.type === "industry" && (
                      <>
                        <h3 className="font-medium text-sm">Company Information</h3>
                        <div className="mt-2 space-y-2 text-sm">
                          <div>
                            <span className="font-medium">Industry:</span> {currentRequest.details.industry}
                          </div>
                          <div>
                            <span className="font-medium">Founded:</span> {currentRequest.details.foundedYear}
                          </div>
                          <div>
                            <span className="font-medium">Employees:</span>{" "}
                            {currentRequest.details.employeeCount.toLocaleString()}
                          </div>
                        </div>
                      </>
                    )}

                    {currentRequest.type === "individual" && (
                      <>
                        <h3 className="font-medium text-sm">Individual Information</h3>
                        <div className="mt-2 space-y-2 text-sm">
                          <div>
                            <span className="font-medium">Education:</span> {currentRequest.details.education}
                          </div>
                          <div>
                            <span className="font-medium">Experience:</span> {currentRequest.details.experience}
                          </div>
                          <div>
                            <span className="font-medium">Skills:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {currentRequest.details.skills.map((skill: string) => (
                                <Badge key={skill} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="font-medium">Interests:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {currentRequest.details.interests.map((interest: string) => (
                                <Badge key={interest} variant="outline" className="text-xs">
                                  {interest}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
              {currentRequest?.status === "pending" && (
                <>
                  <AlertDialogAction
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => {
                      handleApprove(currentRequest.id, currentRequest.type)
                      setViewDetailsDialogOpen(false)
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </AlertDialogAction>
                  <AlertDialogAction
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => {
                      handleReject(currentRequest.id, currentRequest.type)
                      setViewDetailsDialogOpen(false)
                    }}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </AlertDialogAction>
                </>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  </Suspense>
    
  )
}
