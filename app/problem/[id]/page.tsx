"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Building2, Clock, Download, FileText, Upload, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

export default function ProblemDetail() {
  const [activeTab, setActiveTab] = useState("description")

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/student">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">E-commerce Recommendation Algorithm</h1>
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Active</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Save Draft
            </Button>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              Submit Solution
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Tabs defaultValue="description" className="space-y-4" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="description">Problem Description</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="submission">Submission</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Problem Overview</CardTitle>
                    <CardDescription>Posted by TechCorp Inc. • 2 weeks ago</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      E-commerce platforms rely heavily on recommendation systems to enhance user experience and
                      increase sales. In this problem, you will design and implement a recommendation algorithm for an
                      e-commerce platform that suggests products based on user browsing history and purchase patterns.
                    </p>
                    <p>
                      The algorithm should be able to analyze user behavior data, identify patterns, and make
                      personalized product recommendations. The goal is to improve the relevance of product suggestions,
                      which can lead to higher conversion rates and customer satisfaction.
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                      <Badge variant="outline">Computer Science</Badge>
                      <Badge variant="outline">Data Science</Badge>
                      <Badge variant="outline">Machine Learning</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Background</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      Recommendation systems are a subclass of information filtering systems that seek to predict the
                      "rating" or "preference" a user would give to an item. They are primarily used in commercial
                      applications.
                    </p>
                    <p>There are several approaches to building recommendation systems:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        Collaborative filtering: Based on collecting and analyzing information on user behaviors,
                        activities, preferences, and predicting what users will like based on their similarity to other
                        users.
                      </li>
                      <li>
                        Content-based filtering: Based on a description of the item and a profile of the user's
                        preferences.
                      </li>
                      <li>Hybrid approaches: Combining collaborative filtering and content-based filtering.</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requirements" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-6 space-y-3">
                      <li>
                        Implement a recommendation algorithm using Python, R, or any other suitable programming
                        language.
                      </li>
                      <li>
                        The algorithm should be able to process user behavior data (browsing history, purchase history,
                        product ratings) and generate personalized product recommendations.
                      </li>
                      <li>
                        Include data preprocessing steps to handle missing values, outliers, and feature engineering.
                      </li>
                      <li>
                        Implement at least two different recommendation approaches (e.g., collaborative filtering,
                        content-based filtering, or a hybrid approach).
                      </li>
                      <li>
                        Evaluate the performance of your algorithm using appropriate metrics (e.g., precision, recall,
                        F1-score, RMSE).
                      </li>
                      <li>Provide a simple API or interface to demonstrate how your algorithm works.</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Deliverables</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-6 space-y-3">
                      <li>Source code with clear documentation.</li>
                      <li>A report (maximum 5 pages) explaining your approach, methodology, and results.</li>
                      <li>A presentation (maximum 10 slides) summarizing your solution.</li>
                      <li>A demo or API to showcase your recommendation system in action.</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Evaluation Criteria</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-6 space-y-3">
                      <li>Correctness and effectiveness of the recommendation algorithm (40%)</li>
                      <li>Code quality and documentation (20%)</li>
                      <li>Innovation and creativity in approach (15%)</li>
                      <li>Performance and scalability considerations (15%)</li>
                      <li>Presentation and communication of results (10%)</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Dataset</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      We provide a sample dataset containing user behavior data from an e-commerce platform. The dataset
                      includes:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>User profiles (age, gender, location)</li>
                      <li>Product catalog (product ID, category, price, description)</li>
                      <li>User browsing history (user ID, product ID, timestamp, view duration)</li>
                      <li>Purchase history (user ID, product ID, timestamp, quantity, price)</li>
                      <li>Product ratings (user ID, product ID, rating, timestamp)</li>
                    </ul>
                    <div className="flex items-center gap-2 mt-4">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Download Dataset (CSV)
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Download Dataset (JSON)
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Helpful Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-6 space-y-3">
                      <li>
                        <a href="#" className="text-emerald-600 hover:underline">
                          Introduction to Recommendation Systems
                        </a>{" "}
                        - A comprehensive guide to recommendation systems.
                      </li>
                      <li>
                        <a href="#" className="text-emerald-600 hover:underline">
                          Collaborative Filtering Tutorial
                        </a>{" "}
                        - Step-by-step tutorial on implementing collaborative filtering.
                      </li>
                      <li>
                        <a href="#" className="text-emerald-600 hover:underline">
                          Content-Based Filtering with Python
                        </a>{" "}
                        - Guide to implementing content-based filtering using Python.
                      </li>
                      <li>
                        <a href="#" className="text-emerald-600 hover:underline">
                          Evaluation Metrics for Recommendation Systems
                        </a>{" "}
                        - Overview of metrics used to evaluate recommendation systems.
                      </li>
                      <li>
                        <a href="#" className="text-emerald-600 hover:underline">
                          Sample Code Repository
                        </a>{" "}
                        - GitHub repository with sample code and examples.
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="submission" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Submit Your Solution</CardTitle>
                    <CardDescription>Upload your files and provide a description of your solution</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <div className="flex justify-center mb-4">
                        <Upload className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Drag and drop your files here, or click to browse</p>
                      <p className="text-xs text-gray-500">
                        Supports ZIP, PDF, Python, Jupyter Notebook, and other code files (Max 50MB)
                      </p>
                      <Button variant="outline" size="sm" className="mt-4">
                        Browse Files
                      </Button>
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium mb-2">
                        Solution Description
                      </label>
                      <Textarea
                        id="description"
                        placeholder="Describe your approach, methodology, and any challenges you faced..."
                        rows={6}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Save as Draft</Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">Submit Solution</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Problem Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium">Posted by</div>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder.svg?height=24&width=24" alt="TechCorp" />
                          <AvatarFallback>TC</AvatarFallback>
                        </Avatar>
                        <span>TechCorp Inc.</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium">Deadline</div>
                      <div>June 15, 2023 (3 weeks remaining)</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium">Difficulty</div>
                      <div>Intermediate</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium">Participation</div>
                      <div>15 students working on this</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-1">Status</div>
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">In Progress</Badge>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-1">Last Updated</div>
                    <div className="text-sm">May 25, 2023 (2 days ago)</div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-1">Time Spent</div>
                    <div className="text-sm">8 hours 45 minutes</div>
                  </div>

                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      View Draft
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  If you have any questions or need clarification about this problem, you can contact the industry
                  partner or your university mentor.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Contact Industry Partner
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Ask University Mentor
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
