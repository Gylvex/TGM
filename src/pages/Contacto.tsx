import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Contacto = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      title: "Teléfono / WhatsApp",
      content: "+57 300 123 4567",
      link: "https://wa.me/573001234567",
    },
    {
      icon: Mail,
      title: "Correo Electrónico",
      content: "ventas@tiendagamermde.com",
      link: "mailto:ventas@tiendagamermde.com",
    },
    {
      icon: MapPin,
      title: "Ubicación",
      content: "Medellín, Antioquia, Colombia",
      link: null,
    },
    {
      icon: Clock,
      title: "Horario de Atención",
      content: "Lun-Vie: 9AM-7PM | Sáb: 9AM-5PM",
      link: null,
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // Usando Formspree (endpoint de ejemplo - el usuario deberá crear su cuenta en formspree.io)
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        toast({
          title: "¡Mensaje enviado!",
          description: "Te contactaremos en un plazo máximo de 24 horas hábiles.",
        });
        form.reset();
      } else {
        throw new Error("Error al enviar el formulario");
      }
    } catch (error) {
      toast({
        title: "Error al enviar",
        description: "Por favor, intenta de nuevo o contáctanos por WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-hero border-b border-border/50">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary">Contáctanos</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Escríbenos y te responderemos lo más pronto posible
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-bold mb-6">Información de Contacto</h2>
            <div className="space-y-6">
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <Card key={index} className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold mb-1">{info.title}</p>
                          {info.link ? (
                            <a
                              href={info.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                              {info.content}
                            </a>
                          ) : (
                            <p className="text-sm text-muted-foreground">{info.content}</p>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <Card className="p-6 bg-accent/10 border-accent/30">
              <MessageCircle className="h-10 w-10 text-accent mb-4" />
              <h3 className="font-bold text-lg mb-2">¿Necesitas ayuda inmediata?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Chatea con nosotros por WhatsApp y obtén respuesta en minutos
              </p>
              <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <a
                  href="https://wa.me/573001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir WhatsApp
                </a>
              </Button>
            </Card>

            {/* Social Media */}
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">Síguenos en redes</h3>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  📷
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  👤
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                >
                  <span className="sr-only">YouTube</span>
                  ▶️
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                >
                  <span className="sr-only">TikTok</span>
                  🎵
                </a>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Tu nombre"
                      required
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      required
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono / WhatsApp</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+57 300 123 4567"
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Asunto *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="¿En qué podemos ayudarte?"
                      required
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Cuéntanos qué necesitas..."
                    required
                    rows={6}
                    className="bg-background resize-none"
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    required
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                    Acepto el tratamiento de mis datos personales según la{" "}
                    <a href="#" className="text-primary hover:underline">
                      política de privacidad
                    </a>
                  </Label>
                </div>

                <Button type="submit" size="lg" className="w-full shadow-glow-primary" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  Responderemos tu mensaje en un plazo máximo de 24 horas hábiles
                </p>
              </form>
            </Card>

            {/* Map Placeholder */}
            <Card className="mt-8 p-6">
              <h3 className="font-bold text-lg mb-4">Nuestra Ubicación</h3>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Medellín, Antioquia</p>
                  <p className="text-sm text-muted-foreground">
                    Contáctanos para conocer nuestra dirección exacta
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
