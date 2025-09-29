export interface Product {
  id: string;
  code: string;
  barcode?: string;
  name: string;
  description: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  categoryId: string;
  subcategoryId?: string;
  brandId?: string;
  variants?: ProductVariant[];
  unit: string;
  presentation: 'unit' | 'box' | 'package';
  unitsPerPresentation: number;
  isActive: boolean;
  images?: string[];
  lastMovement?: Date;
  salesCount?: number;
  supplierId?: string;
  lowStockAlert?: boolean;
  rotation?: 'high' | 'medium' | 'low';
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
  expectedAmount?: number;
  difference?: number;
  isOpen: boolean;
  openedBy: string;
  openedAt: Date;
  closedAt?: Date;
  sales: Sale[];
  expenses: CashExpense[];
  paymentSummary: {
    cash: number;
    card: number;
    transfer: number;
    credit: number;
  };
}

export interface CashExpense {
  id: string;
  description: string;
  amount: number;
  category: string;
  userId: string;
  date: Date;
  receipt?: string;
}

export interface Customer {
  id: string;
  code: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  fiscalData?: {
    rfc: string;
    businessName: string;
    fiscalAddress: string;
    zipCode: string;
    taxRegime: string;
    cfdi?: string;
  };
  type: 'frequent' | 'new' | 'delinquent';
  totalPurchases: number;
  purchaseHistory: Sale[];
  lastPurchase?: Date;
  discount?: number;
  creditLimit?: number;
  currentCredit?: number;
  status: 'active' | 'inactive' | 'blocked';
  notes?: string;
}

export interface Supplier {
  id: string;
  code: string;
  name: string;
  contactName?: string;
  email?: string;
  phone?: string;
  address?: string;
  fiscalData?: {
    rfc: string;
    businessName: string;
    fiscalAddress: string;
    zipCode: string;
    taxRegime: string;
  };
  paymentTerms: string;
  totalPurchases: number;
  lastPurchase?: Date;
  status: 'active' | 'inactive';
  products: Product[];
  balance?: number;
}

export interface InventoryMovement {
  id: string;
  productId: string;
  productName: string;
  type: 'entry' | 'exit' | 'adjustment' | 'sale' | 'return' | 'transfer';
  quantity: number;
  previousStock: number;
  newStock: number;
  reason?: string;
  userId: string;
  userName: string;
  date: Date;
  supplierId?: string;
  supplierName?: string;
  cost?: number;
  reference?: string;
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  supplierName: string;
  items: PurchaseItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending' | 'received' | 'cancelled';
  userId: string;
  createdAt: Date;
  receivedAt?: Date;
  notes?: string;
}

export interface PurchaseItem {
  productId: string;
  productName: string;
  quantity: number;
  cost: number;
  total: number;
  receivedQuantity?: number;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  details?: any;
  ipAddress?: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high';
}