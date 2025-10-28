export interface OrderItem {
    productId: number;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
  }
  
  export interface Order {
    id?: number;
    customer: string;
    items: OrderItem[];
    total: number;
    date: string;
  }
  