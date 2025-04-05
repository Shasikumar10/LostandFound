
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { User, Search, PlusCircle } from "lucide-react";

export function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-klh-blue">KLH</span>
          <span className="text-xl font-medium">Lost & Found</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/lost" className="text-sm font-medium hover:text-klh-blue transition-colors">
            Lost Items
          </Link>
          <Link to="/found" className="text-sm font-medium hover:text-klh-blue transition-colors">
            Found Items
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/submit">
                <Button size="sm" className="hidden md:flex">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Submit Item
                </Button>
              </Link>
              
              <div className="flex items-center space-x-2">
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm">
                    Dashboard
                  </Button>
                </Link>
                
                <Link to="/profile">
                  <Button variant="outline" size="sm" className="p-2">
                    <User className="h-4 w-4" />
                  </Button>
                </Link>
                
                <Button variant="ghost" size="sm" onClick={() => logout()}>
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile navigation for Lost/Found */}
      <div className="md:hidden border-t">
        <div className="container mx-auto grid grid-cols-2 gap-0">
          <Link 
            to="/lost" 
            className="text-center py-3 font-medium hover:bg-gray-50 transition-colors"
          >
            Lost Items
          </Link>
          <Link 
            to="/found" 
            className="text-center py-3 font-medium hover:bg-gray-50 transition-colors border-l"
          >
            Found Items
          </Link>
        </div>
      </div>
    </nav>
  );
}
