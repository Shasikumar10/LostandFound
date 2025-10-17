import { Item, ItemStatus, Location, Contact, ItemMatch, MatchStatus } from "@/types";
import connectToDatabase from "@/lib/db";
import ItemModel from "@/models/Item";
import ItemMatchModel from "@/models/ItemMatch";
import mongoose from "mongoose";

// Helper function to convert MongoDB _id to id for frontend
const convertDocToItem = (doc: any): Item => {
  const item = doc.toObject ? doc.toObject() : doc;
  return {
    ...item,
    id: item._id.toString(),
    _id: undefined
  };
};

// Helper function to convert MongoDB _id to id for matches
const convertDocToMatch = (doc: any): ItemMatch => {
  const match = doc.toObject ? doc.toObject() : doc;
  return {
    ...match,
    id: match._id.toString(),
    _id: undefined
  };
};

export class ItemService {
  async getItems(userId?: string): Promise<Item[]> {
    try {
      const mongoose = await connectToDatabase();
      
      let query = {};
      if (userId) {
        query = { userId };
      }
      
      const items = await ItemModel.find(query);
      return items.map(convertDocToItem);
    } catch (error) {
      console.error("Error fetching items:", error);
      // Return empty array for now to prevent app from crashing
      return [];
    }
  }
  
  async getItemsByStatus(status: ItemStatus): Promise<Item[]> {
    try {
      const mongoose = await connectToDatabase();
      
      const items = await ItemModel.find({ status });
      return items.map(convertDocToItem);
    } catch (error) {
      console.error("Error fetching items by status:", error);
      return [];
    }
  }
  
  async getItem(itemId: string): Promise<Item | null> {
    try {
      const mongoose = await connectToDatabase();
      
      if (!mongoose.Types.ObjectId.isValid(itemId)) {
        return null;
      }
      
      const item = await ItemModel.findById(itemId);
      return item ? convertDocToItem(item) : null;
    } catch (error) {
      console.error("Error fetching item:", error);
      return null;
    }
  }
  
  async createItem(
    userId: string,
    title: string,
    description: string,
    status: ItemStatus,
    category: string,
    location: Location,
    contact: Contact,
    imageUrl?: string
  ): Promise<Item> {
    try {
      const mongoose = await connectToDatabase();
      
      const newItem = new ItemModel({
        userId,
        title,
        description,
        status,
        category,
        location,
        contact,
        imageUrl
      });
      
      const savedItem = await newItem.save();
      const itemWithId = convertDocToItem(savedItem);
      
      // Check for potential matches
      this.findMatches(itemWithId);
      
      return itemWithId;
    } catch (error) {
      console.error("Error creating item:", error);
      throw error;
    }
  }
  
  async updateItem(itemId: string, updates: Partial<Item>): Promise<Item | null> {
    try {
      const mongoose = await connectToDatabase();
      
      if (!mongoose.Types.ObjectId.isValid(itemId)) {
        return null;
      }
      
      const updatedItem = await ItemModel.findByIdAndUpdate(
        itemId,
        { ...updates, updatedAt: new Date() },
        { new: true }
      );
      
      return updatedItem ? convertDocToItem(updatedItem) : null;
    } catch (error) {
      console.error("Error updating item:", error);
      return null;
    }
  }
  
  async deleteItem(itemId: string): Promise<boolean> {
    try {
      const mongoose = await connectToDatabase();
      
      if (!mongoose.Types.ObjectId.isValid(itemId)) {
        return false;
      }
      
      const result = await ItemModel.findByIdAndDelete(itemId);
      
      if (!result) {
        return false;
      }
      
      // Also delete any matches associated with this item
      await ItemMatchModel.deleteMany({
        $or: [
          { lostItemId: itemId },
          { foundItemId: itemId }
        ]
      });
      
      return true;
    } catch (error) {
      console.error("Error deleting item:", error);
      return false;
    }
  }
  
  async getMatches(userId?: string): Promise<ItemMatch[]> {
    try {
      const mongoose = await connectToDatabase();
      
      if (!userId) {
        const matches = await ItemMatchModel.find({});
        return matches.map(convertDocToMatch);
      }
      
      // Find all items belonging to the user
      const userItems = await ItemModel.find({ userId });
      const userItemIds = userItems.map(item => item._id.toString());
      
      // Find matches that involve any of the user's items
      const matches = await ItemMatchModel.find({
        $or: [
          { lostItemId: { $in: userItemIds } },
          { foundItemId: { $in: userItemIds } }
        ]
      });
      
      return matches.map(convertDocToMatch);
    } catch (error) {
      console.error("Error fetching matches:", error);
      return [];
    }
  }
  
  async updateMatchStatus(matchId: string, status: MatchStatus): Promise<ItemMatch | null> {
    try {
      const mongoose = await connectToDatabase();
      
      if (!mongoose.Types.ObjectId.isValid(matchId)) {
        return null;
      }
      
      const updatedMatch = await ItemMatchModel.findByIdAndUpdate(
        matchId,
        { status, updatedAt: new Date() },
        { new: true }
      );
      
      return updatedMatch ? convertDocToMatch(updatedMatch) : null;
    } catch (error) {
      console.error("Error updating match status:", error);
      return null;
    }
  }
  
  private async findMatches(newItem: Item): Promise<void> {
    try {
      const mongoose = await connectToDatabase();
      
      // Only match lost items with found items
      const itemsToCompare = await ItemModel.find({
        _id: { $ne: newItem.id },
        status: newItem.status === ItemStatus.LOST ? ItemStatus.FOUND : ItemStatus.LOST
      });
      
      for (const item of itemsToCompare) {
        const itemWithId = convertDocToItem(item);
        
        // Calculate match score based on similarity
        const matchScore = this.calculateMatchScore(
          newItem.status === ItemStatus.LOST ? newItem : itemWithId,
          newItem.status === ItemStatus.FOUND ? newItem : itemWithId
        );
        
        // If score is above threshold, create a match
        if (matchScore >= 0.5) {
          const lostItem = newItem.status === ItemStatus.LOST ? newItem : itemWithId;
          const foundItem = newItem.status === ItemStatus.FOUND ? newItem : itemWithId;
          
          // Create a new match
          const newMatch = new ItemMatchModel({
            lostItemId: lostItem.id,
            foundItemId: foundItem.id,
            matchScore,
            status: MatchStatus.PENDING
          });
          
          await newMatch.save();
        }
      }
    } catch (error) {
      console.error("Error finding matches:", error);
    }
  }
  
  private calculateMatchScore(item1: Item, item2: Item): number {
    // Simple matching algorithm based on category and title similarity
    let score = 0;
    
    // Same category is a good indicator
    if (item1.category.toLowerCase() === item2.category.toLowerCase()) {
      score += 0.3;
    }
    
    // Check title similarity
    const title1Words = item1.title.toLowerCase().split(/\s+/);
    const title2Words = item2.title.toLowerCase().split(/\s+/);
    
    const commonWords = title1Words.filter(word => 
      word.length > 3 && title2Words.includes(word)
    );
    
    if (commonWords.length > 0) {
      score += 0.4 * (commonWords.length / Math.max(title1Words.length, title2Words.length));
    }
    
    // Check location similarity
    if (item1.location.name.toLowerCase().includes(item2.location.name.toLowerCase()) ||
        item2.location.name.toLowerCase().includes(item1.location.name.toLowerCase())) {
      score += 0.3;
    }
    
    return score;
  }
}

export const itemService = new ItemService();