import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import { products } from "@/data/products";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ProductCardSkeleton } from "@/components/skeletons/ProductCardSkeleton";
import { FiltersSkeleton } from "@/components/skeletons/FiltersSkeleton";

// Configuración de categorías y subcategorías
const categoryConfig: Record<string, {
  title: string;
  description: string;
  subcategories?: string[];
}> = {
  // Componentes
  "procesadores": {
    title: "Procesadores",
    description: "Los mejores procesadores AMD e Intel para gaming y productividad",
    subcategories: ["procesadores"]
  },
  "tarjetas-graficas": {
    title: "Tarjetas Gráficas",
    description: "GPUs NVIDIA y AMD para el máximo rendimiento en juegos",
    subcategories: ["tarjetas-graficas"]
  },
  "ram": {
    title: "Memoria RAM",
    description: "Memoria DDR4 y DDR5 para gaming y multitarea",
    subcategories: ["ram"]
  },
  "almacenamiento": {
    title: "Almacenamiento",
    description: "SSDs NVMe y SATA para tiempos de carga ultrarrápidos",
    subcategories: ["almacenamiento"]
  },
  "componentes": {
    title: "Componentes",
    description: "Todos los componentes para armar tu PC gamer",
    subcategories: ["procesadores", "tarjetas-graficas", "ram", "almacenamiento"]
  },

  // Periféricos
  "teclados": {
    title: "Teclados",
    description: "Teclados mecánicos y membrana para gaming",
    subcategories: ["teclados"]
  },
  "mouse": {
    title: "Mouse",
    description: "Mouse gaming con precisión profesional",
    subcategories: ["mouse"]
  },
  "monitores": {
    title: "Monitores",
    description: "Monitores gaming con alta tasa de refresco",
    subcategories: ["monitores"]
  },
  "audifonos": {
    title: "Audífonos",
    description: "Audífonos gaming con audio envolvente",
    subcategories: ["audifonos"]
  },
  "sillas": {
    title: "Sillas Gaming",
    description: "Sillas ergonómicas para largas sesiones de juego",
    subcategories: ["sillas"]
  },
  "perifericos": {
    title: "Periféricos",
    description: "Todo lo que necesitas para completar tu setup gamer",
    subcategories: ["teclados", "mouse", "monitores", "audifonos", "sillas"]
  },

  // PCs
  "pcs": {
    title: "PCs Gamer",
    description: "PCs armadas y listas para jugar",
    subcategories: ["armadas"]
  },

  // Portátiles
  "portatiles": {
    title: "Portátiles Gaming",
    description: "Laptops gaming de alto rendimiento",
    subcategories: ["gaming"]
  }
};

const Categoria = () => {
  const { categoria } = useParams<{ categoria: string }>();
  const navigate = useNavigate();

  const config = categoria ? categoryConfig[categoria] : null;

  // Si la categoría no existe, redirigir a tienda
  useEffect(() => {
    if (!config) {
      navigate("/tienda");
    }
  }, [config, navigate]);

  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [categoria]);

  // Filtrar productos por categoría
  const categoryProducts = useMemo(() => {
    if (!config?.subcategories) return [];

    return products.filter((p) =>
      config.subcategories!.includes(p.subcategory)
    );
  }, [config]);

  // Obtener marcas únicas de los productos de esta categoría
  const brands = useMemo(() => {
    const brandSet = new Set<string>();
    categoryProducts.forEach((product) => {
      // Extraer marca del nombre del producto (primera palabra generalmente)
      const brand = product.name.split(" ")[0];
      brandSet.add(brand);
    });
    return Array.from(brandSet).sort();
  }, [categoryProducts]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getSortLabel = (value: string) => {
    const labels: Record<string, string> = {
      "relevance": "Relevancia",
      "price-low": "Precio: menor a mayor",
      "price-high": "Precio: mayor a menor",
      "best-sellers": "Más vendidos",
      "newest": "Más nuevos",
    };
    return labels[value] || "Relevancia";
  };

  const sortOptions = [
    { value: "relevance", label: "Relevancia" },
    { value: "price-low", label: "Precio: menor a mayor" },
    { value: "price-high", label: "Precio: mayor a menor" },
    { value: "best-sellers", label: "Más vendidos" },
    { value: "newest", label: "Más nuevos" },
  ];

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setPriceRange([0, 10000000]);
    setOnlyInStock(false);
    setSortBy("relevance");
  };

  // Filtrar y ordenar productos
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...categoryProducts];

    // Filtro por marca
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) =>
        selectedBrands.some((brand) => p.name.includes(brand))
      );
    }

    // Filtro por rango de precio
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Filtro por disponibilidad
    if (onlyInStock) {
      filtered = filtered.filter((p) => p.stock);
    }

    // Ordenamiento
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "best-sellers":
        filtered.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
        break;
      case "newest":
        filtered.reverse();
        break;
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [categoryProducts, selectedBrands, priceRange, onlyInStock, sortBy]);

  // Calcular paginación
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Resetear a página 1 cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBrands, priceRange, onlyInStock, sortBy]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!config) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-card/30 border-b border-border/50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{config.title}</h1>
          <p className="text-muted-foreground mb-4">
            {config.description}
          </p>
          <p className="text-muted-foreground">
            Encontramos {filteredAndSortedProducts.length} producto{filteredAndSortedProducts.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block w-full lg:w-64 flex-shrink-0 space-y-6`}
          >
            {isLoading ? (
              <div className="bg-card rounded-xl border border-border/50 p-6">
                <FiltersSkeleton />
              </div>
            ) : (
            <div className="bg-card rounded-xl border border-border/50 p-6 space-y-6">
              {/* Price Range */}
              <div>
                <h3 className="font-bold mb-4">Rango de Precio</h3>
                <Slider
                  defaultValue={[0, 10000000]}
                  max={10000000}
                  step={100000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>

              {/* Brands */}
              {brands.length > 0 && (
                <div>
                  <h3 className="font-bold mb-4">Marcas</h3>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={brand}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleBrand(brand)}
                        />
                        <Label htmlFor={brand} className="text-sm cursor-pointer">
                          {brand}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Availability */}
              <div>
                <h3 className="font-bold mb-4">Disponibilidad</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="in-stock"
                      checked={onlyInStock}
                      onCheckedChange={(checked) => setOnlyInStock(!!checked)}
                    />
                    <Label htmlFor="in-stock" className="text-sm cursor-pointer">
                      Solo en stock
                    </Label>
                  </div>
                </div>
              </div>

              <Button className="w-full" variant="outline" onClick={clearFilters}>
                Limpiar filtros
              </Button>
            </div>
            )}
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <Button
                variant="outline"
                className="lg:hidden gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                Filtros
              </Button>

              <div className="flex items-center gap-2 relative">
                <span className="text-sm text-muted-foreground">Ordenar por:</span>
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex h-10 w-[200px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
                >
                  <span>{getSortLabel(sortBy)}</span>
                  <ChevronDown className={`h-4 w-4 opacity-50 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showSortDropdown && (
                  <div className="absolute top-full right-0 mt-1 w-[200px] rounded-md border border-border bg-popover shadow-lg z-50 overflow-hidden animate-in fade-in-0 zoom-in-95">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setShowSortDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors ${
                          sortBy === option.value ? 'bg-accent/50 font-medium' : ''
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Products */}
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {currentProducts.map((product, index) => (
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
              <div className="text-center py-20 animate-fade-in">
                <p className="text-2xl font-bold mb-2">No se encontraron productos</p>
                <p className="text-muted-foreground mb-6">
                  Intenta ajustar los filtros
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Limpiar filtros
                </Button>
              </div>
            )}

            {/* Pagination */}
            {filteredAndSortedProducts.length > productsPerPage && (
              <div className="mt-12 flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => goToPage(page)}
                      >
                        {page}
                      </Button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="px-2">...</span>;
                  }
                  return null;
                })}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categoria;
