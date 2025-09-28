export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'cashier' | 'warehouse' | 'accountant';
  permissions: string[];
  companyId: string;
  isActive: boolean;
}

export interface Company {
  id: string;
  name: string;
  rfc: string;
  address: string;
  taxRegime: string;
  logo?: string;
  digitalSeal?: {
    certificate: string;
    privateKey: string;
  };
}

export interface AuthContext {
  user: User | null;
  company: Company | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}