import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Receipt,
  Users,
  UserCog,
  Settings,
  TrendingUp,
  Building2,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Truck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Punto de Venta', url: '/pos', icon: ShoppingCart },
  { title: 'Resumen de Ventas', url: '/sales-summary', icon: Receipt },
  { title: 'Inventario', url: '/inventory', icon: Package },
  { title: 'Clientes', url: '/customers', icon: Users },
  { title: 'Proveedores', url: '/suppliers', icon: Truck },
  { title: 'Facturación', url: '/billing', icon: Receipt },
  { title: 'Finanzas', url: '/finances', icon: TrendingUp },
  { title: 'Usuarios', url: '/users', icon: UserCog },
  { title: 'Empresa', url: '/company', icon: Building2 },
  { title: 'Configuración', url: '/settings', icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { user, logout } = useAuth();
  const location = useLocation();
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className={collapsed ? 'w-16' : 'w-64'} collapsible="icon">
      <SidebarContent>
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-info rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-bold text-lg">POS Pro</h2>
                <p className="text-xs text-muted-foreground">{user?.name}</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Menú Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-accent hover:text-accent-foreground'
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="w-full"
          >
            <LogOut className="w-4 h-4 mr-2" />
            {!collapsed && 'Cerrar Sesión'}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}