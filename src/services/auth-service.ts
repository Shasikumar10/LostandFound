import { User } from "@/types";

// Simulate API delay for development
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory user storage for development
const users: Record<string, User & { password: string }> = {};

class AuthService {
  async getCurrentUser(): Promise<User | null> {
    // This would typically check a JWT token or session
    // For now, we'll return null
    return null;
  }

  async login(email: string, password: string): Promise<User> {
    try {
      // Simulate API delay
      await delay(500);
      
      const user = users[email];
      
      if (!user) {
        throw new Error('User not found. Please check your email or register.');
      }
      
      // In a real app, you would hash the password and compare
      if (password !== user.password) {
        throw new Error('Invalid password');
      }
      
      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }
  
  async register(email: string, password: string, name?: string, role: "student" | "admin" = "student"): Promise<User> {
    try {
      // Simulate API delay
      await delay(500);
      
      // Check if user already exists
      if (users[email]) {
        throw new Error('A user with this email already exists.');
      }
      
      // Create new user with random ID
      const id = Math.random().toString(36).substring(2, 15);
      const newUser = {
        id,
        email,
        password,
        name: name || '',
        role,
        profileImageUrl: "",
        bio: "",
        phone: ""
      };
      
      // Store user in memory
      users[email] = newUser;
      
      // Return user without password
      const { password: _, ...userWithoutPassword } = newUser;
      return userWithoutPassword;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    // In a real app, you would invalidate the token or session
    // For now, we'll just simulate a delay
    await delay(300);
  }

  updateUser(updatedUser: User): User {
    try {
      // Simulate API delay
      delay(300);
      
      // Update user in memory if exists
      if (users[updatedUser.email]) {
        const { password } = users[updatedUser.email];
        users[updatedUser.email] = { ...updatedUser, password };
      }
      
      return updatedUser;
    } catch (error) {
      console.error("Update user error:", error);
      throw error;
    }
  }
}

export const authService = new AuthService();