import { useState } from "react";
import { Check, ChevronRight, Cpu, HardDrive, MemoryStick, Zap, Box, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ArmaTuPc = () => {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState<Record<string, any>>({});

  const steps = [
    { id: 1, title: "Presupuesto", icon: Zap },
    { id: 2, title: "Uso Principal", icon: Monitor },
    { id: 3, title: "Procesador", icon: Cpu },
    { id: 4, title: "Tarjeta Gráfica", icon: Box },
    { id: 5, title: "Memoria RAM", icon: MemoryStick },
    { id: 6, title: "Almacenamiento", icon: HardDrive },
  ];

  const budgetOptions = [
    { id: "basic", label: "Básico", range: "$2M - $3.5M", description: "Para gaming casual y eSports" },
    { id: "mid", label: "Intermedio", range: "$3.5M - $5.5M", description: "Gaming AAA en 1080p/1440p" },
    { id: "high", label: "Alto", range: "$5.5M - $8M", description: "Gaming 1440p/4K con RTX" },
    { id: "extreme", label: "Extremo", range: "$8M+", description: "Lo mejor del mercado" },
  ];

  const useOptions = [
    { id: "competitive", label: "Gaming Competitivo", description: "eSports, FPS, MOBAs con altos FPS" },
    { id: "aaa", label: "Gaming AAA", description: "Juegos modernos con gráficos de alta calidad" },
    { id: "streaming", label: "Streaming", description: "Gaming + transmisión en vivo" },
    { id: "creation", label: "Creación de Contenido", description: "Edición de video, renderizado 3D" },
    { id: "mixed", label: "Uso Mixto", description: "Gaming, trabajo y multitarea" },
  ];

  const cpuOptions = [
    {
      id: "i5-13400f",
      name: "Intel Core i5-13400F",
      price: 729000,
      specs: "10 núcleos, 20 hilos • Hasta 4.6 GHz",
      badge: "Mejor relación calidad-precio",
    },
    {
      id: "i7-13700k",
      name: "Intel Core i7-13700K",
      price: 1699000,
      specs: "16 núcleos, 24 hilos • Hasta 5.4 GHz",
      badge: "High Performance",
    },
    {
      id: "r5-7600x",
      name: "AMD Ryzen 5 7600X",
      price: 989000,
      specs: "6 núcleos, 12 hilos • Hasta 5.3 GHz",
      badge: "Eficiente",
    },
    {
      id: "r7-7800x3d",
      name: "AMD Ryzen 7 7800X3D",
      price: 1899000,
      specs: "8 núcleos, 16 hilos • 96MB L3 Cache",
      badge: "Mejor para gaming",
    },
  ];

  const gpuOptions = [
    {
      id: "rtx-4060",
      name: "NVIDIA RTX 4060",
      price: 1699000,
      specs: "8GB GDDR6 • 1080p/1440p",
      badge: "Recomendado",
    },
    {
      id: "rtx-4060ti",
      name: "NVIDIA RTX 4060 Ti",
      price: 2199000,
      specs: "8GB/16GB GDDR6 • 1440p",
      badge: "Balance perfecto",
    },
    {
      id: "rtx-4070",
      name: "NVIDIA RTX 4070",
      price: 2899000,
      specs: "12GB GDDR6X • 1440p/4K",
      badge: "High Performance",
    },
    {
      id: "rtx-4080",
      name: "NVIDIA RTX 4080",
      price: 5499000,
      specs: "16GB GDDR6X • 4K Gaming",
      badge: "Entusiasta",
    },
  ];

  const ramOptions = [
    {
      id: "16gb-ddr4",
      name: "16GB DDR4 3200MHz",
      price: 259000,
      specs: "2x8GB • Ideal para gaming",
    },
    {
      id: "32gb-ddr4",
      name: "32GB DDR4 3600MHz",
      price: 479000,
      specs: "2x16GB • Gaming + Streaming",
      badge: "Recomendado",
    },
    {
      id: "32gb-ddr5",
      name: "32GB DDR5 5200MHz",
      price: 589000,
      specs: "2x16GB • Máximo rendimiento",
      badge: "High Performance",
    },
  ];

  const storageOptions = [
    {
      id: "512gb-nvme",
      name: "512GB NVMe SSD",
      price: 189000,
      specs: "PCIe 3.0 • 3,500 MB/s lectura",
    },
    {
      id: "1tb-nvme",
      name: "1TB NVMe SSD",
      price: 329000,
      specs: "PCIe 4.0 • 5,000 MB/s lectura",
      badge: "Recomendado",
    },
    {
      id: "2tb-nvme",
      name: "2TB NVMe SSD",
      price: 789000,
      specs: "PCIe 4.0 • 7,450 MB/s lectura",
      badge: "Capacidad amplia",
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getTotalPrice = () => {
    let total = 0;
    if (selections.cpu) total += selections.cpu.price;
    if (selections.gpu) total += selections.gpu.price;
    if (selections.ram) total += selections.ram.price;
    if (selections.storage) total += selections.storage.price;
    // Agregar costos base estimados para case, fuente, etc.
    total += 650000; // Estimado para case, fuente, motherboard, cooler
    return total;
  };

  const sendWhatsAppQuote = () => {
    const phoneNumber = "573001234567"; // Número de WhatsApp de la tienda

    let message = `¡Hola! Me gustaría cotizar esta configuración de PC Gamer:\n\n`;
    message += `💰 *Presupuesto:* ${formatPrice(Number(selections.budget))}\n`;
    message += `🎮 *Uso principal:* ${selections.use}\n\n`;
    message += `*Componentes seleccionados:*\n`;

    if (selections.cpu) {
      message += `🔧 *Procesador:* ${selections.cpu.name}\n`;
      message += `   ${formatPrice(selections.cpu.price)}\n\n`;
    }

    if (selections.gpu) {
      message += `🎨 *Tarjeta Gráfica:* ${selections.gpu.name}\n`;
      message += `   ${formatPrice(selections.gpu.price)}\n\n`;
    }

    if (selections.ram) {
      message += `💾 *Memoria RAM:* ${selections.ram.name}\n`;
      message += `   ${formatPrice(selections.ram.price)}\n\n`;
    }

    if (selections.storage) {
      message += `💿 *Almacenamiento:* ${selections.storage.name}\n`;
      message += `   ${formatPrice(selections.storage.price)}\n\n`;
    }

    message += `---\n`;
    message += `*TOTAL ESTIMADO:* ${formatPrice(getTotalPrice())}\n\n`;
    message += `¿Podrían ayudarme con esta configuración?`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  const handleSelect = (category: string, item: any) => {
    setSelections({ ...selections, [category]: item });
  };

  const canProceed = () => {
    switch (step) {
      case 1: return selections.budget;
      case 2: return selections.use;
      case 3: return selections.cpu;
      case 4: return selections.gpu;
      case 5: return selections.ram;
      case 6: return selections.storage;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-card/30 border-b border-border/50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Arma tu PC Gamer</h1>
          <p className="text-muted-foreground">
            Configura tu PC ideal paso a paso
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Steps Navigation */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Card className="p-4 sm:p-6 lg:sticky lg:top-24">
              <h2 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Progreso</h2>
              <div className="space-y-2 sm:space-y-3">
                {steps.map((s, index) => {
                  const Icon = s.icon;
                  const isCompleted = index < step - 1;
                  const isCurrent = index === step - 1;
                  const isAccessible = index <= step - 1; // Can only access current or previous steps

                  return (
                    <button
                      key={s.id}
                      onClick={() => isAccessible && setStep(s.id)}
                      disabled={!isAccessible}
                      className={`w-full flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg transition-colors min-h-[44px] ${
                        isCurrent
                          ? "bg-primary/10 border-2 border-primary"
                          : isCompleted
                          ? "bg-accent/10 border-2 border-accent cursor-pointer hover:border-accent/80 active:scale-98"
                          : "border-2 border-border/50 opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <div
                        className={`h-8 w-8 sm:h-10 sm:w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isCompleted
                            ? "bg-accent text-accent-foreground"
                            : isCurrent
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                        ) : (
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <p className={`text-xs sm:text-sm font-semibold truncate ${isCurrent ? "text-primary" : ""}`}>
                          {s.title}
                        </p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">
                          Paso {index + 1} de {steps.length}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <Separator className="my-4 sm:my-6" />

              {/* Price Summary */}
              <div className="space-y-2 sm:space-y-3">
                <h3 className="font-bold text-sm sm:text-base">Resumen</h3>
                {selections.cpu && (
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">CPU</span>
                    <span className="font-semibold">{formatPrice(selections.cpu.price)}</span>
                  </div>
                )}
                {selections.gpu && (
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">GPU</span>
                    <span className="font-semibold">{formatPrice(selections.gpu.price)}</span>
                  </div>
                )}
                {selections.ram && (
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">RAM</span>
                    <span className="font-semibold">{formatPrice(selections.ram.price)}</span>
                  </div>
                )}
                {selections.storage && (
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">SSD</span>
                    <span className="font-semibold">{formatPrice(selections.storage.price)}</span>
                  </div>
                )}
                {Object.keys(selections).length > 2 && (
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Otros componentes</span>
                    <span className="font-semibold">{formatPrice(650000)}</span>
                  </div>
                )}

                {Object.keys(selections).length > 2 && (
                  <>
                    <Separator />
                    <div className="flex justify-between text-base sm:text-lg font-bold">
                      <span>Total estimado</span>
                      <span className="text-primary">{formatPrice(getTotalPrice())}</span>
                    </div>
                  </>
                )}
              </div>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            {/* Step 1: Budget */}
            {step === 1 && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">¿Cuál es tu presupuesto?</h2>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Selecciona el rango que mejor se ajuste a tu inversión
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {budgetOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSelect("budget", option)}
                      className={`p-4 sm:p-6 rounded-xl border-2 transition-all text-left min-h-[44px] active:scale-[0.98] ${
                        selections.budget?.id === option.id
                          ? "border-primary bg-primary/10 shadow-glow-primary"
                          : "border-border/50 hover:border-primary/50 active:border-primary/50"
                      }`}
                    >
                      <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">{option.label}</h3>
                      <p className="text-lg sm:text-xl font-bold text-primary mb-1 sm:mb-2">{option.range}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{option.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Use */}
            {step === 2 && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">¿Cuál será el uso principal?</h2>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Esto nos ayudará a recomendar los mejores componentes
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  {useOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSelect("use", option)}
                      className={`p-4 sm:p-6 rounded-xl border-2 transition-all text-left min-h-[44px] active:scale-[0.98] ${
                        selections.use?.id === option.id
                          ? "border-primary bg-primary/10 shadow-glow-primary"
                          : "border-border/50 hover:border-primary/50 active:border-primary/50"
                      }`}
                    >
                      <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">{option.label}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">{option.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: CPU */}
            {step === 3 && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Elige tu procesador</h2>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    El cerebro de tu PC
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {cpuOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSelect("cpu", option)}
                      className={`p-4 sm:p-6 rounded-xl border-2 transition-all text-left min-h-[44px] active:scale-[0.98] ${
                        selections.cpu?.id === option.id
                          ? "border-primary bg-primary/10 shadow-glow-primary"
                          : "border-border/50 hover:border-primary/50 active:border-primary/50"
                      }`}
                    >
                      {option.badge && (
                        <Badge className="mb-2 sm:mb-3 text-[10px] sm:text-xs">{option.badge}</Badge>
                      )}
                      <h3 className="font-bold text-sm sm:text-lg mb-1 sm:mb-2">{option.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">{option.specs}</p>
                      <p className="text-base sm:text-xl font-bold text-primary">{formatPrice(option.price)}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: GPU */}
            {step === 4 && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Elige tu tarjeta gráfica</h2>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    El componente más importante para gaming
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {gpuOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSelect("gpu", option)}
                      className={`p-4 sm:p-6 rounded-xl border-2 transition-all text-left min-h-[44px] active:scale-[0.98] ${
                        selections.gpu?.id === option.id
                          ? "border-primary bg-primary/10 shadow-glow-primary"
                          : "border-border/50 hover:border-primary/50 active:border-primary/50"
                      }`}
                    >
                      {option.badge && (
                        <Badge className="mb-2 sm:mb-3 text-[10px] sm:text-xs">{option.badge}</Badge>
                      )}
                      <h3 className="font-bold text-sm sm:text-lg mb-1 sm:mb-2">{option.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">{option.specs}</p>
                      <p className="text-base sm:text-xl font-bold text-primary">{formatPrice(option.price)}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: RAM */}
            {step === 5 && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Elige tu memoria RAM</h2>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Más RAM = mejor multitarea
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {ramOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSelect("ram", option)}
                      className={`p-4 sm:p-6 rounded-xl border-2 transition-all text-left min-h-[44px] active:scale-[0.98] ${
                        selections.ram?.id === option.id
                          ? "border-primary bg-primary/10 shadow-glow-primary"
                          : "border-border/50 hover:border-primary/50 active:border-primary/50"
                      }`}
                    >
                      {option.badge && (
                        <Badge className="mb-2 sm:mb-3 text-[10px] sm:text-xs">{option.badge}</Badge>
                      )}
                      <h3 className="font-bold text-sm sm:text-lg mb-1 sm:mb-2">{option.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">{option.specs}</p>
                      <p className="text-base sm:text-xl font-bold text-primary">{formatPrice(option.price)}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Storage */}
            {step === 6 && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Elige tu almacenamiento</h2>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Velocidad de carga y espacio para tus juegos
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {storageOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSelect("storage", option)}
                      className={`p-4 sm:p-6 rounded-xl border-2 transition-all text-left min-h-[44px] active:scale-[0.98] ${
                        selections.storage?.id === option.id
                          ? "border-primary bg-primary/10 shadow-glow-primary"
                          : "border-border/50 hover:border-primary/50 active:border-primary/50"
                      }`}
                    >
                      {option.badge && (
                        <Badge className="mb-2 sm:mb-3 text-[10px] sm:text-xs">{option.badge}</Badge>
                      )}
                      <h3 className="font-bold text-sm sm:text-lg mb-1 sm:mb-2">{option.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">{option.specs}</p>
                      <p className="text-base sm:text-xl font-bold text-primary">{formatPrice(option.price)}</p>
                    </button>
                  ))}
                </div>

                {/* Final Summary */}
                {selections.storage && (
                  <Card className="p-4 sm:p-6 bg-primary/5 border-primary/30">
                    <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4">¡Tu configuración está lista!</h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                      Revisa tu configuración y envíanos tu cotización por WhatsApp para finalizar tu pedido.
                    </p>
                    <Button size="lg" className="w-full shadow-glow-primary min-h-[44px]" onClick={sendWhatsAppQuote}>
                      Enviar cotización por WhatsApp
                    </Button>
                  </Card>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-6 sm:mt-8">
              <Button
                variant="outline"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="min-h-[44px] px-4 sm:px-6 text-sm sm:text-base"
              >
                Anterior
              </Button>

              {step < 6 && (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="gap-1 sm:gap-2 min-h-[44px] px-4 sm:px-6 text-sm sm:text-base"
                >
                  Siguiente
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArmaTuPc;
