
export enum ItemStatus {
  LOST = "lost",
  FOUND = "found"
}

export enum MatchStatus {
  PENDING = "pending",
  APPROVED = "approved",
  DENIED = "denied"
}

export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  bio?: string;
  profileImageUrl?: string;
  role?: "student" | "admin";
}

export interface ItemLocation {
  name: string;
  description?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface ItemContact {
  email: string;
  phone?: string;
}

export interface Item {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: ItemStatus;
  category: string;
  imageUrl?: string;
  location: ItemLocation;
  contact: ItemContact;
  createdAt: Date;
  updatedAt: Date;
  matches?: ItemMatch[];
}

export interface ItemMatch {
  id: string;
  lostItemId: string;
  foundItemId: string;
  lostItem?: Item;
  foundItem?: Item;
  status: MatchStatus;
  confidence: number;
  createdAt: Date;
}
