import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Search, 
  Plus, 
  Edit, 
  AlertTriangle,
  Filter,
  Download,
  BarChart3,
  Scan,
  TrendingUp,
  TrendingDown,
  History,
  Eye,
  Truck
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

// Mock inventory data
const mockInventory = [
  {
    id: '1',
    code: 'COC001',
    barcode: '7501234567890',
    name: 'Coca Cola 600ml',
    category: 'Bebidas',
    subcategory: 'Refrescos',
    stock: 50,
    minStock: 20,
    price: 25.00,
    cost: 18.00,
    presentation: 'Unidad',
    status: 'active',
    lastMovement: new Date('2024-01-20'),
    salesCount: 125,
    supplierId: 'PROV001',
    rotation: 'high' as const,
    lowStockAlert: false
  },
  {
    id: '2',
    code: 'PAN001',
    barcode: '7501234567891',
    name: 'Pan Blanco',
    category: 'Panadería',
    subcategory: 'Pan Dulce',
    stock: 8,
    minStock: 15,
    price: 10.00,
    cost: 6.00,
    presentation: 'Unidad',
    status: 'low_stock',
    lastMovement: new Date('2024-01-22'),
    salesCount: 89,
    supplierId: 'PROV002',
    rotation: 'medium' as const,
    lowStockAlert: true
  },
  {
    id: '3',
    code: 'LEC001',
    barcode: '7501234567892',
    name: 'Leche Entera 1L',
    category: 'Lácteos',
    subcategory: 'Leches',
    stock: 20,
    minStock: 10,
    price: 21.00,
    cost: 15.50,
    presentation: 'Unidad',
    status: 'active',
    lastMovement: new Date('2024-01-21'),
    salesCount: 67,
    supplierId: 'PROV004',
    rotation: 'medium' as const,
    lowStockAlert: false
  },
  {
    id: '4',
    code: 'ARR001',
    barcode: '7501234567893',
    name: 'Arroz Premium 1kg',
    category: 'Abarrotes',
    subcategory: 'Granos',
    stock: 2,
    minStock: 5,
    price: 18.50,
    cost: 12.00,
    presentation: 'Paquete',
    status: 'critical',
    lastMovement: new Date('2024-01-15'),
    salesCount: 23,
    supplierId: 'PROV003',
    rotation: 'low' as const,
    lowStockAlert: true
  },
  {
    id: '5',
    code: 'ACE001',
    barcode: '7501234567894',
    name: 'Aceite Vegetal 1L',
    category: 'Abarrotes',
    subcategory: 'Aceites',
    stock: 0,
    minStock: 8,
    price: 32.00,
    cost: 24.00,
    presentation: 'Botella',
    status: 'out_of_stock',
    lastMovement: new Date('2024-01-10'),
    salesCount: 45,
    supplierId: 'PROV001',
    rotation: 'medium' as const,
    lowStockAlert: true
  }
];

// Mock inventory movements
const mockMovements = [
  {
    id: '1',
    productId: '1',
    productName: 'Coca Cola 600ml',
    type: 'sale' as const,
    quantity: -5,
    previousStock: 55,
    newStock: 50,
    userId: 'USR001',
    userName: 'Juan Pérez',
    date: new Date('2024-01-22T14:30:00'),
    reference: 'VEN-001'
  },
  {
    id: '2',
    productId: '2',
    productName: 'Pan Blanco',
    type: 'entry' as const,
    quantity: 20,
    previousStock: 5,
    newStock: 25,
    supplierId: 'PROV002',
    supplierName: 'Panadería Central',
    userId: 'USR001',
    userName: 'Juan Pérez',
    date: new Date('2024-01-21T09:15:00'),
    cost: 6.00,
    reference: 'COM-015'
  },
  {
    id: '3',
    productId: '4',
    productName: 'Arroz Premium 1kg',
    type: 'adjustment' as const,
    quantity: -3,
    previousStock: 5,
    newStock: 2,
    reason: 'Conteo físico - producto dañado',
    userId: 'USR002',
    userName: 'María González',
    date: new Date('2024-01-20T16:45:00'),
    reference: 'AJU-003'
  }
];

const categories = ['Todas', 'Bebidas', 'Panadería', 'Lácteos', 'Abarrotes'];

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredInventory = mockInventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || item.category === selectedCategory;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStockBadgeVariant = (status: string) => {
    switch (status) {
      case 'critical': return 'destructive';
      case 'low_stock': return 'secondary';
      default: return 'default';
    }
  };

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock === 0) return 'Sin Stock';
    if (stock <= minStock * 0.5) return 'Crítico';
    if (stock <= minStock) return 'Bajo';
    return 'Normal';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventario</h1>
          <p className="text-muted-foreground">
            Gestiona tus productos y controla el stock
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <History className="w-4 h-4 mr-2" />
            Movimientos
          </Button>
          <Button variant="outline">
            <Scan className="w-4 h-4 mr-2" />
            Escanear
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Producto
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockInventory.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Bajo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {mockInventory.filter(item => item.status === 'low_stock').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Crítico</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {mockInventory.filter(item => item.status === 'critical' || item.status === 'out_of_stock').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productos Agotados</CardTitle>
            <Package className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {mockInventory.filter(item => item.status === 'out_of_stock').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Más Vendidos</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {mockInventory.filter(item => item.rotation === 'high').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Inventario</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${mockInventory.reduce((sum, item) => sum + (item.stock * item.cost), 0).toFixed(2)}
            </div>
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
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Estado Stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Normal</SelectItem>
                <SelectItem value="low_stock">Stock Bajo</SelectItem>
                <SelectItem value="critical">Crítico</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Productos en Inventario</CardTitle>
          <CardDescription>
            Lista completa de productos con información de stock y precios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código/Barras</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Rotación</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Precio/Costo</TableHead>
                <TableHead>Últimas Ventas</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => {
                const getRotationBadge = (rotation: string) => {
                  switch (rotation) {
                    case 'high': return { variant: 'default' as const, label: 'Alta', icon: TrendingUp };
                    case 'medium': return { variant: 'secondary' as const, label: 'Media', icon: TrendingUp };
                    case 'low': return { variant: 'outline' as const, label: 'Baja', icon: TrendingDown };
                    default: return { variant: 'outline' as const, label: 'Sin datos', icon: TrendingDown };
                  }
                };
                
                const rotationBadge = getRotationBadge(item.rotation || 'low');
                const RotationIcon = rotationBadge.icon;
                
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.code}</div>
                        {item.barcode && (
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Scan className="w-3 h-3" />
                            {item.barcode}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.presentation}</div>
                        {item.subcategory && (
                          <div className="text-xs text-muted-foreground">{item.subcategory}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className={`font-medium ${item.stock === 0 ? 'text-destructive' : item.stock <= item.minStock ? 'text-warning' : ''}`}>
                          {item.stock}
                        </div>
                        <div className="text-xs text-muted-foreground">Min: {item.minStock}</div>
                        {item.lowStockAlert && (
                          <div className="text-xs text-destructive flex items-center gap-1 justify-center">
                            <AlertTriangle className="w-3 h-3" />
                            Alerta
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={rotationBadge.variant} className="flex items-center gap-1 w-fit">
                        <RotationIcon className="w-3 h-3" />
                        {rotationBadge.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStockBadgeVariant(item.status)}>
                        {getStockStatus(item.stock, item.minStock)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">${item.price.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">${item.cost.toFixed(2)}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-medium">{item.salesCount || 0}</div>
                        <div className="text-xs text-muted-foreground">
                          {item.lastMovement ? item.lastMovement.toLocaleDateString() : 'Sin movimiento'}
                        </div>
                      </div>
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
                          <Truck className="w-4 h-4" />
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