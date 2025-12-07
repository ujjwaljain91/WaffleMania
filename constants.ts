import { SpecialItem, Testimonial, WaffleOption, ToppingOption } from './types';

export const SPECIALS: SpecialItem[] = [
  {
    id: 1,
    title: "The Belgian Royal",
    description: "Classic crispy dough, powdered sugar, and premium whipped cream.",
    price: "$12.50",
    calories: 450,
    // Classic waffle with fruit and powdered sugar
    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Chocolate Lava",
    description: "Dark chocolate batter, molten core, drizzled with white ganache.",
    price: "$14.00",
    calories: 620,
    // Distinct dark chocolate waffle
    image: "https://images.unsplash.com/photo-1579954115563-e72bf1381629?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Berry Bliss",
    description: "Vanilla base topped with fresh organic blueberries and tart jam.",
    price: "$13.50",
    calories: 380,
    // Waffle specifically with blueberries
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Lotus Biscoff Dream",
    description: "Crushed Biscoff cookies, caramel drizzle, and vanilla gelato.",
    price: "$15.00",
    calories: 700,
    // Waffle with heavy caramel/syrup
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800&auto=format&fit=crop",
  },
];

export const WAFFLE_BASES: WaffleOption[] = [
  { 
    id: 'classic', 
    name: 'Classic Vanilla', 
    color: 'bg-[#F3E5AB]', 
    filter: 'none',
    blendColor: 'transparent',
    price: 8 
  },
  { 
    id: 'choco', 
    name: 'Dark Chocolate', 
    color: 'bg-[#5D4037]', 
    filter: 'brightness(0.7) contrast(1.1)',
    blendColor: '#3E2723', // Deep brown overlay
    price: 9 
  },
  { 
    id: 'matcha', 
    name: 'Kyoto Matcha', 
    color: 'bg-[#C5E1A5]', 
    filter: 'sepia(0.2) brightness(0.95)', 
    blendColor: '#558B2F', // Green overlay
    price: 10 
  },
  { 
    id: 'redvelvet', 
    name: 'Red Velvet', 
    color: 'bg-[#EF9A9A]', 
    filter: 'sepia(0.1) brightness(0.9)', 
    blendColor: '#B71C1C', // Red overlay
    price: 10 
  },
];

export const TOPPINGS: ToppingOption[] = [
  { 
    id: 'strawberry', 
    name: 'Fresh Strawberries', 
    type: 'fruit', 
    price: 2,
    // Close up of strawberries
    image: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 'banana', 
    name: 'Sliced Banana', 
    type: 'fruit', 
    price: 1.5,
    // Banana slices texture
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 'maple', 
    name: 'Maple Syrup', 
    type: 'syrup', 
    price: 1,
    // Liquid honey/syrup texture
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 'chocolate_sauce', 
    name: 'Belgian Choco Sauce', 
    type: 'syrup', 
    price: 1.5,
    // Melted chocolate texture
    image: 'https://images.unsplash.com/photo-1548848221-0c2e497ed557?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 'nuts', 
    name: 'Candied Pecans', 
    type: 'crunch', 
    price: 2,
    // Pecans close up
    image: 'https://images.unsplash.com/photo-1615486511269-e70d45eb4501?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 'oreo', 
    name: 'Oreo Crumbs', 
    type: 'crunch', 
    price: 1.5,
    // Crushed dark cookie texture
    image: 'https://images.unsplash.com/photo-1550505191-232d398e6dfd?q=80&w=400&auto=format&fit=crop' 
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Elara V.",
    role: "Food Blogger",
    text: "I've never seen a waffle look this aesthetic. It's almost too pretty to eat, but the taste is heavenly.",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus T.",
    role: "Designer",
    text: "The buttery interactions on the website match the buttery taste of the waffles. 10/10 experience.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    role: "Coffee Enthusiast",
    text: "The perfect cafe vibe. Warm, cozy, and absolutely delicious.",
    rating: 5,
  }
];