"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, FileText, PlusCircle, Trash } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function TaskCreationPage() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "E-commerce Recommendation Algorithm",
      difficulty: "Intermediate",
      points: 150,
      creditPrice: 10,
      departments: ["Computer Science", "Data Science"],
      description:
        "Design and implement a recommendation algorithm for an e-commerce platform that suggests products based on user browsing history and purchase patterns.",
      requirements: [
        "Implement a recommendation algorithm using Python, R, or any other suitable programming language.",
        "The algorithm should be able to process user behavior data (browsing history, purchase history, product ratings) and generate personalized product recommendations.",
        "Include data preprocessing steps to handle missing values, outliers, and feature engineering.",
        "Implement at least two different recommendation approaches (e.g., collaborative filtering, content-based filtering, or a hybrid approach).",
        "Evaluate the performance of your algorithm using appropriate metrics (e.g., precision, recall, F1-score, RMSE).",
        "Provide a simple API or interface to demonstrate how your algorithm works.",
      ],
      deliverables: [
        "Source code with clear documentation.",
        "A report (maximum 5 pages) explaining your approach, methodology, and results.",
        "A presentation (maximum 10 slides) summarizing your solution.",
        "A demo or API to showcase your recommendation system in action.",
      ],
      status: "active",
      createdAt: "2023-05-10T09:30:00Z",
    },
    {
      id: 2,
      title: "Mobile App UI/UX Redesign",
      difficulty: "Intermediate",
      points: 120,
      creditPrice: 8,
      departments: ["Computer Science", "Design"],
      description:
        "Redesign the user interface and experience for a mobile banking application to improve usability and accessibility.",
      requirements: [
        "Conduct a usability analysis of the existing mobile banking application.",
        "Identify key pain points and areas for improvement.",
        "Create wireframes and mockups for the redesigned interface.",
        "Implement a prototype of the redesigned interface using Figma, Adobe XD, or any other suitable tool.",
        "Conduct user testing to validate the redesign.",
        "Document the design process and decisions.",
      ],
      deliverables: [
        "Usability analysis report.",
        "Wireframes and mockups.",
        "Interactive prototype.",
        "User testing results and feedback.",
        "Design documentation.",
      ],
      status: "active",
      createdAt: "2023-05-12T14:45:00Z",
    },
    {
      id: 3,
      title: "Sustainable Supply Chain Optimization",
      difficulty: "Advanced",
      points: 200,
      creditPrice: 15,
      departments: ["Business Administration", "Industrial Engineering"],
      description:
        "Develop a model to optimize supply chain operations while minimizing carbon footprint and environmental impact.",
      requirements: [
        "Analyze the current supply chain operations and identify areas for improvement.",
        "Develop a mathematical model to optimize supply chain operations while minimizing environmental impact.",
        "Implement the model using appropriate tools and technologies.",
        "Validate the model using real or synthetic data.",
        "Provide recommendations for improving supply chain sustainability.",
      ],
      deliverables: [
        "Analysis report of current supply chain operations.",
        "Mathematical model documentation.",
        "Implementation code or tool.",
        "Validation results and analysis.",
        "Recommendations report.",
      ],
      status: "active",
      createdAt: "2023-05-15T11:20:00Z",
    },
  ])

  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState<any>(null)

  // Form state for create/edit
  const [formData, setFormData] = useState({
    title: "",
    difficulty: "Intermediate",
    points: "",
    creditPrice: "",
    departments: [] as string[],
    description: "",
    requirements: "",
    deliverables: "",
  })

  const handleCreateTask = () => {
    // Validate form data
    if (
      !formData.title ||
      !formData.points ||
      !formData.description ||
      !formData.requirements ||
      !formData.deliverables
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Create new task
    const newTask = {
      id: tasks.length + 1,
      title: formData.title,
      difficulty: formData.difficulty,
      points: Number.parseInt(formData.points),
      creditPrice: Number.parseInt(formData.creditPrice) || 0,
      departments: formData.departments,
      description: formData.description,
      requirements: formData.requirements.split("\n").filter((req) => req.trim() !== ""),
      deliverables: formData.deliverables.split("\n").filter((del) => del.trim() !== ""),
      status: "active",
      createdAt: new Date().toISOString(),
    }

    setTasks([...tasks, newTask])

    // Reset form
    setFormData({
      title: "",
      difficulty: "Intermediate",
      points: "",
      creditPrice: "",
      departments: [],
      description: "",
      requirements: "",
      deliverables: "",
    })

    toast({
      title: "Task Created",
      description: `${newTask.title} has been created successfully.`,
    })
  }

  const handleEditTask = () => {
    if (!currentTask) return

    // Validate form data
    if (
      !formData.title ||
      !formData.points ||
      !formData.description ||
      !formData.requirements ||
      !formData.deliverables
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Update task
    const updatedTasks = tasks.map((task) =>
      task.id === currentTask.id
        ? {
            ...task,
            title: formData.title,
            difficulty: formData.difficulty,
            points: Number.parseInt(formData.points),
            creditPrice: Number.parseInt(formData.creditPrice) || 0,
            departments: formData.departments,
            description: formData.description,
            requirements: formData.requirements.split("\n").filter((req) => req.trim() !== ""),
            deliverables: formData.deliverables.split("\n").filter((del) => del.trim() !== ""),
          }
        : task,
    )

    setTasks(updatedTasks)
    setEditDialogOpen(false)

    toast({
      title: "Task Updated",
      description: `${formData.title} has been updated successfully.`,
    })
  }

  const handleDeleteTask = () => {
    if (!currentTask) return

    // Delete task (in a real app, you might want to soft delete or archive)
    const updatedTasks = tasks.filter((task) => task.id !== currentTask.id)
    setTasks(updatedTasks)
    setDeleteDialogOpen(false)

    toast({
      title: "Task Deleted",
      description: `${currentTask.title} has been deleted.`,
    })
  }

  const openEditDialog = (task: any) => {
    setCurrentTask(task)
    setFormData({
      title: task.title,
      difficulty: task.difficulty,
      points: task.points.toString(),
      creditPrice: task.creditPrice.toString(),
      departments: task.departments,
      description: task.description,
      requirements: task.requirements.join("\n"),
      deliverables: task.deliverables.join("\n"),
    })
    setEditDialogOpen(true)
  }

  const openDeleteDialog = (task: any) => {
    setCurrentTask(task)
    setDeleteDialogOpen(true)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-950/20 dark:text-green-400"
      case "Intermediate":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-950/20 dark:text-orange-400"
      case "Advanced":
        return "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-950/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div>
      <DashboardHeader title="Task Creation" />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Manage Tasks</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-orange-600 hover:bg-orange-700 gap-2">
                <PlusCircle className="h-4 w-4" />
                Create New Task
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription>Create a new task for universities to assign to their students.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Task Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter a descriptive title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select
                      value={formData.difficulty}
                      onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                    >
                      <SelectTrigger id="difficulty">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="points">Points</Label>
                    <Input
                      id="points"
                      type="number"
                      placeholder="e.g. 100"
                      value={formData.points}
                      onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="creditPrice">Credit Price (0 = Free)</Label>
                    <Input
                      id="creditPrice"
                      type="number"
                      placeholder="e.g. 10"
                      value={formData.creditPrice}
                      onChange={(e) => setFormData({ ...formData, creditPrice: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Applicable Departments</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Computer Science",
                        "Data Science",
                        "Electrical Engineering",
                        "Mechanical Engineering",
                        "Business Administration",
                        "Industrial Engineering",
                        "Design",
                        "Civil Engineering",
                      ].map((dept) => (
                        <div key={dept} className="flex items-center space-x-2">
                          <Checkbox
                            id={`dept-${dept}`}
                            checked={formData.departments.includes(dept)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({
                                  ...formData,
                                  departments: [...formData.departments, dept],
                                })
                              } else {
                                setFormData({
                                  ...formData,
                                  departments: formData.departments.filter((d) => d !== dept),
                                })
                              }
                            }}
                          />
                          <Label htmlFor={`dept-${dept}`} className="text-sm">
                            {dept}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Task Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the task in detail"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="requirements">Requirements (one per line)</Label>
                  <Textarea
                    id="requirements"
                    placeholder="List the requirements for the task"
                    rows={5}
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="deliverables">Deliverables (one per line)</Label>
                  <Textarea
                    id="deliverables"
                    placeholder="List the deliverables for the task"
                    rows={3}
                    value={formData.deliverables}
                    onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button className="bg-orange-600 hover:bg-orange-700" onClick={handleCreateTask}>
                  Create Task
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {tasks.map((task) => (
            <Card key={task.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{task.title}</CardTitle>
                    <CardDescription className="mt-1">Created on {formatDate(task.createdAt)}</CardDescription>
                  </div>
                  <Badge className={getDifficultyColor(task.difficulty)}>{task.difficulty}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Requirements</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {task.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Deliverables</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {task.deliverables.map((del, index) => (
                        <li key={index}>{del}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {task.departments.map((dept) => (
                    <Badge key={dept} variant="outline" className="text-xs">
                      {dept}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t pt-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1" onClick={() => openEditDialog(task)}>
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 text-red-600 hover:text-red-600 hover:bg-red-50"
                    onClick={() => openDeleteDialog(task)}
                  >
                    <Trash className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{task.points} points</span>
                  </div>
                  {task.creditPrice > 0 ? (
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-950/20 dark:text-blue-400">
                      {task.creditPrice} credits
                    </Badge>
                  ) : (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-950/20 dark:text-green-400">
                      Free
                    </Badge>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit Task Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>Update the task details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Task Title</Label>
              <Input
                id="edit-title"
                placeholder="Enter a descriptive title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-difficulty">Difficulty Level</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                >
                  <SelectTrigger id="edit-difficulty">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-points">Points</Label>
                <Input
                  id="edit-points"
                  type="number"
                  placeholder="e.g. 100"
                  value={formData.points}
                  onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-creditPrice">Credit Price (0 = Free)</Label>
                <Input
                  id="edit-creditPrice"
                  type="number"
                  placeholder="e.g. 10"
                  value={formData.creditPrice}
                  onChange={(e) => setFormData({ ...formData, creditPrice: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Applicable Departments</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Computer Science",
                    "Data Science",
                    "Electrical Engineering",
                    "Mechanical Engineering",
                    "Business Administration",
                    "Industrial Engineering",
                    "Design",
                    "Civil Engineering",
                  ].map((dept) => (
                    <div key={dept} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-dept-${dept}`}
                        checked={formData.departments.includes(dept)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({
                              ...formData,
                              departments: [...formData.departments, dept],
                            })
                          } else {
                            setFormData({
                              ...formData,
                              departments: formData.departments.filter((d) => d !== dept),
                            })
                          }
                        }}
                      />
                      <Label htmlFor={`edit-dept-${dept}`} className="text-sm">
                        {dept}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Task Description</Label>
              <Textarea
                id="edit-description"
                placeholder="Describe the task in detail"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-requirements">Requirements (one per line)</Label>
              <Textarea
                id="edit-requirements"
                placeholder="List the requirements for the task"
                rows={5}
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-deliverables">Deliverables (one per line)</Label>
              <Textarea
                id="edit-deliverables"
                placeholder="List the deliverables for the task"
                rows={3}
                value={formData.deliverables}
                onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700" onClick={handleEditTask}>
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
              This will permanently delete the task "{currentTask?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDeleteTask}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
