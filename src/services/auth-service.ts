import { User } from "@/types";
import connectToDatabase from "@/lib/db";
import UserModel from "@/models/User";
import mongoose from "mongoose";

// Simulate API delay for development
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class AuthService {
  async getCurrentUser(): Promise<User | null> {
    // This would typically check a JWT token or session
    // For now, we'll return null as we're transitioning to MongoDB
    return null;
  }

  async login(email: string, password: string): Promise<User> {
    try {
      await connectToDatabase();
      
      const user = await UserModel.findOne({ email }).lean();
      
      if (!user) {
        throw new Error('User not found. Please check your email or register.');
      }
      
      // In a real app, you would hash the password and compare
      if (password !== user.password) {
        throw new Error('Invalid password');
      }
      
      // Convert MongoDB _id to id for frontend compatibility
      const userWithId = {
        ...user,
        id: user._id.toString()
      };
      
      delete userWithId._id;
      delete userWithId.password;
      
      return userWithId as User;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }
  
  async register(email: string, password: string, name?: string, role: "student" | "admin" = "student"): Promise<User> {
    try {
      await connectToDatabase();
      
      // Check if user already exists
      const existingUser = await UserModel.findOne({ email });
      
      if (existingUser) {
        throw new Error('A user with this email already exists.');
      }
      
      // Create new user
      const newUser = await UserModel.create({
        email,
        password, // In a real app, you would hash the password
        name: name || '',
        role,
        profileImageUrl: ""
      });
      
      // Convert MongoDB _id to id for frontend compatibility
      const userWithId = {
        ...newUser.toObject(),
        id: newUser._id.toString()
      };
      
      delete userWithId._id;
      delete userWithId.password;
      
      return userWithId as User;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }
  
  async logout(): Promise<void> {
    // In a real app, you would invalidate the token on the server
    await delay(300); // Simulate API call for development
  }
  
  async updateUser(updatedUser: User): Promise<User> {
    try {
      await connectToDatabase();
      
      const userId = updatedUser.id;
      
      // Remove id field and prepare update data
      const { id, ...updateData } = updatedUser;
      
      // Update user in database
      const user = await UserModel.findByIdAndUpdate(
        userId,
        updateData,
        { new: true }
      ).lean();
      
      if (!user) {
        throw new Error('User not found');
      }
      
      // Convert MongoDB _id to id for frontend compatibility
      const userWithId = {
        ...user,
        id: user._id.toString()
      };
      
      delete userWithId._id;
      delete userWithId.password;
      
      return userWithId as User;
    } catch (error) {
      console.error("Update user error:", error);
      throw error;
    }
  }
}

export const authService = new AuthService();