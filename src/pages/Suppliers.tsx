import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Truck, 
  Search, 
  Plus, 
  Edit, 
  Eye,
  Package,
  DollarSign,
  TrendingUp,
  Calendar,
  Phone,
  Mail,
  MapPin
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
import { Supplier } from '@/types/pos';

const mockSuppliers: Supplier[] = [
  {
    id: '1',
    code: 'PROV001',
    name: 'Distribuidora El Sol S.A. de C.V.',
    contactName: 'Juan Carlos López',
    email: 'compras@elsol.com.mx',
    phone: '555-1001',
    address: 'Parque Industrial Norte, Nave 15',
    fiscalData: {
      rfc: 'DES850315ABC',
      businessName: 'Distribuidora El Sol S.A. de C.V.',
      fiscalAddress: 'Parque Industrial Norte, Nave 15',
      zipCode: '12345',
      taxRegime: 'Régimen General de Ley Personas Morales'
    },
    paymentTerms: '30 días',
    totalPurchases: 125450.75,
    lastPurchase: new Date('2024-01-20'),
    status: 'active',
    products: [],
    balance: 15000
  },
  {
    id: '2',
    code: 'PROV002',
    name: 'Productos Frescos del Valle',
    contactName: 'María Elena Ramírez',
    email: 'ventas@frescosvallle.com',
    phone: '555-1002',
    address: 'Carretera Nacional Km 25',
    fiscalData: {
      rfc: 'PFV920408XYZ',
      businessName: 'Productos Frescos del Valle S. de R.L.',
      fiscalAddress: 'Carretera Nacional Km 25',
      zipCode: '54321',
      taxRegime: 'Régimen General de Ley Personas Morales'
    },
    paymentTerms: '15 días',
    totalPurchases: 89320.50,
    lastPurchase: new Date('2024-01-18'),
    status: 'active',
    products: [],
    balance: 8500
  },
  {
    id: '3',
    code: 'PROV003',
    name: 'Abarrotes Mayoristas Unidos',
    contactName: 'Roberto Hernández',
    email: 'pedidos@abarrotes-unidos.com',
    phone: '555-1003',
    address: 'Zona Comercial Centro, Local 45',
    fiscalData: {
      rfc: 'AMU780620DEF',
      businessName: 'Abarrotes Mayoristas Unidos S.A.',
      fiscalAddress: 'Zona Comercial Centro, Local 45',
      zipCode: '67890',
      taxRegime: 'Régimen General de Ley Personas Morales'
    },
    paymentTerms: '45 días',
    totalPurchases: 67890.25,
    lastPurchase: new Date('2024-01-15'),
    status: 'active',
    products: [],
    balance: 12300
  },
  {
    id: '4',
    code: 'PROV004',
    name: 'Lácteos y Derivados del Norte',
    contactName: 'Ana Patricia Vega',
    email: 'facturacion@lacteosnorte.mx',
    phone: '555-1004',
    paymentTerms: '21 días',
    totalPurchases: 45600.00,
    lastPurchase: new Date('2024-01-10'),
    status: 'inactive',
    products: [],
    balance: 0
  }
];

export default function Suppliers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredSuppliers = mockSuppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.contactName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || supplier.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Supplier['status']) => {
    switch (status) {
      case 'active': return { variant: 'default' as const, label: 'Activo' };
      case 'inactive': return { variant: 'secondary' as const, label: 'Inactivo' };
    }
  };

  const activeSuppliers = mockSuppliers.filter(s => s.status === 'active').length;
  const totalPurchases = mockSuppliers.reduce((sum, s) => sum + s.totalPurchases, 0);
  const totalBalance = mockSuppliers.reduce((sum, s) => sum + (s.balance || 0), 0);
  const avgPaymentTerms = mockSuppliers.reduce((sum, s) => {
    const days = parseInt(s.paymentTerms.split(' ')[0]) || 0;
    return sum + days;
  }, 0) / mockSuppliers.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Proveedores</h1>
          <p className="text-muted-foreground">
            Gestiona tu red de proveedores y compras
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Package className="w-4 h-4 mr-2" />
            Nueva Compra
          </Button>
          <Button variant="outline">
            <DollarSign className="w-4 h-4 mr-2" />
            Pagos
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Proveedor
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proveedores Activos</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSuppliers}</div>
            <p className="text-xs text-muted-foreground">
              de {mockSuppliers.length} totales
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compras Totales</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPurchases.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Este año
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Pendiente</CardTitle>
            <DollarSign className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">${totalBalance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Por pagar
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plazo Promedio</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(avgPaymentTerms)} días</div>
            <p className="text-xs text-muted-foreground">
              Términos de pago
            </p>
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
                  placeholder="Buscar proveedores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los Estados</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="inactive">Inactivos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Suppliers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Proveedores</CardTitle>
          <CardDescription>
            Información completa de proveedores con datos fiscales y de contacto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Proveedor</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Compras Totales</TableHead>
                <TableHead>Última Compra</TableHead>
                <TableHead>Saldo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.map((supplier) => {
                const statusBadge = getStatusBadge(supplier.status);
                
                return (
                  <TableRow key={supplier.id}>
                    <TableCell className="font-medium">{supplier.code}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{supplier.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {supplier.address || 'Sin dirección'}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          RFC: {supplier.fiscalData?.rfc || 'No disponible'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{supplier.contactName}</div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Mail className="w-3 h-3" />
                          {supplier.email}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          {supplier.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">${supplier.totalPurchases.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">
                        Plazo: {supplier.paymentTerms}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {supplier.lastPurchase ? 
                          supplier.lastPurchase.toLocaleDateString() :
                          'Sin compras'
                        }
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`font-medium ${(supplier.balance || 0) > 0 ? 'text-warning' : 'text-muted-foreground'}`}>
                        ${(supplier.balance || 0).toLocaleString()}
                      </div>
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
                          <Package className="w-4 h-4" />
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