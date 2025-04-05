
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/NavBar";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1">
        <section className="py-20 px-4 bg-gradient-to-b from-klh-lightblue to-white">
          <div className="container mx-auto text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-klh-blue mb-6">
              Find What You've Lost, Return What You've Found
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              KLH Lost & Found uses advanced AI technology to match lost items with those that have been found, making the process of recovering your belongings easier and faster.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/submit">
                <Button size="lg" className="w-full sm:w-auto">
                  Report an Item
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid md:grid-cols-3 gap-10">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-klh-lightblue rounded-full text-klh-blue text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Submit Your Item</h3>
                <p className="text-gray-600">
                  Report a lost or found item with a detailed description, photo, and location.
                </p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-klh-lightblue rounded-full text-klh-blue text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Matching</h3>
                <p className="text-gray-600">
                  Our advanced AI algorithm identifies potential matches between lost and found items.
                </p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-klh-lightblue rounded-full text-klh-blue text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Connected</h3>
                <p className="text-gray-600">
                  Receive notifications about potential matches and reconnect with your belongings.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-8 bg-gray-100">
        <div className="container mx-auto text-center text-gray-600">
          <p>© 2025 KLH Lost & Found. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
