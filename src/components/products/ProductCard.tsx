import { Link } from "react-router-dom";
import { ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  badgeVariant?: "default" | "destructive" | "outline" | "secondary";
  stock?: boolean;
}

export const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  badge,
  badgeVariant = "default",
  stock = true,
}: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    addToCart({ id, name, price, image });
    toast({
      title: "Producto agregado",
      description: `${name} se agregó al carrito`,
    });
  };

  return (
    <div className="group relative bg-card rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow-primary hover:-translate-y-1 overflow-hidden">
      {/* Badge */}
      {badge && (
        <Badge
          variant={badgeVariant}
          className="absolute top-3 right-3 z-10 font-semibold animate-pulse-glow"
        >
          {badge}
        </Badge>
      )}

      {/* Image */}
      <Link to={`/producto/${id}`} className="block relative aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2">
          <Button size="sm" variant="outline" className="gap-2 animate-slide-up">
            <Eye className="h-4 w-4" />
            Ver detalles
          </Button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col">
        <Link to={`/producto/${id}`}>
          <h3 className="font-semibold text-sm line-clamp-2 hover:text-primary transition-colors duration-200 min-h-[2.5rem] mb-3">
            {name}
          </h3>
        </Link>

        {/* Contenedor de precios con altura fija para alineación */}
        <div className="h-[3.5rem] flex flex-col justify-end mb-3">
          {originalPrice && (
            <p className="text-xs text-muted-foreground line-through">
              {formatPrice(originalPrice)}
            </p>
          )}
          <p className="text-xl font-bold text-primary group-hover:scale-105 transition-transform duration-200">
            {formatPrice(price)}
          </p>
        </div>

        {/* Botón siempre al final */}
        {stock ? (
          <Button
            onClick={handleAddToCart}
            className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mt-auto hover:shadow-glow-primary transition-all duration-300 active:scale-95"
          >
            <ShoppingCart className="h-4 w-4" />
            Agregar al carrito
          </Button>
        ) : (
          <Button className="w-full mt-auto" variant="outline" disabled>
            Agotado
          </Button>
        )}
      </div>
    </div>
  );
};
