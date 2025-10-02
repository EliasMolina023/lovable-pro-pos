import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Key, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Activation() {
  const { toast } = useToast();
  const [licenseName, setLicenseName] = useState('');
  const [licenseKey, setLicenseKey] = useState('');
  const [isActivated, setIsActivated] = useState(false);
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    // Simular licencia guardada
    const savedLicense = localStorage.getItem('license');
    if (savedLicense) {
      const license = JSON.parse(savedLicense);
      setLicenseName(license.name);
      setLicenseKey(license.key);
      setIsActivated(license.activated);
      setExpiryDate(new Date(license.expiryDate));
    }
  }, []);

  useEffect(() => {
    if (expiryDate) {
      const interval = setInterval(() => {
        const now = new Date();
        const diff = expiryDate.getTime() - now.getTime();
        
        if (diff <= 0) {
          setTimeRemaining('Licencia expirada');
          setIsActivated(false);
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          setTimeRemaining(`${days} días, ${hours} horas`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [expiryDate]);

  const handleActivate = () => {
    if (!licenseName || !licenseKey) {
      toast({
        title: 'Error',
        description: 'Por favor ingresa el nombre y la clave de licencia',
        variant: 'destructive'
      });
      return;
    }

    // Simular activación (en producción, esto iría a un servidor)
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 365); // 1 año de licencia

    const license = {
      name: licenseName,
      key: licenseKey,
      activated: true,
      expiryDate: expiry.toISOString()
    };

    localStorage.setItem('license', JSON.stringify(license));
    setIsActivated(true);
    setExpiryDate(expiry);

    toast({
      title: 'Licencia Activada',
      description: 'Tu licencia ha sido activada exitosamente'
    });
  };

  const handleDeactivate = () => {
    localStorage.removeItem('license');
    setLicenseName('');
    setLicenseKey('');
    setIsActivated(false);
    setExpiryDate(null);
    setTimeRemaining('');

    toast({
      title: 'Licencia Desactivada',
      description: 'La licencia ha sido desactivada'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Activación de Licencia</h1>
        <p className="text-muted-foreground mt-1">Gestiona tu licencia del sistema</p>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Estado de Licencia */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isActivated ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-orange-500" />
              )}
              Estado de Licencia
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Estado:</span>
              <Badge variant={isActivated ? 'default' : 'secondary'}>
                {isActivated ? 'Activa' : 'Inactiva'}
              </Badge>
            </div>

            {isActivated && expiryDate && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Expira:</span>
                  <span className="text-sm font-medium">
                    {expiryDate.toLocaleDateString('es-MX')}
                  </span>
                </div>

                <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Tiempo restante</p>
                    <p className="text-sm font-semibold">{timeRemaining}</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Formulario de Activación */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              Activar Licencia
            </CardTitle>
            <CardDescription>
              Ingresa los datos de tu licencia
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="licenseName">Nombre de Licencia</Label>
              <Input
                id="licenseName"
                placeholder="Ej: POS Pro - Empresa XYZ"
                value={licenseName}
                onChange={(e) => setLicenseName(e.target.value)}
                disabled={isActivated}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="licenseKey">Clave de Licencia</Label>
              <Input
                id="licenseKey"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                disabled={isActivated}
              />
            </div>

            {isActivated ? (
              <Button 
                onClick={handleDeactivate} 
                variant="destructive" 
                className="w-full"
              >
                Desactivar Licencia
              </Button>
            ) : (
              <Button 
                onClick={handleActivate} 
                className="w-full"
              >
                Activar Licencia
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Información de Contacto */}
      <Card>
        <CardHeader>
          <CardTitle>¿Necesitas una Licencia?</CardTitle>
          <CardDescription>
            Contacta con nuestro equipo de ventas para adquirir o renovar tu licencia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground mt-1">ventas@pospro.com</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm font-medium">Teléfono</p>
              <p className="text-sm text-muted-foreground mt-1">+52 (555) 123-4567</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm font-medium">Horario</p>
              <p className="text-sm text-muted-foreground mt-1">Lun-Vie 9:00-18:00</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
