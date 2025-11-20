import { useState, useEffect } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { products } from "@/data/products";
import { Sparkles } from "lucide-react";
import { ProductCardSkeleton } from "@/components/skeletons/ProductCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const Ofertas = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Filtrar productos con descuento
  const offerProducts = products.filter((p) => p.originalPrice && p.originalPrice > p.price);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className={`relative overflow-hidden bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border-b border-primary/30 ${!isLoading ? 'animate-fade-in' : ''}`}>
        <div className="container mx-auto px-4 py-16 md:py-24 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold">Ofertas de la Semana</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Ofertas Gamer
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Aprovecha los mejores descuentos en PCs, componentes y periféricos gamer
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {isLoading ? (
              <>
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-5 w-56" />
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold">
                  {offerProducts.length} Productos en Oferta
                </h2>
                <p className="text-sm text-muted-foreground">
                  ⚡ Ofertas válidas hasta agotar existencias
                </p>
              </>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : offerProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {offerProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Sparkles className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No hay ofertas activas</h3>
            <p className="text-muted-foreground">
              Vuelve pronto para ver nuestras próximas ofertas
            </p>
          </div>
        )}
      </div>

      {/* CTA Banner */}
      <div className="container mx-auto px-4 pb-12">
        <div className="bg-card rounded-2xl border border-border/50 p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ¿No encontraste lo que buscabas?
          </h2>
          <p className="text-muted-foreground mb-6">
            Explora nuestro catálogo completo con más de 100 productos disponibles
          </p>
          <a
            href="/tienda"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Ver catálogo completo
          </a>
        </div>
      </div>
    </div>
  );
};

export default Ofertas;
