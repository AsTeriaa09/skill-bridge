"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Calendar, Edit, FileText, GraduationCap, PlusCircle, Search, Trash, Users } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function CoursesPage() {
  const router = useRouter()
  const [selectedSemester, setSelectedSemester] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [currentCourse, setCurrentCourse] = useState<any>(null)

  // Form states for create/edit
  const [formData, setFormData] = useState({
    code: "",
    title: "",
    semester: "",
    department: "",
    instructor: "",
    startDate: "",
    endDate: "",
    description: "",
  })

  // Mock data for courses
  const [courses, setCourses] = useState([
    {
      id: 1,
      code: "CSE301",
      title: "Database Systems",
      semester: "6",
      department: "Computer Science",
      instructor: "Dr. Anisul Islam",
      students: 45,
      problems: 3,
      description: "Introduction to database design, SQL, and database management systems.",
      startDate: "January 15, 2023",
      endDate: "May 30, 2023",
    },
    {
      id: 2,
      code: "CSE311",
      title: "Artificial Intelligence",
      semester: "6",
      department: "Computer Science",
      instructor: "Dr. Fatima Rahman",
      students: 38,
      problems: 2,
      description: "Fundamentals of artificial intelligence, machine learning, and neural networks.",
      startDate: "January 15, 2023",
      endDate: "May 30, 2023",
    },
    {
      id: 3,
      code: "CSE401",
      title: "Software Engineering",
      semester: "7",
      department: "Computer Science",
      instructor: "Dr. Mohammad Khan",
      students: 42,
      problems: 4,
      description: "Software development lifecycle, project management, and software design principles.",
      startDate: "January 15, 2023",
      endDate: "May 30, 2023",
    },
    {
      id: 4,
      code: "EEE301",
      title: "Digital Signal Processing",
      semester: "6",
      department: "Electrical Engineering",
      instructor: "Dr. Kamal Hossain",
      students: 35,
      problems: 2,
      description: "Analysis and processing of discrete-time signals and systems.",
      startDate: "January 15, 2023",
      endDate: "May 30, 2023",
    },
    {
      id: 5,
      code: "CSE201",
      title: "Data Structures",
      semester: "4",
      department: "Computer Science",
      instructor: "Dr. Rahima Begum",
      students: 50,
      problems: 3,
      description: "Implementation and application of common data structures and algorithms.",
      startDate: "January 15, 2023",
      endDate: "May 30, 2023",
    },
  ])

  // Filter courses based on selected semester and search query
  const filteredCourses = courses
    .filter((course) => selectedSemester === "all" || course.semester === selectedSemester)
    .filter((course) => {
      if (!searchQuery) return true
      return (
        course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.department.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })

  const handleCreateCourse = () => {
    // Validate form data
    if (!formData.code || !formData.title || !formData.semester || !formData.department) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Create new course
    const newCourse = {
      id: courses.length + 1,
      ...formData,
      students: 0,
      problems: 0,
    }

    setCourses([...courses, newCourse])

    // Reset form
    setFormData({
      code: "",
      title: "",
      semester: "",
      department: "",
      instructor: "",
      startDate: "",
      endDate: "",
      description: "",
    })

    toast({
      title: "Course Created",
      description: `${newCourse.code}: ${newCourse.title} has been created successfully.`,
    })
  }

  const handleEditCourse = () => {
    if (!currentCourse) return

    // Validate form data
    if (!formData.code || !formData.title || !formData.semester || !formData.department) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Update course
    const updatedCourses = courses.map((course) =>
      course.id === currentCourse.id
        ? {
            ...course,
            ...formData,
          }
        : course,
    )

    setCourses(updatedCourses)
    setEditDialogOpen(false)

    toast({
      title: "Course Updated",
      description: `${formData.code}: ${formData.title} has been updated successfully.`,
    })
  }

  const handleDeleteCourse = () => {
    if (!currentCourse) return

    // Delete course
    const updatedCourses = courses.filter((course) => course.id !== currentCourse.id)
    setCourses(updatedCourses)
    setDeleteDialogOpen(false)

    toast({
      title: "Course Deleted",
      description: `${currentCourse.code}: ${currentCourse.title} has been deleted.`,
    })
  }

  const openEditDialog = (course: any) => {
    setCurrentCourse(course)
    setFormData({
      code: course.code,
      title: course.title,
      semester: course.semester,
      department: course.department,
      instructor: course.instructor,
      startDate: course.startDate,
      endDate: course.endDate,
      description: course.description,
    })
    setEditDialogOpen(true)
  }

  const openDeleteDialog = (course: any) => {
    setCurrentCourse(course)
    setDeleteDialogOpen(true)
  }

  return (
    <div>
      <DashboardHeader title="Course Management" />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Manage Courses</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search courses..."
                className="w-64 pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Create New Course
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Course</DialogTitle>
                  <DialogDescription>
                    Add a new course for the semester. Industry problems can be assigned to courses.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="code">Course Code</Label>
                      <Input
                        id="code"
                        placeholder="e.g. CSE301"
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="title">Course Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g. Database Systems"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="semester">Semester</Label>
                      <Select
                        value={formData.semester}
                        onValueChange={(value) => setFormData({ ...formData, semester: value })}
                      >
                        <SelectTrigger id="semester">
                          <SelectValue placeholder="Select semester" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="4">4th Semester</SelectItem>
                          <SelectItem value="5">5th Semester</SelectItem>
                          <SelectItem value="6">6th Semester</SelectItem>
                          <SelectItem value="7">7th Semester</SelectItem>
                          <SelectItem value="8">8th Semester</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="department">Department</Label>
                      <Select
                        value={formData.department}
                        onValueChange={(value) => setFormData({ ...formData, department: value })}
                      >
                        <SelectTrigger id="department">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Computer Science">Computer Science</SelectItem>
                          <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                          <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                          <SelectItem value="Business Administration">Business Administration</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="instructor">Instructor</Label>
                    <Input
                      id="instructor"
                      placeholder="e.g. Dr. Anisul Islam"
                      value={formData.instructor}
                      onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="text"
                        placeholder="e.g. January 15, 2023"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="text"
                        placeholder="e.g. May 30, 2023"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Course Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter course description"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleCreateCourse}>
                    Create Course
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedSemester}>
            <TabsList>
              <TabsTrigger value="all">All Semesters</TabsTrigger>
              <TabsTrigger value="4">4th Semester</TabsTrigger>
              <TabsTrigger value="5">5th Semester</TabsTrigger>
              <TabsTrigger value="6">6th Semester</TabsTrigger>
              <TabsTrigger value="7">7th Semester</TabsTrigger>
              <TabsTrigger value="8">8th Semester</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-4">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>
                        {course.code}: {course.title}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {course.department} • {course.semester}th Semester
                      </CardDescription>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400">
                      Active
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">{course.students}</div>
                        <div className="text-xs text-muted-foreground">Students</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">{course.problems}</div>
                        <div className="text-xs text-muted-foreground">Problems</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">{course.instructor}</div>
                        <div className="text-xs text-muted-foreground">Instructor</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">
                          {course.startDate} - {course.endDate}
                        </div>
                        <div className="text-xs text-muted-foreground">Duration</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t pt-4">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1" onClick={() => openEditDialog(course)}>
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 text-red-600 hover:text-red-600 hover:bg-red-50"
                      onClick={() => openDeleteDialog(course)}
                    >
                      <Trash className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => router.push(`/dashboard/university/students?courseId=${course.id}`)}
                    >
                      <Users className="h-4 w-4" />
                      Students
                    </Button>
                    <Button
                      size="sm"
                      className="gap-1"
                      onClick={() => router.push(`/dashboard/university/course-problems/${course.id}`)}
                    >
                      <BookOpen className="h-4 w-4" />
                      Manage Problems
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">No courses found for the selected semester.</div>
          )}
        </div>
      </div>

      {/* Edit Course Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>Update the course information.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-code">Course Code</Label>
                <Input
                  id="edit-code"
                  placeholder="e.g. CSE301"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Course Title</Label>
                <Input
                  id="edit-title"
                  placeholder="e.g. Database Systems"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-semester">Semester</Label>
                <Select
                  value={formData.semester}
                  onValueChange={(value) => setFormData({ ...formData, semester: value })}
                >
                  <SelectTrigger id="edit-semester">
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">4th Semester</SelectItem>
                    <SelectItem value="5">5th Semester</SelectItem>
                    <SelectItem value="6">6th Semester</SelectItem>
                    <SelectItem value="7">7th Semester</SelectItem>
                    <SelectItem value="8">8th Semester</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-department">Department</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => setFormData({ ...formData, department: value })}
                >
                  <SelectTrigger id="edit-department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                    <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                    <SelectItem value="Business Administration">Business Administration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-instructor">Instructor</Label>
              <Input
                id="edit-instructor"
                placeholder="e.g. Dr. Anisul Islam"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-startDate">Start Date</Label>
                <Input
                  id="edit-startDate"
                  type="text"
                  placeholder="e.g. January 15, 2023"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-endDate">End Date</Label>
                <Input
                  id="edit-endDate"
                  type="text"
                  placeholder="e.g. May 30, 2023"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Course Description</Label>
              <Textarea
                id="edit-description"
                placeholder="Enter course description"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleEditCourse}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the course "{currentCourse?.code}: {currentCourse?.title}". This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDeleteCourse}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
