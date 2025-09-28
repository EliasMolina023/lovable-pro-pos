import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  Package, 
  Receipt, 
  TrendingUp, 
  Users, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  {
    title: 'Ventas Hoy',
    value: '$15,230.00',
    change: '+12.5%',
    icon: DollarSign,
    trend: 'up',
  },
  {
    title: 'Productos Vendidos',
    value: '126',
    change: '+8.2%',
    icon: Package,
    trend: 'up',
  },
  {
    title: 'Tickets Generados',
    value: '45',
    change: '-2.1%',
    icon: Receipt,
    trend: 'down',
  },
  {
    title: 'Productos Bajo Stock',
    value: '8',
    change: '+3',
    icon: Activity,
    trend: 'up',
  },
];

const quickActions = [
  {
    title: 'Nueva Venta',
    description: 'Iniciar proceso de venta',
    icon: ShoppingCart,
    href: '/pos',
    color: 'from-primary to-info',
  },
  {
    title: 'Gestionar Inventario',
    description: 'Ver y editar productos',
    icon: Package,
    href: '/inventory',
    color: 'from-success to-success',
  },
  {
    title: 'Crear Factura',
    description: 'Generar factura electrónica',
    icon: Receipt,
    href: '/billing',
    color: 'from-warning to-warning',
  },
  {
    title: 'Ver Reportes',
    description: 'Analizar ventas y finanzas',
    icon: TrendingUp,
    href: '/finances',
    color: 'from-info to-primary',
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Resumen general de tu negocio
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs flex items-center ${
                stat.trend === 'up' ? 'text-success' : 'text-destructive'
              }`}>
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                {stat.change} desde ayer
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>
            Accede rápidamente a las funciones más utilizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <Link key={action.title} to={action.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ventas Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 'V-001', amount: '$234.50', time: '10:30 AM', customer: 'Cliente General' },
                { id: 'V-002', amount: '$89.99', time: '10:45 AM', customer: 'María García' },
                { id: 'V-003', amount: '$156.75', time: '11:15 AM', customer: 'Cliente General' },
              ].map((sale) => (
                <div key={sale.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{sale.id}</p>
                    <p className="text-xs text-muted-foreground">{sale.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{sale.amount}</p>
                    <p className="text-xs text-muted-foreground">{sale.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Productos Populares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Coca Cola 600ml', sold: 25, revenue: '$625.00' },
                { name: 'Pan Blanco', sold: 18, revenue: '$180.00' },
                { name: 'Leche Entera 1L', sold: 15, revenue: '$315.00' },
              ].map((product) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.sold} vendidos</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}