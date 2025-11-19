import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showComponentesDropdown, setShowComponentesDropdown] = useState(false);
  const [showPerifericosDropdown, setShowPerifericosDropdown] = useState(false);
  const [mobileComponentesOpen, setMobileComponentesOpen] = useState(false);
  const [mobilePerifericosOpen, setMobilePerifericosOpen] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const componentesRef = useRef<HTMLDivElement>(null);
  const perifericosRef = useRef<HTMLDivElement>(null);
  const componentesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const perifericosTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tienda?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  // Cart bounce animation when items are added
  useEffect(() => {
    if (cartCount > 0) {
      setCartBounce(true);
      const timer = setTimeout(() => setCartBounce(false), 600);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  // Scroll lock when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Cerrar dropdowns al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (componentesRef.current && !componentesRef.current.contains(event.target as Node)) {
        setShowComponentesDropdown(false);
      }
      if (perifericosRef.current && !perifericosRef.current.contains(event.target as Node)) {
        setShowPerifericosDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const componentesItems = [
    { label: "Ver todo", path: "/categoria/componentes" },
    { label: "Procesadores", path: "/categoria/procesadores" },
    { label: "Tarjetas Gráficas", path: "/categoria/tarjetas-graficas" },
    { label: "Memoria RAM", path: "/categoria/ram" },
    { label: "Almacenamiento", path: "/categoria/almacenamiento" },
  ];

  const perifericosItems = [
    { label: "Ver todo", path: "/categoria/perifericos" },
    { label: "Teclados", path: "/categoria/teclados" },
    { label: "Mouse", path: "/categoria/mouse" },
    { label: "Monitores", path: "/categoria/monitores" },
    { label: "Audífonos", path: "/categoria/audifonos" },
    { label: "Sillas Gaming", path: "/categoria/sillas" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Main header */}
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-2 sm:gap-3">
          {/* Logo */}
          <Link to="/" className="flex items-center group flex-shrink-0">
            <img
              src="/logo.png"
              alt="Tienda Gamer Medellín"
              className="h-12 sm:h-16 w-auto group-hover:scale-105 transition-transform"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            <Link to="/" className="text-sm font-medium px-3 py-2 rounded-md transition-all hover:bg-primary/10 hover:shadow-sm whitespace-nowrap">
              Inicio
            </Link>
            <Link to="/tienda" className="text-sm font-medium px-3 py-2 rounded-md transition-all hover:bg-primary/10 hover:shadow-sm whitespace-nowrap">
              Tienda
            </Link>

            {/* Dropdown Componentes */}
            <div
              ref={componentesRef}
              className="relative"
              onMouseEnter={() => {
                if (componentesTimeoutRef.current) {
                  clearTimeout(componentesTimeoutRef.current);
                  componentesTimeoutRef.current = null;
                }
                setShowComponentesDropdown(true);
                setShowPerifericosDropdown(false);
              }}
              onMouseLeave={() => {
                componentesTimeoutRef.current = setTimeout(() => {
                  setShowComponentesDropdown(false);
                }, 200);
              }}
            >
              <button
                onClick={() => {
                  setShowComponentesDropdown(!showComponentesDropdown);
                  setShowPerifericosDropdown(false);
                }}
                className="text-sm font-medium px-3 py-2 rounded-md transition-all hover:bg-primary/10 hover:shadow-sm flex items-center gap-1 whitespace-nowrap"
              >
                Componentes
                <ChevronDown className={`h-3 w-3 transition-transform ${showComponentesDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showComponentesDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 rounded-md border border-border bg-popover shadow-lg z-50 overflow-hidden animate-in fade-in-0 zoom-in-95">
                  {componentesItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setShowComponentesDropdown(false)}
                      className={`block px-4 py-2.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors ${
                        item.label === "Ver todo" ? "font-semibold border-b border-border" : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Dropdown Periféricos */}
            <div
              ref={perifericosRef}
              className="relative"
              onMouseEnter={() => {
                if (perifericosTimeoutRef.current) {
                  clearTimeout(perifericosTimeoutRef.current);
                  perifericosTimeoutRef.current = null;
                }
                setShowPerifericosDropdown(true);
                setShowComponentesDropdown(false);
              }}
              onMouseLeave={() => {
                perifericosTimeoutRef.current = setTimeout(() => {
                  setShowPerifericosDropdown(false);
                }, 200);
              }}
            >
              <button
                onClick={() => {
                  setShowPerifericosDropdown(!showPerifericosDropdown);
                  setShowComponentesDropdown(false);
                }}
                className="text-sm font-medium px-3 py-2 rounded-md transition-all hover:bg-primary/10 hover:shadow-sm flex items-center gap-1 whitespace-nowrap"
              >
                Periféricos
                <ChevronDown className={`h-3 w-3 transition-transform ${showPerifericosDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showPerifericosDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 rounded-md border border-border bg-popover shadow-lg z-50 overflow-hidden animate-in fade-in-0 zoom-in-95">
                  {perifericosItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setShowPerifericosDropdown(false)}
                      className={`block px-4 py-2.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors ${
                        item.label === "Ver todo" ? "font-semibold border-b border-border" : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/categoria/pcs" className="text-sm font-medium px-3 py-2 rounded-md transition-all hover:bg-primary/10 hover:shadow-sm whitespace-nowrap">
              PCs Gamer
            </Link>
            <Link to="/arma-tu-pc" className="text-sm font-medium px-3 py-2 rounded-md transition-all hover:bg-primary/10 hover:shadow-sm whitespace-nowrap">
              Arma tu PC
            </Link>
            <Link to="/ofertas" className="text-sm font-medium px-3 py-2 rounded-md transition-all hover:bg-primary/10 hover:shadow-sm whitespace-nowrap">
              Ofertas
            </Link>
          </nav>

          {/* Search bar - Desktop only */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xs relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar productos..."
              className="pl-10 bg-card border-border/50 focus:border-primary text-sm h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <Button variant="ghost" size="icon" className="hidden md:flex min-h-[44px] min-w-[44px] h-11 w-11">
              <User className="h-5 w-5" />
            </Button>

            <Link to="/carrito">
              <Button variant="ghost" size="icon" className="relative min-h-[44px] min-w-[44px] h-11 w-11 group active:scale-95 transition-transform">
                <ShoppingCart className={`h-5 w-5 transition-transform ${cartBounce ? 'scale-125' : ''}`} />
                {cartCount > 0 && (
                  <span className={`absolute -top-1 -right-1 h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold shadow-glow-primary transition-transform ${cartBounce ? 'animate-bounce-subtle scale-125' : ''}`}>
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden min-h-[44px] min-w-[44px] h-11 w-11 active:scale-95 transition-transform"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Slide from right */}
      {isMenuOpen && (
        <>
          {/* Backdrop - Semi-transparent */}
          <div
            className="fixed inset-0 bg-black/30 z-40 lg:hidden animate-in fade-in-0 duration-200"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu panel - From right, 70% width */}
          <div className="fixed right-0 top-0 bottom-0 w-[70%] max-w-xs z-50 lg:hidden bg-background border-l border-border/50 shadow-2xl overflow-y-auto animate-in slide-in-from-right-full duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50 bg-card/30 sticky top-0 z-10">
              <span className="font-bold text-lg">Menú</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(false)}
                className="h-10 w-10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-4 relative md:hidden">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar..."
                  className="pl-9 bg-card border-border/50 h-10 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-1">
                <Link
                  to="/"
                  className="text-sm font-medium px-3 py-2.5 rounded-md transition-all active:bg-primary/20 hover:bg-primary/10 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </Link>
                <Link
                  to="/tienda"
                  className="text-sm font-medium px-3 py-2.5 rounded-md transition-all active:bg-primary/20 hover:bg-primary/10 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tienda
                </Link>

                {/* Componentes - Collapsible */}
                <div>
                  <button
                    onClick={() => setMobileComponentesOpen(!mobileComponentesOpen)}
                    className="w-full text-sm font-medium px-3 py-2.5 rounded-md transition-all active:bg-primary/20 hover:bg-primary/10 flex items-center justify-between"
                  >
                    Componentes
                    <ChevronRight className={`h-4 w-4 transition-transform ${mobileComponentesOpen ? 'rotate-90' : ''}`} />
                  </button>
                  {mobileComponentesOpen && (
                    <div className="ml-3 mt-1 space-y-1 animate-in slide-in-from-top-1">
                      {componentesItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="block text-sm px-3 py-2 rounded-md transition-all active:bg-primary/20 hover:bg-primary/10 text-muted-foreground hover:text-foreground"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Periféricos - Collapsible */}
                <div>
                  <button
                    onClick={() => setMobilePerifericosOpen(!mobilePerifericosOpen)}
                    className="w-full text-sm font-medium px-3 py-2.5 rounded-md transition-all active:bg-primary/20 hover:bg-primary/10 flex items-center justify-between"
                  >
                    Periféricos
                    <ChevronRight className={`h-4 w-4 transition-transform ${mobilePerifericosOpen ? 'rotate-90' : ''}`} />
                  </button>
                  {mobilePerifericosOpen && (
                    <div className="ml-3 mt-1 space-y-1 animate-in slide-in-from-top-1">
                      {perifericosItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="block text-sm px-3 py-2 rounded-md transition-all active:bg-primary/20 hover:bg-primary/10 text-muted-foreground hover:text-foreground"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  to="/categoria/pcs"
                  className="text-sm font-medium px-3 py-2.5 rounded-md transition-all active:bg-primary/20 hover:bg-primary/10 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  PCs Gamer
                </Link>
                <Link
                  to="/arma-tu-pc"
                  className="text-sm font-medium px-3 py-2.5 rounded-md transition-all active:bg-primary/20 hover:bg-primary/10 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Arma tu PC
                </Link>
                <Link
                  to="/ofertas"
                  className="text-sm font-medium px-3 py-2.5 rounded-md transition-all active:bg-primary/20 hover:bg-primary/10 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Ofertas
                </Link>

                <div className="pt-4 mt-4 border-t border-border/50">
                  <Link
                    to="/soporte"
                    className="text-sm px-3 py-2.5 rounded-md transition-all active:bg-primary/20 hover:bg-primary/10 flex items-center text-muted-foreground hover:text-foreground"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Soporte
                  </Link>
                  <Link
                    to="/nosotros"
                    className="text-sm px-3 py-2.5 rounded-md transition-all active:bg-primary/20 hover:bg-primary/10 flex items-center text-muted-foreground hover:text-foreground"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Nosotros
                  </Link>
                  <Link
                    to="/contacto"
                    className="text-sm px-3 py-2.5 rounded-md transition-all active:bg-primary/20 hover:bg-primary/10 flex items-center text-muted-foreground hover:text-foreground"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contacto
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
