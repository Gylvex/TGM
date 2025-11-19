import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Truck, ShieldCheck, Wrench, ChevronRight, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/products/ProductCard";
import { getProductById, products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { ProductDetailSkeleton } from "@/components/skeletons/ProductDetailSkeleton";

const Producto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const product = getProductById(id || "");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <Button asChild>
            <Link to="/tienda">Volver a la tienda</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Simular múltiples imágenes usando la misma
  const images = [product.image, product.image, product.image];
  
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-card/30 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Inicio</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/tienda" className="hover:text-primary">Tienda</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-card rounded-xl border border-border/50 overflow-hidden">
              {product.badge && (
                <Badge className="absolute top-4 right-4 z-10 text-base px-4 py-2" variant={product.badgeVariant}>
                  {product.badge}
                </Badge>
              )}
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-card rounded-lg border-2 overflow-hidden transition-colors ${
                    selectedImage === index ? "border-primary" : "border-border/50 hover:border-primary/50"
                  }`}
                >
                  <img src={img} alt={`Vista ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                {product.stock ? (
                  <Badge variant="outline" className="border-accent text-accent">
                    ✓ En stock
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-destructive text-destructive">
                    Agotado
                  </Badge>
                )}
              </div>

              <div className="space-y-2">
                {product.originalPrice && (
                  <div className="flex items-center gap-3">
                    <span className="text-2xl text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <Badge variant="destructive" className="text-base">
                      -{discount}%
                    </Badge>
                  </div>
                )}
                <p className="text-4xl md:text-5xl font-bold text-primary">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator />

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="font-semibold">Cantidad:</span>
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-r-none"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="w-16 text-center font-semibold">{quantity}</div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded-l-none"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full text-lg gap-2 shadow-glow-primary"
                disabled={!product.stock}
                onClick={() => {
                  addToCart({ ...product, quantity });
                  toast({
                    title: "Producto agregado",
                    description: `${product.name} ha sido agregado al carrito`,
                  });
                }}
              >
                <ShoppingCart className="h-5 w-5" />
                Agregar al carrito
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full text-lg"
                disabled={!product.stock}
                onClick={() => {
                  addToCart({ ...product, quantity });
                  navigate("/carrito");
                }}
              >
                Comprar ahora
              </Button>
            </div>

            <Separator />

            {/* Benefits */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Envío rápido</p>
                  <p className="text-sm text-muted-foreground">
                    1-3 días a Medellín • 3-7 días resto de Colombia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Garantía oficial</p>
                  <p className="text-sm text-muted-foreground">
                    Todos nuestros productos cuentan con garantía del fabricante
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Wrench className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Soporte técnico</p>
                  <p className="text-sm text-muted-foreground">
                    Asesoría para instalación y configuración por WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Especificaciones Técnicas</h2>
          <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
            <div className="divide-y divide-border/50">
              {Object.entries(product.specs).map(([key, value], index) => (
                <div
                  key={key}
                  className={`grid grid-cols-1 md:grid-cols-3 gap-4 p-4 ${
                    index % 2 === 0 ? "bg-card" : "bg-muted/30"
                  }`}
                >
                  <div className="font-semibold text-muted-foreground">{key}</div>
                  <div className="md:col-span-2">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Productos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Producto;
