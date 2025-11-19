import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Sobre nosotros */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">Tienda Gamer Medellín</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Tu tienda de confianza para PCs, componentes y periféricos gamer en Medellín y Colombia.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/573001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-lg bg-accent hover:bg-accent/80 text-accent-foreground flex items-center justify-center transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/nosotros" className="text-muted-foreground hover:text-primary transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/tienda" className="text-muted-foreground hover:text-primary transition-colors">
                  Tienda
                </Link>
              </li>
              <li>
                <Link to="/ofertas" className="text-muted-foreground hover:text-primary transition-colors">
                  Ofertas
                </Link>
              </li>
              <li>
                <Link to="/arma-tu-pc" className="text-muted-foreground hover:text-primary transition-colors">
                  Arma tu PC
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Información */}
          <div>
            <h3 className="text-lg font-bold mb-4">Información</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/soporte" className="text-muted-foreground hover:text-primary transition-colors">
                  Garantías y Devoluciones
                </Link>
              </li>
              <li>
                <Link to="/soporte#envios" className="text-muted-foreground hover:text-primary transition-colors">
                  Envíos
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <Link to="/soporte#faq" className="text-muted-foreground hover:text-primary transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MessageCircle className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">WhatsApp</p>
                  <a href="https://wa.me/573001234567" className="hover:text-primary transition-colors">
                    +57 300 123 4567
                  </a>
                </div>
              </li>
              <li>
                <p className="font-medium text-foreground mb-1">Email</p>
                <a href="mailto:ventas@tiendagamermde.com" className="hover:text-primary transition-colors">
                  ventas@tiendagamermde.com
                </a>
              </li>
              <li>
                <p className="font-medium text-foreground mb-1">Ubicación</p>
                <p>Medellín, Colombia</p>
                <p className="text-xs mt-1">Lun - Vie: 9:00 AM - 7:00 PM</p>
                <p className="text-xs">Sáb: 9:00 AM - 5:00 PM</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 Tienda Gamer Medellín. Todos los derechos reservados.</p>
            <div className="flex items-center gap-4">
              <span>🚚 Envíos seguros</span>
              <span>✓ Garantía oficial</span>
              <span>💳 Pagos confiables</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
