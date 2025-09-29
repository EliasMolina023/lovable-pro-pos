import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Search, 
  Plus, 
  Edit, 
  Eye,
  CreditCard,
  Star,
  UserCheck,
  UserX,
  Receipt,
  TrendingUp
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Customer } from '@/types/pos';

const mockCustomers: Customer[] = [
  {
    id: '1',
    code: 'CLI001',
    name: 'María González',
    email: 'maria.gonzalez@email.com',
    phone: '555-0123',
    address: 'Av. Principal 123, Col. Centro',
    fiscalData: {
      rfc: 'GOMA850101ABC',
      businessName: 'María González',
      fiscalAddress: 'Av. Principal 123, Col. Centro',
      zipCode: '12345',
      taxRegime: 'Régimen de Incorporación Fiscal',
      cfdi: 'G01'
    },
    type: 'frequent',
    totalPurchases: 15420.50,
    purchaseHistory: [],
    lastPurchase: new Date('2024-01-15'),
    discount: 5,
    creditLimit: 5000,
    currentCredit: 1200,
    status: 'active',
    notes: 'Cliente frecuente, siempre paga a tiempo'
  },
  {
    id: '2',
    code: 'CLI002',
    name: 'Empresa ABC S.A. de C.V.',
    email: 'facturacion@empresaabc.com',
    phone: '555-0456',
    address: 'Blvd. Industrial 456, Zona Norte',
    fiscalData: {
      rfc: 'EAB950315XYZ',
      businessName: 'Empresa ABC S.A. de C.V.',
      fiscalAddress: 'Blvd. Industrial 456, Zona Norte',
      zipCode: '54321',
      taxRegime: 'Régimen General de Ley Personas Morales',
      cfdi: 'G03'
    },
    type: 'frequent',
    totalPurchases: 45890.75,
    purchaseHistory: [],
    lastPurchase: new Date('2024-01-20'),
    discount: 10,
    creditLimit: 20000,
    currentCredit: 0,
    status: 'active'
  },
  {
    id: '3',
    code: 'CLI003',
    name: 'Carlos Pérez',
    email: 'carlos.perez@email.com',
    phone: '555-0789',
    type: 'new',
    totalPurchases: 850.00,
    purchaseHistory: [],
    lastPurchase: new Date('2024-01-22'),
    status: 'active'
  },
  {
    id: '4',
    code: 'CLI004',
    name: 'Ana Martínez',
    email: 'ana.martinez@email.com',
    phone: '555-0321',
    type: 'delinquent',
    totalPurchases: 2340.00,
    purchaseHistory: [],
    lastPurchase: new Date('2023-12-10'),
    creditLimit: 3000,
    currentCredit: 2800,
    status: 'blocked',
    notes: 'Pagos atrasados, requiere seguimiento'
  }
];

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || customer.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getCustomerTypeBadge = (type: Customer['type']) => {
    switch (type) {
      case 'frequent': return { variant: 'default' as const, label: 'Frecuente', icon: Star };
      case 'new': return { variant: 'secondary' as const, label: 'Nuevo', icon: UserCheck };
      case 'delinquent': return { variant: 'destructive' as const, label: 'Moroso', icon: UserX };
    }
  };

  const getStatusBadge = (status: Customer['status']) => {
    switch (status) {
      case 'active': return { variant: 'default' as const, label: 'Activo' };
      case 'inactive': return { variant: 'secondary' as const, label: 'Inactivo' };
      case 'blocked': return { variant: 'destructive' as const, label: 'Bloqueado' };
    }
  };

  const frequentCustomers = mockCustomers.filter(c => c.type === 'frequent').length;
  const newCustomers = mockCustomers.filter(c => c.type === 'new').length;
  const delinquentCustomers = mockCustomers.filter(c => c.type === 'delinquent').length;
  const totalSales = mockCustomers.reduce((sum, c) => sum + c.totalPurchases, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground">
            Gestiona tu cartera de clientes y sus datos fiscales
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Receipt className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Cliente
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCustomers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Frecuentes</CardTitle>
            <Star className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{frequentCustomers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Nuevos</CardTitle>
            <UserCheck className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{newCustomers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSales.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar clientes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo de Cliente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los Tipos</SelectItem>
                <SelectItem value="frequent">Frecuentes</SelectItem>
                <SelectItem value="new">Nuevos</SelectItem>
                <SelectItem value="delinquent">Morosos</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los Estados</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="inactive">Inactivos</SelectItem>
                <SelectItem value="blocked">Bloqueados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
          <CardDescription>
            Información completa de clientes con datos fiscales y de contacto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Compras</TableHead>
                <TableHead>Crédito</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => {
                const typeBadge = getCustomerTypeBadge(customer.type);
                const statusBadge = getStatusBadge(customer.status);
                const TypeIcon = typeBadge.icon;
                
                return (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.code}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {customer.fiscalData?.rfc || 'Sin RFC'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={typeBadge.variant} className="flex items-center gap-1 w-fit">
                        <TypeIcon className="w-3 h-3" />
                        {typeBadge.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{customer.email}</div>
                        <div className="text-muted-foreground">{customer.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-medium">${customer.totalPurchases.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">
                          {customer.lastPurchase ? 
                            `Última: ${customer.lastPurchase.toLocaleDateString()}` :
                            'Sin compras'
                          }
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {customer.creditLimit ? (
                        <div className="text-center">
                          <div className="text-sm font-medium">
                            ${customer.currentCredit || 0} / ${customer.creditLimit}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Disponible: ${(customer.creditLimit - (customer.currentCredit || 0)).toLocaleString()}
                          </div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">Sin crédito</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusBadge.variant}>
                        {statusBadge.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <CreditCard className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}