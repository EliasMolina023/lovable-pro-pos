import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarDays, Filter, Download, Receipt, RefreshCw, Ban } from "lucide-react";

// Mock data for sales summary
const salesData = [
  {
    id: "VEN-001",
    type: "sale",
    date: "2024-01-15 14:30",
    customer: "Juan Pérez",
    total: 1250.00,
    paymentMethod: "card",
    status: "completed",
    items: 3
  },
  {
    id: "REM-001",
    type: "remission",
    date: "2024-01-15 11:20",
    customer: "María García",
    total: 780.50,
    paymentMethod: "pending",
    status: "pending",
    items: 2
  },
  {
    id: "DEV-001",
    type: "return",
    date: "2024-01-15 09:15",
    customer: "Carlos López",
    total: -320.00,
    paymentMethod: "cash",
    status: "completed",
    items: 1
  },
  {
    id: "VEN-002",
    type: "sale",
    date: "2024-01-14 16:45",
    customer: "Ana Martínez",
    total: 2100.75,
    paymentMethod: "transfer",
    status: "completed",
    items: 5
  },
  {
    id: "CAN-001",
    type: "cancellation",
    date: "2024-01-14 13:30",
    customer: "Roberto Silva",
    total: -450.00,
    paymentMethod: "card",
    status: "cancelled",
    items: 2
  }
];

const summaryStats = {
  totalSales: 15,
  totalAmount: 18750.25,
  totalReturns: 3,
  returnAmount: -1120.00,
  totalRemissions: 8,
  remissionAmount: 5640.50
};

export default function SalesSummary() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "sale":
        return <Receipt className="w-4 h-4" />;
      case "return":
        return <RefreshCw className="w-4 h-4" />;
      case "cancellation":
        return <Ban className="w-4 h-4" />;
      default:
        return <Receipt className="w-4 h-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "sale":
        return <Badge variant="default">Venta</Badge>;
      case "remission":
        return <Badge variant="secondary">Remisión</Badge>;
      case "return":
        return <Badge variant="destructive">Devolución</Badge>;
      case "cancellation":
        return <Badge variant="outline">Cancelación</Badge>;
      default:
        return <Badge variant="default">{type}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Completado</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Pendiente</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentMethodBadge = (method: string) => {
    switch (method) {
      case "cash":
        return <Badge variant="outline">Efectivo</Badge>;
      case "card":
        return <Badge variant="outline">Tarjeta</Badge>;
      case "transfer":
        return <Badge variant="outline">Transferencia</Badge>;
      case "pending":
        return <Badge variant="secondary">Pendiente</Badge>;
      default:
        return <Badge variant="outline">{method}</Badge>;
    }
  };

  return (
    <div className="space-y-4 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Resumen de Ventas</h1>
          <p className="text-muted-foreground">
            Historial completo de transacciones y movimientos
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <CalendarDays className="w-4 h-4 mr-2" />
            Filtrar fechas
          </Button>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Ventas Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${summaryStats.totalAmount.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">{summaryStats.totalSales} transacciones</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Devoluciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${Math.abs(summaryStats.returnAmount).toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">{summaryStats.totalReturns} devoluciones</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Remisiones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">${summaryStats.remissionAmount.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">{summaryStats.totalRemissions} pendientes</p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Transacciones</CardTitle>
          <CardDescription>
            Detalle de todas las operaciones realizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="sales">Ventas</TabsTrigger>
              <TabsTrigger value="remissions">Remisiones</TabsTrigger>
              <TabsTrigger value="returns">Devoluciones</TabsTrigger>
              <TabsTrigger value="cancellations">Cancelaciones</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <ScrollArea className="h-[400px]">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[100px]">ID</TableHead>
                        <TableHead className="min-w-[100px]">Tipo</TableHead>
                        <TableHead className="min-w-[120px]">Fecha</TableHead>
                        <TableHead className="min-w-[120px]">Cliente</TableHead>
                        <TableHead className="min-w-[100px]">Total</TableHead>
                        <TableHead className="min-w-[120px]">Pago</TableHead>
                        <TableHead className="min-w-[100px]">Estado</TableHead>
                        <TableHead className="min-w-[80px]">Items</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {salesData.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                          <TableCell className="text-sm">{transaction.date}</TableCell>
                          <TableCell>{transaction.customer}</TableCell>
                          <TableCell className={transaction.total < 0 ? "text-red-600" : "text-green-600"}>
                            ${Math.abs(transaction.total).toLocaleString()}
                          </TableCell>
                          <TableCell>{getPaymentMethodBadge(transaction.paymentMethod)}</TableCell>
                          <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                          <TableCell>{transaction.items}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Other tabs would filter the data accordingly */}
            <TabsContent value="sales" className="mt-4">
              <ScrollArea className="h-[400px]">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Pago</TableHead>
                        <TableHead>Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {salesData.filter(t => t.type === 'sale').map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell className="text-sm">{transaction.date}</TableCell>
                          <TableCell>{transaction.customer}</TableCell>
                          <TableCell className="text-green-600">
                            ${transaction.total.toLocaleString()}
                          </TableCell>
                          <TableCell>{getPaymentMethodBadge(transaction.paymentMethod)}</TableCell>
                          <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
