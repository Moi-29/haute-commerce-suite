import { create } from 'zustand';
import { Product, CartItem, Order } from '../types';

interface StoreState {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  isAdmin: boolean;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (customer: string) => void;
  toggleAdmin: () => void;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Excellence Chronograph',
    price: 1250,
    description: 'A masterpiece of Swiss engineering, featuring a minimalist dial and premium leather strap.',
    category: 'Lifestyle',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/dd48e6e8-81b0-485a-8ff5-21cf602d8e9c/hero-banner-1-6f287900-1773606175872.webp',
    stock: 12,
    featured: true,
  },
  {
    id: '2',
    name: 'Urban Velocity Sneakers',
    price: 240,
    description: 'Designed for the modern nomad. Combining comfort with avant-garde aesthetics.',
    category: 'Fashion',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/dd48e6e8-81b0-485a-8ff5-21cf602d8e9c/product-1---sneakers-77510a54-1773606171546.webp',
    stock: 45,
    featured: true,
  },
  {
    id: '3',
    name: 'Sienna Leather Tote',
    price: 480,
    description: 'Hand-crafted Italian leather bag designed for daily elegance.',
    category: 'Fashion',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/dd48e6e8-81b0-485a-8ff5-21cf602d8e9c/product-2---handbag-cc939b01-1773606171739.webp',
    stock: 8,
    featured: false,
  },
  {
    id: '4',
    name: 'Aura Smart Hub',
    price: 320,
    description: 'The future of home automation. Sleek, intuitive, and powerful.',
    category: 'Electronics',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/dd48e6e8-81b0-485a-8ff5-21cf602d8e9c/product-3---smart-device-55571177-1773606171547.webp',
    stock: 25,
    featured: true,
  },
  {
    id: '5',
    name: 'Nordic Lounge Chair',
    price: 890,
    description: 'Sculptural design meets ergonomic comfort. A statement piece for any room.',
    category: 'Furniture',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/dd48e6e8-81b0-485a-8ff5-21cf602d8e9c/product-4---furniture-0f3d7353-1773606171571.webp',
    stock: 5,
    featured: false,
  },
  {
    id: '6',
    name: 'Luxe No. 5 Essence',
    price: 185,
    description: 'A sophisticated blend of rare botanicals and warm amber notes.',
    category: 'Lifestyle',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/dd48e6e8-81b0-485a-8ff5-21cf602d8e9c/product-5---fragrance-c6b730e3-1773606171644.webp',
    stock: 30,
    featured: false,
  },
  {
    id: '7',
    name: 'Zenith Studio Headphones',
    price: 450,
    description: 'Pristine sound quality with industry-leading noise cancellation.',
    category: 'Electronics',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/dd48e6e8-81b0-485a-8ff5-21cf602d8e9c/product-6---headphones-c28e41e9-1773606171468.webp',
    stock: 15,
    featured: true,
  }
];

export const useStore = create<StoreState>((set) => ({
  products: INITIAL_PRODUCTS,
  cart: [],
  orders: [],
  isAdmin: false,
  
  toggleAdmin: () => set((state) => ({ isAdmin: !state.isAdmin })),

  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  
  updateProduct: (product) => set((state) => ({
    products: state.products.map(p => p.id === product.id ? product : p)
  })),
  
  deleteProduct: (id) => set((state) => ({
    products: state.products.filter(p => p.id !== id)
  })),

  addToCart: (product) => set((state) => {
    const existing = state.cart.find(item => item.id === product.id);
    if (existing) {
      return {
        cart: state.cart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }),

  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter(item => item.id !== id)
  })),

  updateCartQuantity: (id, quantity) => set((state) => ({
    cart: state.cart.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
    ).filter(item => item.quantity > 0)
  })),

  clearCart: () => set({ cart: [] }),

  placeOrder: (customer) => set((state) => {
    const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      customer,
      date: new Date().toLocaleDateString(),
      total,
      status: 'pending',
      items: [...state.cart]
    };
    return { 
      orders: [newOrder, ...state.orders],
      cart: [] 
    };
  }),
}));