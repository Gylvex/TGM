import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Monitor, Cpu, Gamepad2, Laptop, Target, Sparkles, ShieldCheck, Truck, CreditCard, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/home/CategoryCard";
import { ProductCard } from "@/components/products/ProductCard";
import { getFeaturedProducts, getBestSellers } from "@/data/products";
import { HeroSkeleton } from "@/components/skeletons/HeroSkeleton";
import { CategoryCardSkeleton } from "@/components/skeletons/CategoryCardSkeleton";
import { ProductCardSkeleton } from "@/components/skeletons/ProductCardSkeleton";
import { TestimonialSkeleton } from "@/components/skeletons/TestimonialSkeleton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const featuredProducts = getFeaturedProducts();
  const bestSellers = getBestSellers();

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Scroll animations for different sections
  const categoriesAnimation = useScrollAnimation({ threshold: 0.1 });
  const featuredAnimation = useScrollAnimation({ threshold: 0.1 });
  const bestSellersAnimation = useScrollAnimation({ threshold: 0.1 });
  const testimonialsAnimation = useScrollAnimation({ threshold: 0.1 });

  const categories = [
    {
      title: "PCs Gamer",
      description: "PCs armadas listas para jugar",
      icon: Monitor,
      href: "/categoria/pcs",
    },
    {
      title: "Componentes",
      description: "CPUs, GPUs, RAM y más",
      icon: Cpu,
      href: "/categoria/componentes",
    },
    {
      title: "Periféricos",
      description: "Teclados, mouse, audífonos",
      icon: Gamepad2,
      href: "/categoria/perifericos",
    },
    {
      title: "Portátiles",
      description: "Gaming en cualquier lugar",
      icon: Laptop,
      href: "/categoria/portatiles",
    },
    {
      title: "Monitores",
      description: "Pantallas de alto refresco",
      icon: Target,
      href: "/categoria/monitores",
    },
    {
      title: "Ofertas",
      description: "Los mejores descuentos",
      icon: Sparkles,
      href: "/ofertas",
    },
  ];

  const trustBadges = [
    {
      icon: Truck,
      title: "Envíos Rápidos",
      description: "1-3 días a Medellín, 3-7 días resto de Colombia",
    },
    {
      icon: ShieldCheck,
      title: "Garantía Oficial",
      description: "Todos nuestros productos tienen garantía",
    },
    {
      icon: CreditCard,
      title: "Pagos Seguros",
      description: "PSE, tarjetas y contraentrega",
    },
    {
      icon: Headphones,
      title: "Soporte 24/7",
      description: "Atención por WhatsApp todo el día",
    },
  ];

  const testimonials = [
    {
      name: "Carlos Rodríguez",
      city: "Medellín",
      rating: 5,
      comment: "Excelente servicio. Mi PC llegó perfecto y funciona increíble. Recomendados 100%.",
    },
    {
      name: "María González",
      city: "Bogotá",
      rating: 5,
      comment: "Compré mi setup completo aquí. Buenos precios y envío rápido. Muy satisfecha.",
    },
    {
      name: "Andrés Morales",
      city: "Medellín",
      rating: 5,
      comment: "La mejor tienda gamer de Medellín. Me ayudaron a armar mi PC y quedó perfecta.",
    },
  ];

  const brands = [
    "ASUS", "MSI", "Gigabyte", "HyperX", "Razer", "Logitech", "Corsair", "Samsung"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {isLoading ? (
        <HeroSkeleton />
      ) : (
        <section className="relative overflow-hidden bg-gradient-hero animate-fade-in">
          <div className="absolute inset-0 bg-[url('/banner.png')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-black/50" />

          <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-slide-up">
                <span className="bg-gradient-primary bg-clip-text text-transparent text-glow-primary">
                  Tienda Gamer
                </span>
                <br />
                <span className="text-foreground">Medellín</span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl animate-slide-up" style={{ animationDelay: "100ms" }}>
                PCs, componentes y periféricos gamer al mejor precio en Medellín y Colombia
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
                <Button asChild size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90 shadow-glow-primary hover:scale-105 transition-all duration-300 hover:shadow-glow-primary">
                  <Link to="/tienda">Ver Tienda</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-8 border-primary/50 hover:bg-primary/10 hover:text-primary hover:border-primary hover:scale-105 transition-all duration-300">
                  <Link to="/arma-tu-pc">Arma tu PC</Link>
                </Button>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: "300ms" }}>
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-accent" />
                  <span>Envíos rápidos</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-accent" />
                  <span>Garantía en todos los productos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Headphones className="h-5 w-5 text-accent" />
                  <span>Soporte 24/7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </section>
      )}

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16" ref={categoriesAnimation.ref}>
        <div className={`text-center mb-12 ${categoriesAnimation.isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Categorías Destacadas</h2>
          <p className="text-muted-foreground text-lg">Encuentra todo lo que necesitas para tu setup</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))
          ) : (
            categories.map((category, index) => (
              <div
                key={category.title}
                className={categoriesAnimation.isVisible ? 'animate-slide-up' : 'opacity-0'}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CategoryCard {...category} />
              </div>
            ))
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16" ref={featuredAnimation.ref}>
        <div className={`flex justify-between items-center mb-8 ${featuredAnimation.isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Productos Destacados</h2>
            <p className="text-muted-foreground">Lo mejor de nuestra tienda</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/tienda">Ver todos</Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          ) : (
            featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className={featuredAnimation.isVisible ? 'animate-scale-in' : 'opacity-0'}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard {...product} />
              </div>
            ))
          )}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-card/30 py-16" ref={bestSellersAnimation.ref}>
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 ${bestSellersAnimation.isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Más Vendidos</h2>
            <p className="text-muted-foreground text-lg">Los favoritos de nuestros clientes</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            ) : (
              bestSellers.map((product, index) => (
                <div
                  key={product.id}
                  className={bestSellersAnimation.isVisible ? 'animate-scale-in' : 'opacity-0'}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard {...product} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Build PC Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border border-primary/30 p-8 md:p-12">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Arma tu PC Ideal</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Configura tu PC gamer personalizada eligiendo cada componente. Nosotros te ayudamos a encontrar la mejor combinación para tu presupuesto.
            </p>
            <Button asChild size="lg" className="shadow-glow-primary">
              <Link to="/arma-tu-pc">Comenzar a armar mi PC</Link>
            </Button>
          </div>
          
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('https://images.unsplash.com/photo-1591238372338-a9c0d33c6c6e?w=800&h=600&fit=crop')] bg-cover bg-center opacity-20" />
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-card/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustBadges.map((badge) => (
              <div key={badge.title} className="text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <badge.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{badge.title}</h3>
                <p className="text-sm text-muted-foreground">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16" ref={testimonialsAnimation.ref}>
        <div className={`text-center mb-12 ${testimonialsAnimation.isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Lo que dicen nuestros clientes</h2>
          <p className="text-muted-foreground text-lg">Miles de gamers satisfechos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <TestimonialSkeleton key={i} />
            ))
          ) : (
            testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-card rounded-xl border border-border/50 p-6 hover:border-primary/50 transition-all duration-300 ${testimonialsAnimation.isVisible ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-accent text-xl">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.city}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Brands */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Marcas con las que trabajamos</h2>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {brands.map((brand) => (
            <div
              key={brand}
              className="text-2xl font-bold text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              {brand}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
