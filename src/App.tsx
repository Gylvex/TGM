import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { Layout } from "./components/layout/Layout";
import { ScrollToTop } from "./components/ScrollToTop";
import Home from "./pages/Home";
import Tienda from "./pages/Tienda";
import Categoria from "./pages/Categoria";
import Producto from "./pages/Producto";
import ArmaTuPc from "./pages/ArmaTuPc";
import Ofertas from "./pages/Ofertas";
import Carrito from "./pages/Carrito";
import Pago from "./pages/Pago";
import Nosotros from "./pages/Nosotros";
import Soporte from "./pages/Soporte";
import Contacto from "./pages/Contacto";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tienda" element={<Tienda />} />
              <Route path="/categoria/:categoria" element={<Categoria />} />
              <Route path="/producto/:id" element={<Producto />} />
              <Route path="/arma-tu-pc" element={<ArmaTuPc />} />
              <Route path="/ofertas" element={<Ofertas />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/pago" element={<Pago />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/soporte" element={<Soporte />} />
              <Route path="/contacto" element={<Contacto />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
