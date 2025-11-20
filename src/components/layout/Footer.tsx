import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30 mt-12 sm:mt-16 md:mt-20">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Sobre nosotros */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-primary">Tienda Gamer Medellín</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Tu tienda de confianza para PCs, componentes y periféricos gamer en Medellín y Colombia.
            </p>
            <div className="flex gap-2 sm:gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] h-11 w-11 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground active:scale-95 flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] h-11 w-11 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground active:scale-95 flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] h-11 w-11 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground active:scale-95 flex items-center justify-center transition-all"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <button
                className="min-h-[44px] min-w-[44px] h-11 w-11 rounded-lg bg-accent hover:bg-accent/80 text-accent-foreground active:scale-95 flex items-center justify-center transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2.5 text-sm sm:text-base">
              <li>
                <Link to="/nosotros" className="text-muted-foreground hover:text-primary active:text-primary transition-colors min-h-[44px] flex items-center">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/tienda" className="text-muted-foreground hover:text-primary active:text-primary transition-colors min-h-[44px] flex items-center">
                  Tienda
                </Link>
              </li>
              <li>
                <Link to="/ofertas" className="text-muted-foreground hover:text-primary active:text-primary transition-colors min-h-[44px] flex items-center">
                  Ofertas
                </Link>
              </li>
              <li>
                <Link to="/arma-tu-pc" className="text-muted-foreground hover:text-primary active:text-primary transition-colors min-h-[44px] flex items-center">
                  Arma tu PC
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-muted-foreground hover:text-primary active:text-primary transition-colors min-h-[44px] flex items-center">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Información */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Información</h3>
            <ul className="space-y-2.5 text-sm sm:text-base">
              <li>
                <Link to="/soporte" className="text-muted-foreground hover:text-primary active:text-primary transition-colors min-h-[44px] flex items-center">
                  Garantías y Devoluciones
                </Link>
              </li>
              <li>
                <Link to="/soporte#envios" className="text-muted-foreground hover:text-primary active:text-primary transition-colors min-h-[44px] flex items-center">
                  Envíos
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary active:text-primary transition-colors min-h-[44px] flex items-center">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary active:text-primary transition-colors min-h-[44px] flex items-center">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <Link to="/soporte#faq" className="text-muted-foreground hover:text-primary active:text-primary transition-colors min-h-[44px] flex items-center">
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Contacto</h3>
            <ul className="space-y-4 text-sm sm:text-base text-muted-foreground">
              <li className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 mt-0.5 text-accent flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">WhatsApp</p>
                  <p className="text-muted-foreground">+57 300 123 4567</p>
                </div>
              </li>
              <li>
                <p className="font-medium text-foreground mb-1">Email</p>
                <a href="mailto:ventas@tiendagamermde.com" className="hover:text-primary active:text-primary transition-colors break-all">
                  ventas@tiendagamermde.com
                </a>
              </li>
              <li>
                <p className="font-medium text-foreground mb-1">Ubicación</p>
                <p>Medellín, Colombia</p>
                <p className="text-xs sm:text-sm mt-1">Lun - Vie: 9:00 AM - 7:00 PM</p>
                <p className="text-xs sm:text-sm">Sáb: 9:00 AM - 5:00 PM</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-muted-foreground text-center md:text-left">
            <p className="order-2 md:order-1">© 2024 Tienda Gamer Medellín. Todos los derechos reservados.</p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 order-1 md:order-2">
              <span className="whitespace-nowrap">🚚 Envíos seguros</span>
              <span className="whitespace-nowrap">✓ Garantía oficial</span>
              <span className="whitespace-nowrap">💳 Pagos confiables</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
