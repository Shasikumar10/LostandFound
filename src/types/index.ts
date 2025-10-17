export interface User {
  id: string;
  email: string;
  name?: string;
  role?: "student" | "admin";
  phone?: string;
  bio?: string;
  profileImageUrl?: string;
}

export enum ItemStatus {
  LOST = "lost",
  FOUND = "found"
}

export interface Location {
  name: string;
  description?: string;
}

export interface Contact {
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
  location: Location;
  contact: Contact;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export enum MatchStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected"
}

export interface ItemMatch {
  id: string;
  lostItemId: string;
  foundItemId: string;
  lostItem: Item;
  foundItem: Item;
  matchScore: number;
  status: MatchStatus | "pending" | "accepted" | "rejected";
  createdAt: string;
}