
import { Link } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, AlertCircle, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <NavBar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <div className="mb-6">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
              <span className="block text-primary">KLH Lost and Found</span>
            </h1>
            <p className="mt-4 max-w-md mx-auto text-lg text-gray-600 md:mt-6 md:text-xl md:max-w-3xl">
              The campus lost and found system helps you find your lost items or report found ones.
            </p>
          </div>
          
          <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold text-center mb-6">Login Form</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your password"
                />
              </div>
              <Button className="w-full py-6">
                Login <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-center text-sm text-gray-600 mt-4">
                Don't have an account? <Link to="/register" className="text-primary font-medium">Register</Link>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-primary/10 rounded-t-lg">
              <CardTitle className="text-primary">Report Lost Item</CardTitle>
              <CardDescription>Submit details about your lost item</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-600">
                Provide information about your lost item including when and where you last saw it.
                Our system will help match it with found items.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/submit-item?type=lost" className="w-full">
                <Button className="w-full">Report Lost Item</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-primary/10 rounded-t-lg">
              <CardTitle className="text-primary">Report Found Item</CardTitle>
              <CardDescription>Submit details about an item you found</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-600">
                If you've found an item, submit its details here. 
                Our system will try to match it with reported lost items.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/submit-item?type=found" className="w-full">
                <Button className="w-full">Report Found Item</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-primary/10 rounded-t-lg">
              <CardTitle className="text-primary">Check Dashboard</CardTitle>
              <CardDescription>View your submitted items and matches</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-600">
                Track the status of your submitted items and see potential matches
                in your personalized dashboard.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/dashboard" className="w-full">
                <Button className="w-full">Go to Dashboard</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
