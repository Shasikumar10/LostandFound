
import { User } from "@/types";

// This is a mock authentication service
// In a real application, this would be replaced with Supabase auth

const STORAGE_KEY = "klh_user";

const mockUsers: User[] = [
  {
    id: "1",
    email: "123456@klh.edu.in",
    name: "Student User",
    role: "student"
  },
  {
    id: "2",
    email: "admin@klh.edu.in",
    name: "Admin User",
    role: "admin"
  }
];

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      throw new Error("Invalid credentials");
    }
    
    // In a real auth system, we would verify the password here
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    
    return user;
  },
  
  register: async (email: string, password: string, name?: string, role: "student" | "admin" = "student"): Promise<User> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validate email format based on role
    if (role === "student" && !email.match(/^[0-9]+@klh\.edu\.in$/)) {
      throw new Error("Student email must be in format: roll_no@klh.edu.in");
    } else if (role === "admin" && !email.match(/^[a-zA-Z]+@klh\.edu\.in$/)) {
      throw new Error("Admin email must be in format: name@klh.edu.in");
    }
    
    if (mockUsers.some(u => u.email === email)) {
      throw new Error("User already exists");
    }
    
    const newUser: User = {
      id: String(mockUsers.length + 1),
      email,
      name,
      role
    };
    
    mockUsers.push(newUser);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    
    return newUser;
  },
  
  logout: async (): Promise<void> => {
    localStorage.removeItem(STORAGE_KEY);
  },
  
  getCurrentUser: (): User | null => {
    const userJson = localStorage.getItem(STORAGE_KEY);
    
    if (!userJson) {
      return null;
    }
    
    try {
      return JSON.parse(userJson) as User;
    } catch {
      return null;
    }
  },

  updateUser: (updatedUser: User): User => {
    // Update user in mock database
    const userIndex = mockUsers.findIndex(u => u.id === updatedUser.id);
    if (userIndex >= 0) {
      mockUsers[userIndex] = updatedUser;
    }
    
    // Update in local storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    
    return updatedUser;
  },
  
  validateEmail: (email: string, role: "student" | "admin"): boolean => {
    if (role === "student") {
      return /^[0-9]+@klh\.edu\.in$/.test(email);
    } else if (role === "admin") {
      return /^[a-zA-Z]+@klh\.edu\.in$/.test(email);
    }
    return false;
  }
};
