
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { User, PlusCircle, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white">KLH</span>
          <span className="text-xl font-medium">Lost & Found</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/lost-items" className="text-sm font-medium text-white hover:text-blue-200 transition-colors">
            Lost Items
          </Link>
          <Link to="/found-items" className="text-sm font-medium text-white hover:text-blue-200 transition-colors">
            Found Items
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/submit-item">
                <Button size="sm" className="hidden md:flex bg-white text-blue-700 hover:bg-blue-100">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Submit Item
                </Button>
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1 bg-white text-blue-700 border-white hover:bg-blue-100">
                    <User className="h-4 w-4" />
                    {user.name ? user.name.split(' ')[0] : 'Account'}
                    <ChevronDown className="h-3 w-3 ml-1 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                      {user.role && (
                        <div className="mt-1">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            user.role === 'admin' 
                              ? 'bg-secondary/50 text-secondary-foreground' 
                              : 'bg-primary/10 text-primary'
                          }`}>
                            {user.role === 'admin' ? 'Admin' : 'Student'}
                          </span>
                        </div>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer w-full">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer w-full">Profile Settings</Link>
                  </DropdownMenuItem>
                  {user.role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="cursor-pointer w-full">Admin Panel</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()} className="cursor-pointer">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm" className="bg-white text-blue-700 hover:bg-blue-100">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
              <Link to="/register">
                  <Button size="sm" className="bg-blue-100 text-blue-700 hover:bg-blue-200 ml-2">Sign Up</Button>
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
