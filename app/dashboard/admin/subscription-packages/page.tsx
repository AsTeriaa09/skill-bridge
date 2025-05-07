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
import { Clock, CreditCard, Edit, PlusCircle, Trash } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function SubscriptionPackagesPage() {
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: "Basic University Package",
      creditLimit: 100,
      duration: "monthly",
      price: 199,
      description: "Starter package for small universities with limited departments.",
      status: "active",
    },
    {
      id: 2,
      name: "Standard University Package",
      creditLimit: 250,
      duration: "monthly",
      price: 399,
      description: "Standard package for medium-sized universities with multiple departments.",
      status: "active",
    },
    {
      id: 3,
      name: "Premium University Package",
      creditLimit: 500,
      duration: "quarterly",
      price: 999,
      description: "Premium package for large universities with many departments and students.",
      status: "active",
    },
    {
      id: 4,
      name: "Enterprise University Package",
      creditLimit: 1000,
      duration: "quarterly",
      price: 1799,
      description: "Enterprise solution for the largest universities with unlimited access to premium tasks.",
      status: "active",
    },
  ])

  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [currentPackage, setCurrentPackage] = useState<any>(null)

  // Form state for create/edit
  const [formData, setFormData] = useState({
    name: "",
    creditLimit: "",
    duration: "monthly",
    price: "",
    description: "",
  })

  const handleCreatePackage = () => {
    // Validate form data
    if (!formData.name || !formData.creditLimit || !formData.price) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Create new package
    const newPackage = {
      id: packages.length + 1,
      name: formData.name,
      creditLimit: Number.parseInt(formData.creditLimit),
      duration: formData.duration,
      price: Number.parseFloat(formData.price),
      description: formData.description,
      status: "active",
    }

    setPackages([...packages, newPackage])

    // Reset form
    setFormData({
      name: "",
      creditLimit: "",
      duration: "monthly",
      price: "",
      description: "",
    })

    toast({
      title: "Package Created",
      description: `${newPackage.name} has been created successfully.`,
    })
  }

  const handleEditPackage = () => {
    if (!currentPackage) return

    // Validate form data
    if (!formData.name || !formData.creditLimit || !formData.price) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Update package
    const updatedPackages = packages.map((pkg) =>
      pkg.id === currentPackage.id
        ? {
            ...pkg,
            name: formData.name,
            creditLimit: Number.parseInt(formData.creditLimit),
            duration: formData.duration,
            price: Number.parseFloat(formData.price),
            description: formData.description,
          }
        : pkg,
    )

    setPackages(updatedPackages)
    setEditDialogOpen(false)

    toast({
      title: "Package Updated",
      description: `${formData.name} has been updated successfully.`,
    })
  }

  const handleDeletePackage = () => {
    if (!currentPackage) return

    // Delete package (in a real app, you might want to soft delete or archive)
    const updatedPackages = packages.filter((pkg) => pkg.id !== currentPackage.id)
    setPackages(updatedPackages)
    setDeleteDialogOpen(false)

    toast({
      title: "Package Deleted",
      description: `${currentPackage.name} has been deleted.`,
    })
  }

  const openEditDialog = (pkg: any) => {
    setCurrentPackage(pkg)
    setFormData({
      name: pkg.name,
      creditLimit: pkg.creditLimit.toString(),
      duration: pkg.duration,
      price: pkg.price.toString(),
      description: pkg.description,
    })
    setEditDialogOpen(true)
  }

  const openDeleteDialog = (pkg: any) => {
    setCurrentPackage(pkg)
    setDeleteDialogOpen(true)
  }

  const formatDuration = (duration: string) => {
    switch (duration) {
      case "monthly":
        return "Monthly"
      case "quarterly":
        return "Quarterly (3 months)"
      case "biannual":
        return "Bi-annual (6 months)"
      case "annual":
        return "Annual (12 months)"
      default:
        return duration
    }
  }

  return (
    <div>
      <DashboardHeader title="Subscription Packages" />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Manage Subscription Packages</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                <PlusCircle className="h-4 w-4" />
                Create New Package
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Subscription Package</DialogTitle>
                <DialogDescription>
                  Create a new subscription package for universities to purchase credits.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Package Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g. Basic University Package"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="creditLimit">Credit Limit</Label>
                    <Input
                      id="creditLimit"
                      type="number"
                      placeholder="e.g. 100"
                      value={formData.creditLimit}
                      onChange={(e) => setFormData({ ...formData, creditLimit: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="e.g. 199.99"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select
                    value={formData.duration}
                    onValueChange={(value) => setFormData({ ...formData, duration: value })}
                  >
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly (3 months)</SelectItem>
                      <SelectItem value="biannual">Bi-annual (6 months)</SelectItem>
                      <SelectItem value="annual">Annual (12 months)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter package description"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleCreatePackage}>
                  Create Package
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {packages.map((pkg) => (
            <Card key={pkg.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{pkg.name}</CardTitle>
                    <CardDescription className="mt-1">{formatDuration(pkg.duration)}</CardDescription>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400">
                    {pkg.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">{pkg.creditLimit.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Credit Limit</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">{formatDuration(pkg.duration)}</div>
                      <div className="text-xs text-muted-foreground">Duration</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t pt-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1" onClick={() => openEditDialog(pkg)}>
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 text-red-600 hover:text-red-600 hover:bg-red-50"
                    onClick={() => openDeleteDialog(pkg)}
                  >
                    <Trash className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
                <div className="text-xl font-bold">${pkg.price.toLocaleString()}</div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit Package Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Subscription Package</DialogTitle>
            <DialogDescription>Update the subscription package details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Package Name</Label>
              <Input
                id="edit-name"
                placeholder="e.g. Basic University Package"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-creditLimit">Credit Limit</Label>
                <Input
                  id="edit-creditLimit"
                  type="number"
                  placeholder="e.g. 100"
                  value={formData.creditLimit}
                  onChange={(e) => setFormData({ ...formData, creditLimit: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-price">Price ($)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  placeholder="e.g. 199.99"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-duration">Duration</Label>
              <Select
                value={formData.duration}
                onValueChange={(value) => setFormData({ ...formData, duration: value })}
              >
                <SelectTrigger id="edit-duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly (3 months)</SelectItem>
                  <SelectItem value="biannual">Bi-annual (6 months)</SelectItem>
                  <SelectItem value="annual">Annual (12 months)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                placeholder="Enter package description"
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
            <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleEditPackage}>
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
              This will permanently delete the subscription package "{currentPackage?.name}". This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDeletePackage}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
