import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const Carrito = () => {
  const { cartItems, updateQuantity, removeFromCart, subtotal } = useCart();
  const { toast } = useToast();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleRemoveItem = (id: string, name: string) => {
    removeFromCart(id);
    toast({
      title: "Producto eliminado",
      description: `${name} se eliminó del carrito`,
    });
  };

  const handleApplyCoupon = () => {
    const validCoupons: Record<string, number> = {
      "GAMER10": 0.10,
      "PROMO15": 0.15,
      "DESCUENTO20": 0.20,
    };

    const coupon = couponCode.toUpperCase().trim();
    if (validCoupons[coupon]) {
      setDiscount(validCoupons[coupon]);
      toast({
        title: "Cupón aplicado",
        description: `Se aplicó un descuento del ${validCoupons[coupon] * 100}%`,
      });
    } else {
      toast({
        title: "Cupón inválido",
        description: "El código ingresado no es válido",
        variant: "destructive",
      });
    }
  };

  const discountAmount = subtotal * discount;
  const subtotalWithDiscount = subtotal - discountAmount;
  const shipping = subtotalWithDiscount > 200000 ? 0 : 15000;
  const total = subtotalWithDiscount + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="bg-card/30 border-b border-border/50">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold">Carrito de Compras</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-20">
          <Card className="max-w-md mx-auto p-12 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Tu carrito está vacío</h2>
            <p className="text-muted-foreground mb-6">
              Agrega productos desde nuestra tienda
            </p>
            <Button asChild className="w-full">
              <Link to="/tienda">Ir a la tienda</Link>
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-card/30 border-b border-border/50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Carrito de Compras</h1>
          <p className="text-muted-foreground">
            {cartItems.length} {cartItems.length === 1 ? "producto" : "productos"}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="w-24 h-24 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <Link
                      to={`/producto/${item.id}`}
                      className="font-semibold hover:text-primary transition-colors line-clamp-2 mb-2"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xl font-bold text-primary">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-end gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.id, item.name)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center border border-border rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 rounded-r-none"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <div className="w-12 text-center text-sm font-semibold">
                        {item.quantity}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 rounded-l-none"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* Continue Shopping */}
            <Button asChild variant="outline" className="w-full">
              <Link to="/tienda">← Seguir comprando</Link>
            </Button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Descuento</span>
                      <span className="font-semibold text-accent">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Envío</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-accent">Gratis</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>

                  {shipping > 0 && (
                    <p className="text-xs text-muted-foreground">
                      💚 {formatPrice(200000 - subtotalWithDiscount)} más para envío gratis
                    </p>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Coupon */}
              <div>
                <p className="text-sm font-semibold mb-2">Código de descuento</p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ingresa tu código"
                    className="flex-1"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button variant="outline" onClick={handleApplyCoupon}>
                    Aplicar
                  </Button>
                </div>
                {discount > 0 && (
                  <p className="text-xs text-accent mt-2">
                    Cupón aplicado: {discount * 100}% de descuento
                  </p>
                )}
              </div>

              <Separator />

              {/* Checkout Button */}
              <Button size="lg" className="w-full gap-2 shadow-glow-primary" asChild>
                <Link to="/pago">
                  Continuar al pago
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              {/* Payment Methods */}
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-2">
                  Aceptamos los siguientes métodos de pago:
                </p>
                <div className="flex justify-center gap-2 text-xs text-muted-foreground">
                  <span>💳 PSE</span>
                  <span>•</span>
                  <span>💳 Tarjetas</span>
                  <span>•</span>
                  <span>📦 Contraentrega</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
