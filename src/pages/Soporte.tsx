import { Truck, ShieldCheck, Package, HelpCircle, MessageCircle, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const Soporte = () => {
  const infoCards = [
    {
      icon: Truck,
      title: "Envíos",
      description: "Información sobre tiempos y costos de envío",
    },
    {
      icon: ShieldCheck,
      title: "Garantías",
      description: "Cómo funciona la garantía de nuestros productos",
    },
    {
      icon: Package,
      title: "Devoluciones",
      description: "Política de devoluciones y cambios",
    },
  ];

  const faqs = [
    {
      question: "¿Cuánto tarda el envío?",
      answer:
        "Los envíos a Medellín tardan de 1 a 3 días hábiles. Para el resto de Colombia, el tiempo estimado es de 3 a 7 días hábiles. Realizamos despachos de lunes a viernes. Los pedidos realizados después de las 2:00 PM se procesan al día siguiente.",
    },
    {
      question: "¿Tienen garantía los productos?",
      answer:
        "Sí, todos nuestros productos cuentan con garantía del fabricante. El tiempo de garantía varía según el producto y la marca, pero generalmente va desde 1 año hasta 3 años. En caso de presentarse algún problema cubierto por garantía, nosotros gestionamos todo el proceso con el fabricante.",
    },
    {
      question: "¿Qué pasa si mi producto llega dañado?",
      answer:
        "Si tu producto llega dañado o defectuoso, tienes 5 días hábiles desde la recepción para reportarlo. Contáctanos inmediatamente por WhatsApp con fotos y video del problema. Gestionaremos el reemplazo o reembolso completo sin costo adicional para ti.",
    },
    {
      question: "¿Hacen envíos a toda Colombia?",
      answer:
        "Sí, realizamos envíos a todo el territorio nacional. Trabajamos con transportadoras confiables que llegan a la mayoría de municipios. El costo del envío varía según el destino y el peso del paquete. Los envíos son gratis para compras superiores a $200.000 dentro de Medellín.",
    },
    {
      question: "¿Puedo recoger mi pedido en tienda física?",
      answer:
        "Sí, ofrecemos la opción de recogida en nuestra ubicación en Medellín. Al realizar tu pedido, selecciona 'Recoger en tienda' y te notificaremos cuando esté listo. La recogida está disponible de lunes a viernes de 9:00 AM a 7:00 PM y sábados de 9:00 AM a 5:00 PM.",
    },
    {
      question: "¿Qué métodos de pago aceptan?",
      answer:
        "Aceptamos múltiples métodos de pago: PSE, tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencias bancarias y contraentrega (con recargo adicional). Todos nuestros pagos online son 100% seguros.",
    },
    {
      question: "¿Puedo cambiar o devolver un producto?",
      answer:
        "Sí, aceptamos cambios y devoluciones dentro de los primeros 5 días hábiles posteriores a la compra, siempre que el producto esté en su empaque original, sin uso y con todos sus accesorios. No aplica para productos personalizados o software. Los costos de envío de devolución corren por cuenta del cliente, excepto si el producto llegó defectuoso.",
    },
    {
      question: "¿Ofrecen asesoría para armar mi PC?",
      answer:
        "¡Absolutamente! Nuestro equipo de expertos está disponible por WhatsApp para ayudarte a elegir los componentes ideales según tu presupuesto y necesidades. También ofrecemos servicio de armado profesional con costo adicional. Contáctanos y con gusto te asesoramos.",
    },
    {
      question: "¿Los precios incluyen IVA?",
      answer:
        "Sí, todos los precios publicados en nuestra tienda ya incluyen el IVA. El precio que ves es el precio final que pagarás (más el costo de envío si aplica).",
    },
    {
      question: "¿Cómo puedo rastrear mi pedido?",
      answer:
        "Una vez despachado tu pedido, recibirás un número de guía por WhatsApp y correo electrónico. Con este número podrás hacer seguimiento en tiempo real del estado de tu envío en la página de la transportadora. También puedes escribirnos en cualquier momento para consultar el estado de tu pedido.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-hero border-b border-border/50">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Centro de <span className="text-primary">Soporte</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Encuentra respuestas a tus preguntas sobre envíos, garantías y más
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {infoCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card
                key={index}
                className="p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Shipping Info */}
      <section id="envios" className="bg-card/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Truck className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Información de Envíos</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Tiempos de Entrega
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Medellín: 1-3 días hábiles</li>
                  <li>• Principales ciudades: 3-5 días hábiles</li>
                  <li>• Resto de Colombia: 5-7 días hábiles</li>
                  <li>• Zonas remotas: 7-10 días hábiles</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Costos de Envío
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Envío gratis en compras &gt; $200.000 (Medellín)</li>
                  <li>• Medellín: desde $10.000</li>
                  <li>• Nacional: desde $15.000</li>
                  <li>• Tarifa variable según peso y destino</li>
                </ul>
              </Card>
            </div>

            <Card className="p-6 bg-primary/5 border-primary/30">
              <p className="text-sm leading-relaxed">
                <strong>Nota importante:</strong> Los tiempos de entrega son estimados y pueden variar según disponibilidad de producto, condiciones climáticas o situaciones de fuerza mayor. Todos los envíos cuentan con seguro contra daños o extravío.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">Preguntas Frecuentes</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-lg border border-border/50 px-6"
              >
                <AccordionTrigger className="text-left font-semibold hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Support */}
      <section className="container mx-auto px-4 pb-16">
        <Card className="p-8 md:p-12 text-center bg-primary/5 border-primary/30 max-w-3xl mx-auto">
          <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Aún tienes dudas?
          </h2>
          <p className="text-muted-foreground mb-6">
            Nuestro equipo de soporte está disponible para ayudarte por WhatsApp de lunes a sábado
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-2 shadow-glow-primary">
              <a
                href="https://wa.me/573001234567"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
                Contactar por WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="mailto:soporte@tiendagamermde.com">
                Enviar correo
              </a>
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Soporte;
