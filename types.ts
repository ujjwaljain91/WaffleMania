
export interface WaffleOption {
  id: string;
  name: string;
  color: string; // Tailwind color class or hex for UI buttons
  filter: string; // CSS filter for the realistic image (fallback/adjuster)
  blendColor?: string; // Hex code for mix-blend-overlay tinting
  price: number;
  image?: string;
}

export interface ToppingOption {
  id: string;
  name: string;
  type: 'fruit' | 'syrup' | 'crunch';
  price: number;
  image: string; // URL for the texture/asset
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface SpecialItem {
  id: number;
  title: string;
  description: string;
  price: string;
  calories: number;
  image: string; // placeholder url
}

export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  type: 'special' | 'custom';
}

export interface SavedWaffle {
  id: string;
  name: string;
  baseId: string;
  toppingIds: string[];
  date: number;
  aiDescription?: string;
}
