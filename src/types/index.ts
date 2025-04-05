
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
}

export interface ItemLocation {
  name: string;
  description?: string;
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
