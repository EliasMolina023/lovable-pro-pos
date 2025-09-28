export interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  categoryId: string;
  brandId?: string;
  variants?: ProductVariant[];
  unit: string;
  presentation: 'unit' | 'box' | 'package';
  unitsPerPresentation: number;
  isActive: boolean;
  images?: string[];
}

export interface ProductVariant {
  id: string;
  name: string;
  type: 'size' | 'color' | 'flavor' | 'weight';
  value: string;
  priceModifier: number;
  stockModifier: number;
}

export interface Category {
  id: string;
  name: string;
  parentId?: string;
  isActive: boolean;
}

export interface SaleItem {
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  discount: number;
  total: number;
  variantId?: string;
}

export interface Sale {
  id: string;
  cashRegisterId: string;
  items: SaleItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'transfer' | 'credit';
  status: 'completed' | 'cancelled' | 'returned';
  customerId?: string;
  userId: string;
  createdAt: Date;
  notes?: string;
}

export interface CashRegister {
  id: string;
  name: string;
  openingAmount: number;
  currentAmount: number;
  isOpen: boolean;
  openedBy: string;
  openedAt: Date;
  closedAt?: Date;
  sales: Sale[];
}