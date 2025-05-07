import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, GraduationCap, ShieldCheck, TrendingUp, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b">
        <div className="container flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            {/* <TrendingUp className="h-6 w-6 text-orange-600" />
            <span className="text-xl font-bold">SkillBridge</span> */}
            <img src="/logo.png" alt="" className="w-36" />
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className=" font-medium hover:text-orange-600 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className=" font-medium hover:text-orange-600 transition-colors">
              How It Works
            </Link>
            <Link href="#dashboards" className=" font-medium hover:text-orange-600 transition-colors">
              Dashboards
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Bridging the gap between{" "}
              <span className="bg-gradient-to-br from-orange-500 via-orange-300 to-orange-400 bg-clip-text text-transparent">
                education
              </span>{" "}
              and{" "}
              <span className="bg-gradient-to-br from-orange-500 via-orange-300 to-orange-400 bg-clip-text text-transparent">
                industry
              </span>
            </h1>
            <p className="text-lg text-gray-600">
              Connect universities, students, and industry partners on a single platform to solve real-world problems
              and build industry-relevant skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard/student">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 w-full sm:w-auto">
                  Access Dashboards
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg bg-gray-100 overflow-hidden">
            <img
              src='/Background.png'
              alt="SkillBridge Platform"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Dashboards Section */}
      <section id="dashboards" className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Access Dashboards</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore the different dashboards available for each role in the SkillBridge platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Student Dashboard</CardTitle>
                <CardDescription>Access problems, track progress, and view leaderboards</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard/student">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">Access</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>University Dashboard</CardTitle>
                <CardDescription>Monitor students, departments, and problem completion</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard/university">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">Access</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Industry Dashboard</CardTitle>
                <CardDescription>Post problems, review submissions, and find talent</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard/industry">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">Access</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Admin Dashboard</CardTitle>
                <CardDescription>Manage all aspects of the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard/admin">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">Access</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
        <div className="container">
          <div className="flex items-center justify-center gap-2 mb-8">
            <TrendingUp className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold text-white">SkillBridge</span>
          </div>
          <div className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} SkillBridge. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
