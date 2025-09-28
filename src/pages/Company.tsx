import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Building2, 
  Upload, 
  FileText, 
  Key, 
  Save,
  Camera,
  Shield,
  Settings
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

export default function Company() {
  const { toast } = useToast();
  const [companyData, setCompanyData] = useState({
    name: 'Mi Empresa POS',
    rfc: 'XAXX010101000',
    address: 'Av. Principal 123, Ciudad, Estado',
    phone: '555-123-4567',
    email: 'contacto@miempresa.com',
    taxRegime: 'general',
    logo: null as File | null,
    certificate: null as File | null,
    privateKey: null as File | null,
  });

  const handleSave = () => {
    toast({
      title: 'Datos guardados',
      description: 'La información de la empresa se ha actualizado correctamente',
    });
  };

  const handleFileUpload = (type: 'logo' | 'certificate' | 'privateKey') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCompanyData(prev => ({ ...prev, [type]: file }));
      toast({
        title: 'Archivo cargado',
        description: `${file.name} se ha cargado correctamente`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración de Empresa</h1>
        <p className="text-muted-foreground">
          Configura los datos fiscales y generales de tu empresa
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Datos Generales</TabsTrigger>
          <TabsTrigger value="fiscal">Información Fiscal</TabsTrigger>
          <TabsTrigger value="certificates">Certificados Digitales</TabsTrigger>
          <TabsTrigger value="branding">Imagen Corporativa</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Información General
              </CardTitle>
              <CardDescription>
                Datos básicos de tu empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nombre de la Empresa</Label>
                  <Input
                    id="company-name"
                    value={companyData.name}
                    onChange={(e) => setCompanyData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nombre o Razón Social"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-phone">Teléfono</Label>
                  <Input
                    id="company-phone"
                    value={companyData.phone}
                    onChange={(e) => setCompanyData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="555-123-4567"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company-email">Email Corporativo</Label>
                <Input
                  id="company-email"
                  type="email"
                  value={companyData.email}
                  onChange={(e) => setCompanyData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="contacto@empresa.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company-address">Dirección Fiscal</Label>
                <Textarea
                  id="company-address"
                  value={companyData.address}
                  onChange={(e) => setCompanyData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Dirección completa incluyendo código postal"
                  rows={3}
                />
              </div>
              
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Guardar Datos Generales
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fiscal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Información Fiscal
              </CardTitle>
              <CardDescription>
                Datos fiscales para facturación electrónica
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rfc">RFC</Label>
                  <Input
                    id="rfc"
                    value={companyData.rfc}
                    onChange={(e) => setCompanyData(prev => ({ ...prev, rfc: e.target.value.toUpperCase() }))}
                    placeholder="XAXX010101000"
                    maxLength={13}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-regime">Régimen Fiscal</Label>
                  <Select value={companyData.taxRegime} onValueChange={(value) => setCompanyData(prev => ({ ...prev, taxRegime: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar régimen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Régimen General de Ley Personas Morales</SelectItem>
                      <SelectItem value="simplified">Régimen Simplificado de Confianza</SelectItem>
                      <SelectItem value="incorporated">Personas Físicas con Actividades Empresariales</SelectItem>
                      <SelectItem value="professional">Régimen de Actividades Profesionales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Información Importante</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• El RFC debe estar activo en el SAT</li>
                  <li>• La dirección fiscal debe coincidir con la registrada en el SAT</li>
                  <li>• El régimen fiscal debe ser el correcto según tu situación</li>
                </ul>
              </div>
              
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Guardar Información Fiscal
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                Certificados Digitales
              </CardTitle>
              <CardDescription>
                Certificados para firma digital de facturas (archivos .cer y .key)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Certificado (.cer)</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Shield className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      {companyData.certificate ? companyData.certificate.name : 'Arrastra tu archivo .cer aquí'}
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <label htmlFor="certificate-upload" className="cursor-pointer">
                        <Upload className="w-4 h-4 mr-2" />
                        Seleccionar Archivo
                      </label>
                    </Button>
                    <input
                      id="certificate-upload"
                      type="file"
                      accept=".cer"
                      className="hidden"
                      onChange={handleFileUpload('certificate')}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Llave Privada (.key)</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Key className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      {companyData.privateKey ? companyData.privateKey.name : 'Arrastra tu archivo .key aquí'}
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <label htmlFor="private-key-upload" className="cursor-pointer">
                        <Upload className="w-4 h-4 mr-2" />
                        Seleccionar Archivo
                      </label>
                    </Button>
                    <input
                      id="private-key-upload"
                      type="file"
                      accept=".key"
                      className="hidden"
                      onChange={handleFileUpload('privateKey')}
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <h4 className="font-medium text-destructive mb-2">Seguridad de Certificados</h4>
                <ul className="text-sm text-destructive/80 space-y-1">
                  <li>• Los certificados se almacenan de forma segura y encriptada</li>
                  <li>• Nunca compartas tus archivos .key con terceros</li>
                  <li>• Verifica que los certificados estén vigentes</li>
                </ul>
              </div>
              
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Guardar Certificados
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Imagen Corporativa
              </CardTitle>
              <CardDescription>
                Logo y elementos visuales para tickets y facturas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Logo de la Empresa</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    {companyData.logo ? companyData.logo.name : 'Sube el logo de tu empresa'}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Formatos: PNG, JPG, SVG (Máximo 2MB)
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <label htmlFor="logo-upload" className="cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Seleccionar Logo
                    </label>
                  </Button>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload('logo')}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Vista Previa - Ticket</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white p-4 border rounded text-black text-sm">
                      <div className="text-center mb-2">
                        <div className="w-16 h-8 bg-gray-200 mx-auto mb-2 rounded"></div>
                        <strong>{companyData.name}</strong><br />
                        RFC: {companyData.rfc}<br />
                        {companyData.address}
                      </div>
                      <div className="border-t border-dashed my-2"></div>
                      <div>Ticket: #001</div>
                      <div>Fecha: {new Date().toLocaleDateString()}</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Vista Previa - Factura</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white p-4 border rounded text-black text-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="w-12 h-6 bg-gray-200 mb-1 rounded"></div>
                          <strong>{companyData.name}</strong>
                        </div>
                        <div className="text-right">
                          <div>FACTURA</div>
                          <div>Serie: A</div>
                          <div>Folio: 001</div>
                        </div>
                      </div>
                      <div className="text-xs">
                        RFC: {companyData.rfc}<br />
                        {companyData.address}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Guardar Imagen Corporativa
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}