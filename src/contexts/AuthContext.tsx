import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContext as AuthContextType, User, Company } from '@/types/auth';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem('pos-user');
    const savedCompany = localStorage.getItem('pos-company');
    
    if (savedUser && savedCompany) {
      setUser(JSON.parse(savedUser));
      setCompany(JSON.parse(savedCompany));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data
    const mockUser: User = {
      id: '1',
      email,
      name: 'Administrador Principal',
      role: 'admin',
      permissions: ['all'],
      companyId: 'company-1',
      isActive: true,
    };
    
    const mockCompany: Company = {
      id: 'company-1',
      name: 'Mi Empresa POS',
      rfc: 'XAXX010101000',
      address: 'Av. Principal 123, Ciudad, Estado',
      taxRegime: 'Régimen General de Ley Personas Morales',
    };
    
    setUser(mockUser);
    setCompany(mockCompany);
    
    localStorage.setItem('pos-user', JSON.stringify(mockUser));
    localStorage.setItem('pos-company', JSON.stringify(mockCompany));
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    setCompany(null);
    localStorage.removeItem('pos-user');
    localStorage.removeItem('pos-company');
  };

  return (
    <AuthContext.Provider value={{ user, company, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};