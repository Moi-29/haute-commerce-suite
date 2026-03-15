export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Electronics' | 'Fashion' | 'Lifestyle' | 'Furniture';
  image: string;
  stock: number;
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
  items: CartItem[];
}