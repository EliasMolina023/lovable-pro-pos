import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Phone, Mail, MapPin, Send, HelpCircle, Book } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Support() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simular envío de formulario
    toast({
      title: 'Mensaje Enviado',
      description: 'Nos pondremos en contacto contigo pronto'
    });

    // Limpiar formulario
    setFormData({
      name: '',
      email: '',
      phone: '',
      category: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Soporte Técnico</h1>
        <p className="text-muted-foreground mt-1">Estamos aquí para ayudarte</p>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Información de Contacto */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contacto Directo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Teléfono</p>
                  <p className="text-sm text-muted-foreground">+52 (555) 123-4567</p>
                  <p className="text-xs text-muted-foreground mt-1">Lun-Vie 9:00-18:00</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Email</p>
                  <p className="text-sm text-muted-foreground">soporte@pospro.com</p>
                  <p className="text-xs text-muted-foreground mt-1">Respuesta en 24hrs</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Chat en Vivo</p>
                  <p className="text-sm text-muted-foreground">Lun-Vie 9:00-18:00</p>
                  <Button variant="link" className="h-auto p-0 text-xs mt-1">
                    Iniciar chat
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Oficinas</p>
                  <p className="text-sm text-muted-foreground">
                    Av. Reforma 123<br />
                    CDMX, México 06600
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Recursos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Book className="w-4 h-4 mr-2" />
                Centro de Ayuda
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Preguntas Frecuentes
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Book className="w-4 h-4 mr-2" />
                Guía de Usuario
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Formulario de Contacto */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Envíanos un Mensaje
              </CardTitle>
              <CardDescription>
                Completa el formulario y nos pondremos en contacto contigo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo *</Label>
                    <Input
                      id="name"
                      placeholder="Juan Pérez"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="juan@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="555-123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({...formData, category: value})}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Soporte Técnico</SelectItem>
                        <SelectItem value="billing">Facturación</SelectItem>
                        <SelectItem value="license">Licencias</SelectItem>
                        <SelectItem value="training">Capacitación</SelectItem>
                        <SelectItem value="feature">Solicitud de Funcionalidad</SelectItem>
                        <SelectItem value="bug">Reporte de Error</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Asunto *</Label>
                  <Input
                    id="subject"
                    placeholder="Breve descripción del problema"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje *</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe tu problema o consulta con el mayor detalle posible..."
                    className="min-h-[150px]"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button type="submit" className="flex-1">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensaje
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      category: '',
                      subject: '',
                      message: ''
                    })}
                  >
                    Limpiar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Horarios de Atención */}
      <Card>
        <CardHeader>
          <CardTitle>Horarios de Atención</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 border rounded-lg">
              <p className="font-medium">Soporte Telefónico</p>
              <p className="text-sm text-muted-foreground mt-1">Lun-Vie: 9:00 - 18:00</p>
              <p className="text-sm text-muted-foreground">Sáb: 10:00 - 14:00</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="font-medium">Chat en Vivo</p>
              <p className="text-sm text-muted-foreground mt-1">Lun-Vie: 9:00 - 18:00</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="font-medium">Email</p>
              <p className="text-sm text-muted-foreground mt-1">24/7</p>
              <p className="text-sm text-muted-foreground">Respuesta en 24hrs</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="font-medium">Emergencias</p>
              <p className="text-sm text-muted-foreground mt-1">24/7</p>
              <p className="text-sm text-muted-foreground">Solo clientes Premium</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
