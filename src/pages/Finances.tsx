import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Receipt, 
  CreditCard,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock financial data
const salesSummary = {
  today: {
    sales: 15230.00,
    transactions: 45,
    cash: 8450.00,
    card: 5280.00,
    transfer: 1500.00,
  },
  week: {
    sales: 89650.00,
    transactions: 287,
    growth: 12.5,
  },
  month: {
    sales: 342100.00,
    transactions: 1205,
    growth: 8.3,
  }
};

const recentSales = [
  { id: 'V-001', time: '10:30', amount: 234.50, method: 'cash', customer: 'Cliente General' },
  { id: 'V-002', time: '10:45', amount: 89.99, method: 'card', customer: 'María García' },
  { id: 'V-003', time: '11:15', amount: 156.75, method: 'transfer', customer: 'Juan Pérez' },
  { id: 'V-004', time: '11:30', amount: 67.80, method: 'cash', customer: 'Cliente General' },
  { id: 'V-005', time: '11:45', amount: 298.50, method: 'card', customer: 'Ana López' },
];

const expenses = [
  { id: 'E-001', date: '2024-01-15', description: 'Compra de Mercancía', amount: 5500.00, category: 'Inventario' },
  { id: 'E-002', date: '2024-01-14', description: 'Pago de Renta', amount: 8000.00, category: 'Gastos Fijos' },
  { id: 'E-003', date: '2024-01-13', description: 'Servicios Públicos', amount: 1200.00, category: 'Servicios' },
  { id: 'E-004', date: '2024-01-12', description: 'Material de Limpieza', amount: 350.00, category: 'Suministros' },
];

export default function Finances() {
  const getPaymentMethodBadge = (method: string) => {
    switch (method) {
      case 'cash': return <Badge variant="default">Efectivo</Badge>;
      case 'card': return <Badge variant="secondary">Tarjeta</Badge>;
      case 'transfer': return <Badge variant="outline">Transferencia</Badge>;
      default: return <Badge>Desconocido</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finanzas</h1>
          <p className="text-muted-foreground">
            Monitorea las finanzas de tu negocio
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Filtrar Fecha
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar Reporte
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Hoy</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${salesSummary.today.sales.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {salesSummary.today.transactions} transacciones
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Semana</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${salesSummary.week.sales.toLocaleString()}</div>
            <p className="text-xs flex items-center text-success">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +{salesSummary.week.growth}% vs semana anterior
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Mes</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${salesSummary.month.sales.toLocaleString()}</div>
            <p className="text-xs flex items-center text-success">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +{salesSummary.month.growth}% vs mes anterior
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilidad Estimada</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">$45,230</div>
            <p className="text-xs text-muted-foreground">
              Margen: 32%
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales">Ventas</TabsTrigger>
          <TabsTrigger value="payments">Métodos de Pago</TabsTrigger>
          <TabsTrigger value="expenses">Gastos</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ventas Recientes</CardTitle>
              <CardDescription>
                Últimas transacciones realizadas hoy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket</TableHead>
                    <TableHead>Hora</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead className="text-right">Importe</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentSales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell className="font-medium">{sale.id}</TableCell>
                      <TableCell>{sale.time}</TableCell>
                      <TableCell>{sale.customer}</TableCell>
                      <TableCell>{getPaymentMethodBadge(sale.method)}</TableCell>
                      <TableCell className="text-right font-medium">
                        ${sale.amount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Efectivo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${salesSummary.today.cash.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {((salesSummary.today.cash / salesSummary.today.sales) * 100).toFixed(1)}% del total
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Tarjetas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${salesSummary.today.card.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {((salesSummary.today.card / salesSummary.today.sales) * 100).toFixed(1)}% del total
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="w-5 h-5" />
                  Transferencias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${salesSummary.today.transfer.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {((salesSummary.today.transfer / salesSummary.today.sales) * 100).toFixed(1)}% del total
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gastos Recientes</CardTitle>
              <CardDescription>
                Registro de gastos y egresos del negocio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead className="text-right">Importe</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">{expense.id}</TableCell>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{expense.category}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium text-destructive">
                        -${expense.amount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Reportes Disponibles</CardTitle>
                <CardDescription>
                  Genera reportes detallados para análisis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Reporte de Ventas Diario
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <PieChart className="w-4 h-4 mr-2" />
                  Análisis de Productos
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Reporte Financiero Mensual
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Receipt className="w-4 h-4 mr-2" />
                  Reporte Fiscal (IVA)
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Próximas Funciones</CardTitle>
                <CardDescription>
                  Características en desarrollo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm">Gráficos interactivos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm">Predicciones de venta</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm">Análisis de rentabilidad</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm">Comparativas históricas</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}