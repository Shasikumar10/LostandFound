
import { Item, ItemLocation, ItemMatch, ItemStatus, MatchStatus } from "@/types";

// This is a mock item service
// In a real application, this would be replaced with Supabase or API calls

const ITEMS_STORAGE_KEY = "klh_items";
const MATCHES_STORAGE_KEY = "klh_matches";

// Load items from localStorage or use empty array as default
const loadItems = (): Item[] => {
  const itemsJson = localStorage.getItem(ITEMS_STORAGE_KEY);
  if (!itemsJson) return [];
  
  try {
    const items = JSON.parse(itemsJson) as Item[];
    // Convert string dates back to Date objects
    return items.map(item => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt)
    }));
  } catch {
    return [];
  }
};

// Load matches from localStorage or use empty array as default
const loadMatches = (): ItemMatch[] => {
  const matchesJson = localStorage.getItem(MATCHES_STORAGE_KEY);
  if (!matchesJson) return [];
  
  try {
    const matches = JSON.parse(matchesJson) as ItemMatch[];
    // Convert string dates back to Date objects
    return matches.map(match => ({
      ...match,
      createdAt: new Date(match.createdAt)
    }));
  } catch {
    return [];
  }
};

// Save items to localStorage
const saveItems = (items: Item[]) => {
  localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
};

// Save matches to localStorage
const saveMatches = (matches: ItemMatch[]) => {
  localStorage.setItem(MATCHES_STORAGE_KEY, JSON.stringify(matches));
};

// Mock function for AI similarity calculation
const calculateSimilarity = (item1: Item, item2: Item): number => {
  // In a real AI system, this would use image and text embeddings to calculate similarity
  
  // Simple mock implementation:
  // 1. Category match: 0.4
  // 2. Words in title match: up to 0.3
  // 3. Words in description match: up to 0.3
  
  let similarity = 0;
  
  // Category match
  if (item1.category === item2.category) {
    similarity += 0.4;
  }
  
  // Title similarity (crude word matching)
  const title1Words = item1.title.toLowerCase().split(/\s+/);
  const title2Words = item2.title.toLowerCase().split(/\s+/);
  const titleMatches = title1Words.filter(word => title2Words.includes(word)).length;
  const titleSimilarity = Math.min(0.3, 0.3 * (titleMatches / Math.max(title1Words.length, title2Words.length)));
  similarity += titleSimilarity;
  
  // Description similarity (crude word matching)
  const desc1Words = item1.description.toLowerCase().split(/\s+/);
  const desc2Words = item2.description.toLowerCase().split(/\s+/);
  const descMatches = desc1Words.filter(word => desc2Words.includes(word)).length;
  const descSimilarity = Math.min(0.3, 0.3 * (descMatches / Math.max(desc1Words.length, desc2Words.length)));
  similarity += descSimilarity;
  
  return similarity;
};

export const itemService = {
  getItems: async (userId?: string): Promise<Item[]> => {
    const items = loadItems();
    
    if (userId) {
      return items.filter(item => item.userId === userId);
    }
    
    return items;
  },
  
  getItem: async (id: string): Promise<Item | null> => {
    const items = loadItems();
    return items.find(item => item.id === id) || null;
  },
  
  createItem: async (
    userId: string,
    title: string,
    description: string,
    status: ItemStatus,
    category: string,
    location: ItemLocation,
    imageUrl?: string
  ): Promise<Item> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const items = loadItems();
    
    const newItem: Item = {
      id: crypto.randomUUID(),
      userId,
      title,
      description,
      status,
      category,
      location,
      imageUrl,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    items.push(newItem);
    saveItems(items);
    
    // Process matching if this is a new item
    await itemService.processMatching(newItem);
    
    return newItem;
  },
  
  updateItem: async (
    id: string,
    updates: Partial<Omit<Item, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>
  ): Promise<Item> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const items = loadItems();
    const itemIndex = items.findIndex(item => item.id === id);
    
    if (itemIndex === -1) {
      throw new Error("Item not found");
    }
    
    const updatedItem: Item = {
      ...items[itemIndex],
      ...updates,
      updatedAt: new Date()
    };
    
    items[itemIndex] = updatedItem;
    saveItems(items);
    
    return updatedItem;
  },
  
  deleteItem: async (id: string): Promise<void> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const items = loadItems();
    const filteredItems = items.filter(item => item.id !== id);
    
    if (filteredItems.length === items.length) {
      throw new Error("Item not found");
    }
    
    saveItems(filteredItems);
    
    // Also delete any associated matches
    const matches = loadMatches();
    const filteredMatches = matches.filter(
      match => match.lostItemId !== id && match.foundItemId !== id
    );
    
    saveMatches(filteredMatches);
  },
  
  getMatches: async (userId?: string): Promise<ItemMatch[]> => {
    const matches = loadMatches();
    const items = loadItems();
    
    // Enhance matches with item details
    const enhancedMatches = matches.map(match => {
      const lostItem = items.find(item => item.id === match.lostItemId);
      const foundItem = items.find(item => item.id === match.foundItemId);
      
      return {
        ...match,
        lostItem,
        foundItem
      };
    });
    
    if (userId) {
      // Return matches where either the lost or found item belongs to the user
      return enhancedMatches.filter(
        match => 
          (match.lostItem && match.lostItem.userId === userId) ||
          (match.foundItem && match.foundItem.userId === userId)
      );
    }
    
    return enhancedMatches;
  },
  
  updateMatchStatus: async (
    matchId: string,
    status: MatchStatus
  ): Promise<ItemMatch> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const matches = loadMatches();
    const matchIndex = matches.findIndex(match => match.id === matchId);
    
    if (matchIndex === -1) {
      throw new Error("Match not found");
    }
    
    const updatedMatch: ItemMatch = {
      ...matches[matchIndex],
      status
    };
    
    matches[matchIndex] = updatedMatch;
    saveMatches(matches);
    
    return updatedMatch;
  },
  
  // AI matching logic
  processMatching: async (newItem: Item): Promise<void> => {
    // Simulate network delay for AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const items = loadItems();
    const matches = loadMatches();
    
    // For a lost item, find potential matching found items
    // For a found item, find potential matching lost items
    const potentialMatches = items.filter(item => 
      item.id !== newItem.id && 
      ((newItem.status === ItemStatus.LOST && item.status === ItemStatus.FOUND) ||
       (newItem.status === ItemStatus.FOUND && item.status === ItemStatus.LOST))
    );
    
    for (const potentialMatch of potentialMatches) {
      // Calculate similarity score using AI (mocked here)
      const similarity = calculateSimilarity(newItem, potentialMatch);
      
      // If similarity is above threshold, create a match
      if (similarity > 0.4) {
        const lostItemId = newItem.status === ItemStatus.LOST ? newItem.id : potentialMatch.id;
        const foundItemId = newItem.status === ItemStatus.FOUND ? newItem.id : potentialMatch.id;
        
        // Check if this match already exists
        const existingMatchIndex = matches.findIndex(
          m => m.lostItemId === lostItemId && m.foundItemId === foundItemId
        );
        
        if (existingMatchIndex === -1) {
          // Create new match
          const newMatch: ItemMatch = {
            id: crypto.randomUUID(),
            lostItemId,
            foundItemId,
            status: MatchStatus.PENDING,
            confidence: similarity,
            createdAt: new Date()
          };
          
          matches.push(newMatch);
        } else {
          // Update existing match if needed
          matches[existingMatchIndex].confidence = similarity;
        }
      }
    }
    
    saveMatches(matches);
  }
};
