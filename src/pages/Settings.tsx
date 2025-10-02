import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings as SettingsIcon, Palette, Bell, FileText, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const colorThemes = [
  { name: 'Azul', value: 'blue', primary: 'hsl(221, 83%, 53%)' },
  { name: 'Verde', value: 'green', primary: 'hsl(142, 76%, 36%)' },
  { name: 'Morado', value: 'purple', primary: 'hsl(262, 83%, 58%)' },
  { name: 'Naranja', value: 'orange', primary: 'hsl(25, 95%, 53%)' },
  { name: 'Rosa', value: 'pink', primary: 'hsl(330, 81%, 60%)' },
];

export default function Settings() {
  const { toast } = useToast();
  const [selectedTheme, setSelectedTheme] = useState('blue');
  const [reportFrequency, setReportFrequency] = useState('daily');
  const [autoBackup, setAutoBackup] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [lowStockAlerts, setLowStockAlerts] = useState(true);
  const [salesSummary, setSalesSummary] = useState(true);

  const handleSaveSettings = () => {
    const settings = {
      theme: selectedTheme,
      reportFrequency,
      autoBackup,
      emailNotifications,
      lowStockAlerts,
      salesSummary
    };
    
    localStorage.setItem('appSettings', JSON.stringify(settings));
    
    toast({
      title: 'Configuración Guardada',
      description: 'Tus preferencias han sido actualizadas'
    });
  };

  const applyTheme = (theme: string) => {
    const themeData = colorThemes.find(t => t.value === theme);
    if (themeData) {
      document.documentElement.style.setProperty('--primary', themeData.primary);
      setSelectedTheme(theme);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Configuración</h1>
        <p className="text-muted-foreground mt-1">Personaliza tu experiencia en el sistema</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Apariencia</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
        </TabsList>

        {/* General */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5" />
                Configuración General
              </CardTitle>
              <CardDescription>
                Opciones básicas del sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <Label>Respaldo Automático</Label>
                  <p className="text-sm text-muted-foreground">
                    Crear respaldos automáticos de la base de datos
                  </p>
                </div>
                <Switch
                  checked={autoBackup}
                  onCheckedChange={setAutoBackup}
                />
              </div>

              <div className="space-y-2">
                <Label>Idioma del Sistema</Label>
                <Select defaultValue="es">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="es">Español (México)</SelectItem>
                    <SelectItem value="en">English (US)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Zona Horaria</Label>
                <Select defaultValue="america-mexico">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona zona horaria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="america-mexico">América/México (GMT-6)</SelectItem>
                    <SelectItem value="america-tijuana">América/Tijuana (GMT-7)</SelectItem>
                    <SelectItem value="america-cancun">América/Cancún (GMT-5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Apariencia */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Personalización de Interfaz
              </CardTitle>
              <CardDescription>
                Cambia los colores y el aspecto del sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Tema de Color</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {colorThemes.map((theme) => (
                    <button
                      key={theme.value}
                      onClick={() => applyTheme(theme.value)}
                      className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                        selectedTheme === theme.value
                          ? 'border-primary ring-2 ring-primary/20'
                          : 'border-border'
                      }`}
                    >
                      <div
                        className="w-full h-12 rounded mb-2"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <p className="text-xs font-medium text-center">{theme.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Densidad de la Interfaz</Label>
                <Select defaultValue="comfortable">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona densidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compacta</SelectItem>
                    <SelectItem value="comfortable">Cómoda</SelectItem>
                    <SelectItem value="spacious">Espaciosa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tamaño de Fuente</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tamaño" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Pequeña</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reportes */}
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Configuración de Reportes
              </CardTitle>
              <CardDescription>
                Define la frecuencia y tipo de reportes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Frecuencia de Reportes Automáticos</Label>
                <Select value={reportFrequency} onValueChange={setReportFrequency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona frecuencia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Diario</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="monthly">Mensual</SelectItem>
                    <SelectItem value="custom">Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Formato de Exportación</Label>
                <Select defaultValue="pdf">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <Label>Resumen de Ventas</Label>
                  <p className="text-sm text-muted-foreground">
                    Incluir resumen en reportes automáticos
                  </p>
                </div>
                <Switch
                  checked={salesSummary}
                  onCheckedChange={setSalesSummary}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notificaciones */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notificaciones
              </CardTitle>
              <CardDescription>
                Configura las alertas y notificaciones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <Label>Notificaciones por Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Recibir alertas importantes por correo
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <Label>Alertas de Stock Bajo</Label>
                  <p className="text-sm text-muted-foreground">
                    Notificar cuando productos estén por agotarse
                  </p>
                </div>
                <Switch
                  checked={lowStockAlerts}
                  onCheckedChange={setLowStockAlerts}
                />
              </div>

              <div className="space-y-2">
                <Label>Email para Notificaciones</Label>
                <input
                  type="email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="admin@empresa.com"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} size="lg">
          Guardar Configuración
        </Button>
      </div>
    </div>
  );
}
