import { Target, Users, Award, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

const Nosotros = () => {
  const values = [
    {
      icon: Target,
      title: "Nuestra Misión",
      description:
        "Hacer accesible la tecnología gaming de calidad para todos los colombianos, brindando productos premium a precios justos con el mejor servicio.",
    },
    {
      icon: Award,
      title: "Calidad Garantizada",
      description:
        "Trabajamos únicamente con las mejores marcas del mercado y ofrecemos garantía oficial en todos nuestros productos.",
    },
    {
      icon: Users,
      title: "Comunidad Gamer",
      description:
        "Más que una tienda, somos una comunidad de gamers apasionados que entienden tus necesidades y te acompañan en cada compra.",
    },
    {
      icon: Heart,
      title: "Pasión por el Gaming",
      description:
        "Cada miembro de nuestro equipo es gamer. Conocemos los productos porque los usamos y vivimos el gaming cada día.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10" />
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Sobre{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Tienda Gamer Medellín
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Tu aliado de confianza en el mundo del gaming. Llevamos lo mejor de la tecnología gamer a Medellín y toda Colombia.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Nuestra Historia</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Todo comenzó en 20XX, cuando un grupo de gamers apasionados de Medellín se dieron cuenta de la dificultad para encontrar productos gaming de calidad a precios justos en Colombia.
                </p>
                <p>
                  Lo que inició como una pequeña operación desde un garaje, hoy se ha convertido en una de las tiendas gaming más confiables de Medellín, con cientos de clientes satisfechos en todo el país.
                </p>
                <p>
                  Nuestro compromiso siempre ha sido el mismo: ofrecer productos de la más alta calidad, precios competitivos y un servicio al cliente excepcional.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden border-2 border-primary/30 shadow-glow-primary">
                <img
                  src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&h=600&fit=crop"
                  alt="Setup gamer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { number: "8+", label: "Años en el mercado" },
              { number: "5000+", label: "Clientes satisfechos" },
              { number: "100+", label: "Productos disponibles" },
              { number: "50+", label: "Marcas aliadas" },
            ].map((stat, index) => (
              <Card key={index} className="p-6 text-center">
                <p className="text-4xl font-bold text-primary mb-2">{stat.number}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-card/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Valores</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Los principios que nos guían en cada interacción con nuestros clientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="p-6 text-center hover:border-primary/50 transition-colors">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            ¿Por qué elegirnos?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Productos Originales",
                description:
                  "Trabajamos directamente con distribuidores oficiales. Garantizamos la autenticidad de cada producto.",
              },
              {
                title: "Mejor Precio",
                description:
                  "Precios competitivos sin sacrificar calidad. Monitoreamos el mercado constantemente.",
              },
              {
                title: "Envíos Rápidos",
                description:
                  "Despachos diarios a toda Colombia. 1-3 días a Medellín, 3-7 días al resto del país.",
              },
              {
                title: "Soporte Técnico",
                description:
                  "Equipo experto disponible por WhatsApp para asesorarte antes, durante y después de tu compra.",
              },
              {
                title: "Garantía Respaldada",
                description:
                  "Todos nuestros productos tienen garantía del fabricante. Gestionamos cualquier eventualidad.",
              },
              {
                title: "Servicio Personalizado",
                description:
                  "Te ayudamos a armar tu PC ideal según tu presupuesto y necesidades específicas.",
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-16">
        <Card className="p-8 md:p-12 text-center bg-primary/5 border-primary/30">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Listo para mejorar tu setup?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Descubre nuestro catálogo completo o contáctanos para asesoría personalizada
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/tienda"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Ver catálogo
            </a>
            <a
              href="https://wa.me/573001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border-2 border-primary px-8 py-3 font-semibold hover:bg-primary/10 transition-colors"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Nosotros;
