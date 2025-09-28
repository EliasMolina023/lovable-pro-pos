import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Receipt, 
  Search, 
  Plus, 
  Eye, 
  Download,
  Send,
  FileText,
  Printer,
  Calculator,
  CheckCircle,
  Clock,
  AlertCircle
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

// Mock invoices data
const mockInvoices = [
  {
    id: 'FAC-001',
    series: 'A',
    folio: '001',
    customer: 'María García',
    customerRFC: 'GARM850101ABC',
    amount: 234.50,
    tax: 37.52,
    total: 272.02,
    status: 'timbrada',
    date: '2024-01-15',
    uuid: '12345678-1234-1234-1234-123456789012',
    paymentMethod: 'Efectivo'
  },
  {
    id: 'FAC-002',
    series: 'A',
    folio: '002',
    customer: 'Juan Pérez',
    customerRFC: 'PEJJ800505XYZ',
    amount: 156.75,
    tax: 25.08,
    total: 181.83,
    status: 'borrador',
    date: '2024-01-15',
    paymentMethod: 'Tarjeta'
  },
  {
    id: 'FAC-003',
    series: 'A',
    folio: '003',
    customer: 'Ana López',
    customerRFC: 'LOPA900815DEF',
    amount: 298.50,
    tax: 47.76,
    total: 346.26,
    status: 'cancelada',
    date: '2024-01-14',
    paymentMethod: 'Transferencia'
  },
];

const statusLabels = {
  borrador: 'Borrador',
  timbrada: 'Timbrada',
  cancelada: 'Cancelada',
  enviada: 'Enviada'
};

const statusVariants = {
  borrador: 'secondary',
  timbrada: 'default',
  cancelada: 'destructive',
  enviada: 'outline'
} as const;

const statusIcons = {
  borrador: Clock,
  timbrada: CheckCircle,
  cancelada: AlertCircle,
  enviada: Send
};

export default function Billing() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    customer: '',
    customerRFC: '',
    paymentMethod: 'cash',
    items: [] as Array<{ product: string; quantity: number; price: number; total: number }>
  });

  const filteredInvoices = mockInvoices.filter(invoice =>
    invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.customerRFC.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    const Icon = statusIcons[status as keyof typeof statusIcons];
    return <Icon className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Facturación</h1>
          <p className="text-muted-foreground">
            Gestiona facturas electrónicas y comprobantes fiscales
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nueva Factura
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Crear Nueva Factura</DialogTitle>
                <DialogDescription>
                  Genera una nueva factura electrónica
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer">Cliente</Label>
                    <Input
                      id="customer"
                      value={newInvoice.customer}
                      onChange={(e) => setNewInvoice(prev => ({ ...prev, customer: e.target.value }))}
                      placeholder="Nombre del cliente"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer-rfc">RFC del Cliente</Label>
                    <Input
                      id="customer-rfc"
                      value={newInvoice.customerRFC}
                      onChange={(e) => setNewInvoice(prev => ({ ...prev, customerRFC: e.target.value.toUpperCase() }))}
                      placeholder="XAXX010101000"
                      maxLength={13}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Método de Pago</Label>
                  <Select value={newInvoice.paymentMethod} onValueChange={(value) => setNewInvoice(prev => ({ ...prev, paymentMethod: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar método" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Efectivo</SelectItem>
                      <SelectItem value="card">Tarjeta de Crédito/Débito</SelectItem>
                      <SelectItem value="transfer">Transferencia Electrónica</SelectItem>
                      <SelectItem value="check">Cheque</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Productos/Servicios</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Los productos se agregarán desde el punto de venta o inventario
                  </p>
                  <Button variant="outline" disabled>
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Producto
                  </Button>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setIsCreateDialogOpen(false)}>
                    Crear Factura
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Facturas Hoy</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              +2 desde ayer
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Facturado Hoy</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450</div>
            <p className="text-xs text-muted-foreground">
              IVA incluido
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Timbradas</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {mockInvoices.filter(inv => inv.status === 'timbrada').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Borradores</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {mockInvoices.filter(inv => inv.status === 'borrador').length}
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
                  placeholder="Buscar facturas, clientes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="borrador">Borradores</SelectItem>
                <SelectItem value="timbrada">Timbradas</SelectItem>
                <SelectItem value="cancelada">Canceladas</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="today">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hoy</SelectItem>
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mes</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Facturas Electrónicas</CardTitle>
          <CardDescription>
            Lista de facturas generadas y su estado actual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Folio</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>RFC</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Subtotal</TableHead>
                <TableHead>IVA</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <div className="font-medium">{invoice.series}-{invoice.folio}</div>
                    <div className="text-xs text-muted-foreground">{invoice.id}</div>
                  </TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell className="font-mono text-xs">{invoice.customerRFC}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariants[invoice.status as keyof typeof statusVariants]} className="flex items-center gap-1 w-fit">
                      {getStatusIcon(invoice.status)}
                      {statusLabels[invoice.status as keyof typeof statusLabels]}
                    </Badge>
                  </TableCell>
                  <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>${invoice.tax.toFixed(2)}</TableCell>
                  <TableCell className="font-medium">${invoice.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Printer className="w-4 h-4" />
                      </Button>
                      {invoice.status === 'timbrada' && (
                        <Button variant="outline" size="sm">
                          <Send className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Facturación Rápida</CardTitle>
            <CardDescription>
              Crear factura desde venta existente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Receipt className="w-4 h-4 mr-2" />
              Facturar Venta
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Reportes Fiscales</CardTitle>
            <CardDescription>
              Generar reportes para declaraciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <FileText className="w-4 h-4 mr-2" />
              Generar Reporte
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Configuración SAT</CardTitle>
            <CardDescription>
              Verificar conexión con el SAT
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <CheckCircle className="w-4 h-4 mr-2" />
              Verificar Estado
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}