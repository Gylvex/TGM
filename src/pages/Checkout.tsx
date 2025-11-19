import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Truck, Package, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, subtotal, clearCart } = useCart();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    department: "",
    postalCode: "",
    paymentMethod: "pse"
  });

  const shipping = subtotal >= 200000 ? 0 : 15000;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setStep(3);
  };

  const handleFinish = () => {
    clearCart();
    navigate("/");
    toast({
      title: "¡Pedido confirmado!",
      description: "Recibirás un correo con los detalles de tu compra",
    });
  };

  if (cartItems.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Tu carrito está vacío</h1>
          <p className="text-muted-foreground mb-6">
            Agrega productos para continuar con la compra
          </p>
          <Button onClick={() => navigate("/tienda")}>Ir a la tienda</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => step > 1 ? setStep(step - 1) : navigate("/carrito")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Finalizar Compra</h1>
              <p className="text-sm text-muted-foreground">
                {step === 1 && "Paso 1: Información de envío"}
                {step === 2 && "Paso 2: Método de pago"}
                {step === 3 && "Confirmación"}
              </p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className={`flex items-center gap-2 ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"}`}>
                1
              </div>
              <span className="hidden sm:inline text-sm font-medium">Envío</span>
            </div>

            <div className={`h-0.5 w-12 ${step >= 2 ? "bg-primary" : "bg-muted-foreground"}`} />

            <div className={`flex items-center gap-2 ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"}`}>
                2
              </div>
              <span className="hidden sm:inline text-sm font-medium">Pago</span>
            </div>

            <div className={`h-0.5 w-12 ${step >= 3 ? "bg-primary" : "bg-muted-foreground"}`} />

            <div className={`flex items-center gap-2 ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${step >= 3 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"}`}>
                3
              </div>
              <span className="hidden sm:inline text-sm font-medium">Confirmación</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Información de Envío</h2>
                    <p className="text-sm text-muted-foreground">Completa tus datos de entrega</p>
                  </div>
                </div>

                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nombre completo *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Juan Pérez"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+57 300 123 4567"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección completa *</Label>
                    <Input
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Calle 123 #45-67, Apto 890"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ciudad *</Label>
                      <Input
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Medellín"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department">Departamento *</Label>
                      <Input
                        id="department"
                        name="department"
                        required
                        value={formData.department}
                        onChange={handleInputChange}
                        placeholder="Antioquia"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Código Postal</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="050001"
                      />
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full mt-6">
                    Continuar a método de pago
                  </Button>
                </form>
              </Card>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Método de Pago</h2>
                    <p className="text-sm text-muted-foreground">Selecciona cómo deseas pagar</p>
                  </div>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <div
                      onClick={() => setFormData({...formData, paymentMethod: "pse"})}
                      className={`flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer ${formData.paymentMethod === "pse" ? "border-primary bg-primary/5" : ""}`}
                    >
                      <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === "pse" ? "border-primary" : "border-muted-foreground"}`}>
                        {formData.paymentMethod === "pse" && <div className="h-3 w-3 rounded-full bg-primary" />}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">PSE (Pago Seguro en Línea)</div>
                        <p className="text-sm text-muted-foreground">Paga desde tu banco</p>
                      </div>
                    </div>

                    <div
                      onClick={() => setFormData({...formData, paymentMethod: "credit_card"})}
                      className={`flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer ${formData.paymentMethod === "credit_card" ? "border-primary bg-primary/5" : ""}`}
                    >
                      <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === "credit_card" ? "border-primary" : "border-muted-foreground"}`}>
                        {formData.paymentMethod === "credit_card" && <div className="h-3 w-3 rounded-full bg-primary" />}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">Tarjeta de Crédito/Débito</div>
                        <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
                      </div>
                    </div>

                    <div
                      onClick={() => setFormData({...formData, paymentMethod: "cash"})}
                      className={`flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer ${formData.paymentMethod === "cash" ? "border-primary bg-primary/5" : ""}`}
                    >
                      <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === "cash" ? "border-primary" : "border-muted-foreground"}`}>
                        {formData.paymentMethod === "cash" && <div className="h-3 w-3 rounded-full bg-primary" />}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">Pago Contraentrega</div>
                        <p className="text-sm text-muted-foreground">Paga en efectivo al recibir</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Nota:</strong> Este es un prototipo. En la versión final, aquí se integraría con pasarelas de pago reales (PSE, Stripe, etc.)
                    </p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full mt-6"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Procesando..." : "Confirmar pedido"}
                  </Button>
                </form>
              </Card>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <Card className="p-8 text-center">
                <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-10 w-10 text-accent" />
                </div>
                <h2 className="text-2xl font-bold mb-2">¡Pedido Confirmado!</h2>
                <p className="text-muted-foreground mb-6">
                  Tu pedido ha sido recibido y está siendo procesado
                </p>

                <div className="bg-muted/50 p-6 rounded-lg mb-6 text-left">
                  <h3 className="font-semibold mb-3">Detalles del pedido:</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Número de pedido:</span>
                      <span className="font-mono">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total:</span>
                      <span className="font-semibold">${total.toLocaleString('es-CO')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Correo:</span>
                      <span>{formData.email}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-6">
                  Hemos enviado un correo de confirmación a <strong>{formData.email}</strong> con los detalles de tu pedido.
                </p>

                <div className="flex gap-3 flex-col sm:flex-row">
                  <Button variant="outline" onClick={() => navigate("/tienda")} className="flex-1">
                    Seguir comprando
                  </Button>
                  <Button onClick={handleFinish} className="flex-1">
                    Volver al inicio
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-4">Resumen del pedido</h3>

              <div className="space-y-4 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 object-cover rounded"
                      />
                      <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toLocaleString('es-CO')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toLocaleString('es-CO')}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Envío</span>
                  <span>{shipping === 0 ? "Gratis" : `$${shipping.toLocaleString('es-CO')}`}</span>
                </div>

                <div className="border-t border-border my-3" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${total.toLocaleString('es-CO')}</span>
                </div>
              </div>

              {shipping === 0 && (
                <div className="mt-4 p-3 bg-accent/10 rounded-lg">
                  <p className="text-sm text-accent font-medium">
                    ¡Envío gratis! Ahorras ${(15000).toLocaleString('es-CO')}
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
