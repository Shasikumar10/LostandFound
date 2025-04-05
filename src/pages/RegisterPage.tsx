
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavBar } from "@/components/NavBar";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserCircle2, School, UserCog, Mail, Lock, User } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [role, setRole] = useState<"student" | "admin">("student");
  
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Validate email format based on selected role
    if (email) {
      if (role === "student" && !email.match(/^[0-9]+@klh\.edu\.in$/)) {
        setEmailError("Student email must be in format: roll_no@klh.edu.in");
      } else if (role === "admin" && !email.match(/^[a-zA-Z]+@klh\.edu\.in$/)) {
        setEmailError("Admin email must be in format: name@klh.edu.in");
      } else {
        setEmailError("");
      }
    } else {
      setEmailError("");
    }
  }, [email, role]);

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validatePasswords() || emailError) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      await register(email, password, name, role);
      navigate("/dashboard");
    } catch (error) {
      // Error is already handled in the context
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRoleChange = (value: string) => {
    setRole(value as "student" | "admin");
    setEmail(""); // Clear email when changing roles for fresh input
    setEmailError("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted">
      <NavBar />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg border-primary/10">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-primary">Create an account</CardTitle>
            <CardDescription>
              Choose your role and enter your details to create a new account
            </CardDescription>
          </CardHeader>
          
          <Tabs defaultValue="student" className="w-full" onValueChange={handleRoleChange}>
            <TabsList className="grid grid-cols-2 mb-4 mx-4">
              <TabsTrigger value="student" className="flex items-center gap-2">
                <School className="h-4 w-4" /> Student
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <UserCog className="h-4 w-4" /> Admin
              </TabsTrigger>
            </TabsList>
          
            <TabsContent value="student" className="mt-0">
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Roll Number Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="123456@klh.edu.in"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`pl-10 ${emailError ? "border-destructive" : ""}`}
                        required
                      />
                    </div>
                    {emailError ? (
                      <p className="text-xs text-destructive">{emailError}</p>
                    ) : (
                      <p className="text-xs text-muted-foreground">Format: roll_no@klh.edu.in</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`pl-10 ${passwordError ? "border-destructive" : ""}`}
                        required
                      />
                    </div>
                    {passwordError && (
                      <p className="text-xs text-destructive">{passwordError}</p>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col space-y-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-klh-blue to-blue-500 hover:from-blue-600 hover:to-klh-blue" 
                    disabled={isSubmitting || !!passwordError || !!emailError}
                  >
                    {isSubmitting ? "Creating account..." : "Register as Student"}
                  </Button>
                  
                  <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link 
                      to="/login" 
                      className="text-klh-blue hover:underline font-medium"
                    >
                      Log in
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="admin" className="mt-0">
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="admin-name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="admin-email"
                        type="email"
                        placeholder="name@klh.edu.in"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`pl-10 ${emailError ? "border-destructive" : ""}`}
                        required
                      />
                    </div>
                    {emailError ? (
                      <p className="text-xs text-destructive">{emailError}</p>
                    ) : (
                      <p className="text-xs text-muted-foreground">Format: name@klh.edu.in</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="admin-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="admin-confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="admin-confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`pl-10 ${passwordError ? "border-destructive" : ""}`}
                        required
                      />
                    </div>
                    {passwordError && (
                      <p className="text-xs text-destructive">{passwordError}</p>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col space-y-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-secondary to-green-600 hover:from-green-600 hover:to-secondary" 
                    disabled={isSubmitting || !!passwordError || !!emailError}
                  >
                    {isSubmitting ? "Creating account..." : "Register as Admin"}
                  </Button>
                  
                  <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link 
                      to="/login" 
                      className="text-klh-blue hover:underline font-medium"
                    >
                      Log in
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
    </div>
  );
}
