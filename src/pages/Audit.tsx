import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Shield, Search, Filter, Download, Eye, User, Clock } from 'lucide-react';

// Datos de ejemplo de auditoría
const mockAuditLogs = [
  {
    id: 1,
    timestamp: '2025-10-02 10:30:45',
    user: 'Juan Pérez',
    role: 'admin',
    action: 'login',
    description: 'Inicio de sesión exitoso',
    ipAddress: '192.168.1.100',
    severity: 'info'
  },
  {
    id: 2,
    timestamp: '2025-10-02 10:35:12',
    user: 'María García',
    role: 'cashier',
    action: 'sale_created',
    description: 'Venta registrada - Total: $1,234.00',
    ipAddress: '192.168.1.101',
    severity: 'info'
  },
  {
    id: 3,
    timestamp: '2025-10-02 11:15:30',
    user: 'Juan Pérez',
    role: 'admin',
    action: 'user_created',
    description: 'Usuario creado: Carlos López',
    ipAddress: '192.168.1.100',
    severity: 'warning'
  },
  {
    id: 4,
    timestamp: '2025-10-02 11:45:00',
    user: 'Pedro Ramírez',
    role: 'warehouse',
    action: 'inventory_updated',
    description: 'Actualización de inventario - Producto: ABC123',
    ipAddress: '192.168.1.102',
    severity: 'info'
  },
  {
    id: 5,
    timestamp: '2025-10-02 12:20:18',
    user: 'María García',
    role: 'cashier',
    action: 'refund_processed',
    description: 'Devolución procesada - Ticket: #12345',
    ipAddress: '192.168.1.101',
    severity: 'warning'
  },
  {
    id: 6,
    timestamp: '2025-10-02 13:00:00',
    user: 'Sistema',
    role: 'system',
    action: 'backup_completed',
    description: 'Respaldo automático completado',
    ipAddress: 'localhost',
    severity: 'info'
  },
  {
    id: 7,
    timestamp: '2025-10-02 14:30:45',
    user: 'Juan Pérez',
    role: 'admin',
    action: 'settings_changed',
    description: 'Configuración modificada - Reportes automáticos',
    ipAddress: '192.168.1.100',
    severity: 'warning'
  },
  {
    id: 8,
    timestamp: '2025-10-02 15:10:22',
    user: 'Desconocido',
    role: 'unknown',
    action: 'failed_login',
    description: 'Intento de inicio de sesión fallido',
    ipAddress: '203.0.113.45',
    severity: 'error'
  }
];

const actionLabels: Record<string, string> = {
  login: 'Inicio de sesión',
  logout: 'Cierre de sesión',
  sale_created: 'Venta creada',
  user_created: 'Usuario creado',
  user_updated: 'Usuario actualizado',
  user_deleted: 'Usuario eliminado',
  inventory_updated: 'Inventario actualizado',
  refund_processed: 'Devolución procesada',
  backup_completed: 'Respaldo completado',
  settings_changed: 'Configuración modificada',
  failed_login: 'Login fallido'
};

const severityVariants: Record<string, 'default' | 'secondary' | 'destructive'> = {
  info: 'default',
  warning: 'secondary',
  error: 'destructive'
};

export default function Audit() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterUser, setFilterUser] = useState('all');

  const filteredLogs = mockAuditLogs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.includes(searchTerm);
    
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    const matchesUser = filterUser === 'all' || log.user === filterUser;

    return matchesSearch && matchesAction && matchesUser;
  });

  const uniqueUsers = Array.from(new Set(mockAuditLogs.map(log => log.user)));
  const uniqueActions = Array.from(new Set(mockAuditLogs.map(log => log.action)));

  const stats = {
    total: mockAuditLogs.length,
    today: mockAuditLogs.filter(log => log.timestamp.startsWith('2025-10-02')).length,
    errors: mockAuditLogs.filter(log => log.severity === 'error').length,
    warnings: mockAuditLogs.filter(log => log.severity === 'warning').length
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Auditoría del Sistema</h1>
        <p className="text-muted-foreground mt-1">Monitoreo de actividades y acciones de usuarios</p>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Eventos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Eventos Hoy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.today}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Advertencias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{stats.warnings}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Errores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{stats.errors}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Registro de Actividades
          </CardTitle>
          <CardDescription>
            Historial completo de acciones en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por usuario, acción o IP..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterUser} onValueChange={setFilterUser}>
              <SelectTrigger className="w-full md:w-[200px]">
                <User className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filtrar por usuario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los usuarios</SelectItem>
                {uniqueUsers.map(user => (
                  <SelectItem key={user} value={user}>{user}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterAction} onValueChange={setFilterAction}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filtrar por acción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las acciones</SelectItem>
                {uniqueActions.map(action => (
                  <SelectItem key={action} value={action}>
                    {actionLabels[action] || action}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" className="w-full md:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>

          {/* Tabla de logs */}
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px]">Fecha y Hora</TableHead>
                  <TableHead className="min-w-[120px]">Usuario</TableHead>
                  <TableHead className="min-w-[150px]">Acción</TableHead>
                  <TableHead className="min-w-[250px]">Descripción</TableHead>
                  <TableHead className="min-w-[120px]">IP</TableHead>
                  <TableHead className="min-w-[100px]">Severidad</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-xs">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          {log.timestamp}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm">{log.user}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {actionLabels[log.action] || log.action}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {log.description}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {log.ipAddress}
                      </TableCell>
                      <TableCell>
                        <Badge variant={severityVariants[log.severity]}>
                          {log.severity}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No se encontraron registros
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
