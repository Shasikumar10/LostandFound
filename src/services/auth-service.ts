
import { User } from "@/types";

// This is a mock authentication service
// In a real application, this would be replaced with Supabase auth

const STORAGE_KEY = "klh_user";

const mockUsers: User[] = [
  {
    id: "1",
    email: "demo@example.com",
    name: "Demo User"
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
  
  register: async (email: string, password: string, name?: string): Promise<User> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (mockUsers.some(u => u.email === email)) {
      throw new Error("User already exists");
    }
    
    const newUser: User = {
      id: String(mockUsers.length + 1),
      email,
      name
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
  }
};
