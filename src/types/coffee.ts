export type CoffeeCategory = 'all' | 'beans' | 'espresso' | 'filter' | 'cold' | 'bakery';

export type GrindType = 'whole_bean' | 'espresso' | 'v60' | 'french_press' | 'turkish';

export interface CoffeeProduct {
  id: string;
  name: string;
  category: CoffeeCategory;
  price: number;
  origin?: string;
  process?: string;
  altitude?: string;
  roastLevel?: 'Açık' | 'Orta' | 'Koyu' | 'Omni';
  tastingNotes: string[];
  description: string;
  scaScore?: number;
  image: string;
  inStock: boolean;
  isFeatured?: boolean;
  weights?: number[]; // e.g. [250, 500, 1000]
}

export interface CartItem {
  id: string; // unique item cart key (productId + grind + weight)
  product: CoffeeProduct;
  quantity: number;
  grind?: GrindType;
  weight?: number; // in grams
}

export interface Branch {
  id: string;
  name: string;
  district: string;
  address: string;
  phone: string;
  weekdayHours: string;
  weekendHours: string;
  features: string[];
  isOpenNow: boolean;
}

export interface BrewGuide {
  id: string;
  name: string;
  ratio: number; // e.g. 15 for 1:15
  defaultCoffee: number;
  waterTemp: string;
  grindText: string;
  totalTime: string;
  steps: {
    time: string;
    action: string;
    waterTotal: string;
  }[];
}

export interface Reservation {
  id: string;
  branch: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  phone: string;
  email: string;
  seatingArea: 'indoor' | 'terrace' | 'brew_bar';
  notes?: string;
  createdAt: string;
}
