import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import { products } from "@/data/products";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ProductCardSkeleton } from "@/components/skeletons/ProductCardSkeleton";
import { FiltersSkeleton } from "@/components/skeletons/FiltersSkeleton";

const Tienda = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categories = [
    { id: "pcs", label: "PCs Gamer" },
    { id: "componentes", label: "Componentes" },
    { id: "perifericos", label: "Periféricos" },
    { id: "portatiles", label: "Portátiles" },
  ];

  const subcategories = [
    { id: "tarjetas-graficas", label: "Tarjetas Gráficas", parent: "componentes" },
    { id: "procesadores", label: "Procesadores", parent: "componentes" },
    { id: "ram", label: "Memoria RAM", parent: "componentes" },
    { id: "almacenamiento", label: "Almacenamiento", parent: "componentes" },
    { id: "teclados", label: "Teclados", parent: "perifericos" },
    { id: "mouse", label: "Mouse", parent: "perifericos" },
    { id: "audifonos", label: "Audífonos", parent: "perifericos" },
    { id: "monitores", label: "Monitores", parent: "perifericos" },
    { id: "sillas", label: "Sillas", parent: "perifericos" },
  ];

  const brands = ["ASUS", "MSI", "Gigabyte", "HyperX", "Razer", "Logitech", "Corsair", "Samsung", "AMD", "Intel"];

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

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleSubcategory = (subcategoryId: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategoryId)
        ? prev.filter((id) => id !== subcategoryId)
        : [...prev, subcategoryId]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 10000000]);
    setOnlyInStock(false);
    setSortBy("relevance");
  };

  // Filtrar y ordenar productos
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Búsqueda por texto
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.subcategory.toLowerCase().includes(query)
      );
    }

    // Filtro por categoría
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    // Filtro por subcategoría
    if (selectedSubcategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedSubcategories.includes(p.subcategory)
      );
    }

    // Filtro por marca (asumiendo que la marca está en el nombre)
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
        // Por ahora, los productos más recientes son los últimos en el array
        filtered.reverse();
        break;
      default:
        // relevance - mantener orden original o priorizar featured
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [
    searchQuery,
    selectedCategories,
    selectedSubcategories,
    selectedBrands,
    priceRange,
    onlyInStock,
    sortBy,
  ]);

  // Calcular paginación
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Resetear a página 1 cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategories, selectedSubcategories, selectedBrands, priceRange, onlyInStock, sortBy]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-card/30 border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Tienda Gamer</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {searchQuery && `Resultados para "${searchQuery}": `}
            Encontramos {filteredAndSortedProducts.length} producto{filteredAndSortedProducts.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex gap-6">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0 space-y-6">
            <div className="bg-card rounded-xl border border-border/50 p-6 space-y-6">
              {isLoading ? (
                <FiltersSkeleton />
              ) : (
                <>
                  {/* Categories */}
                  <div>
                    <h3 className="font-bold mb-4">Categorías</h3>
                    <div className="space-y-3">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={category.id}
                            checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                      />
                      <Label
                        htmlFor={category.id}
                        className="text-sm cursor-pointer"
                      >
                        {category.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subcategories */}
              <div>
                <h3 className="font-bold mb-4">Subcategorías</h3>
                <div className="space-y-3">
                  {subcategories.slice(0, 6).map((subcategory) => (
                    <div key={subcategory.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={subcategory.id}
                        checked={selectedSubcategories.includes(subcategory.id)}
                        onCheckedChange={() => toggleSubcategory(subcategory.id)}
                      />
                      <Label
                        htmlFor={subcategory.id}
                        className="text-sm cursor-pointer"
                      >
                        {subcategory.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

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
                </>
              )}
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 mb-6">
              {/* Mobile Filter Button */}
              <Button
                variant="outline"
                className="lg:hidden gap-2 min-h-[48px] w-full sm:w-auto justify-center active:scale-95 transition-transform"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-5 w-5" />
                Filtros
                {(selectedCategories.length + selectedSubcategories.length + selectedBrands.length > 0) && (
                  <span className="ml-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {selectedCategories.length + selectedSubcategories.length + selectedBrands.length}
                  </span>
                )}
              </Button>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 w-full sm:w-auto" ref={sortDropdownRef}>
                <span className="text-xs sm:text-sm text-muted-foreground hidden sm:inline whitespace-nowrap">Ordenar por:</span>
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex flex-1 sm:flex-initial h-12 sm:h-10 sm:w-[200px] items-center justify-between rounded-md border border-input bg-background px-3 sm:px-4 py-2 text-sm ring-offset-background hover:bg-accent hover:text-accent-foreground active:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
                >
                  <span className="truncate">{getSortLabel(sortBy)}</span>
                  <ChevronDown className={`h-4 w-4 ml-2 flex-shrink-0 opacity-50 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showSortDropdown && (
                  <div className="absolute top-full left-0 sm:left-auto sm:right-0 mt-1 w-full sm:w-[240px] rounded-md border border-border bg-popover shadow-lg z-50 overflow-hidden animate-in fade-in-0 zoom-in-95">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setShowSortDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-accent hover:text-accent-foreground active:bg-accent transition-colors min-h-[48px] flex items-center ${
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
              <div className="text-center py-12 sm:py-20 animate-fade-in px-4">
                <p className="text-xl sm:text-2xl font-bold mb-2">No se encontraron productos</p>
                <p className="text-sm sm:text-base text-muted-foreground mb-6">
                  Intenta ajustar los filtros o la búsqueda
                </p>
                <Button variant="outline" onClick={clearFilters} className="min-h-[48px]">
                  Limpiar filtros
                </Button>
              </div>
            )}

            {/* Pagination */}
            {filteredAndSortedProducts.length > productsPerPage && (
              <div className="mt-8 sm:mt-12 flex justify-center items-center gap-1 sm:gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="min-h-[44px] min-w-[44px] px-3 sm:px-4"
                >
                  <span className="hidden sm:inline">Anterior</span>
                  <span className="sm:hidden">←</span>
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Mostrar solo algunas páginas alrededor de la actual
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
                        className="min-h-[44px] min-w-[44px] active:scale-95 transition-transform"
                      >
                        {page}
                      </Button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="px-1 sm:px-2 text-muted-foreground">...</span>;
                  }
                  return null;
                })}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="min-h-[44px] min-w-[44px] px-3 sm:px-4"
                >
                  <span className="hidden sm:inline">Siguiente</span>
                  <span className="sm:hidden">→</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Bottom Sheet */}
      {showFilters && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden animate-in fade-in-0"
            onClick={() => setShowFilters(false)}
          />

          {/* Bottom Sheet */}
          <div className="fixed inset-x-0 bottom-0 top-16 sm:top-20 z-50 lg:hidden bg-background border-t border-border overflow-hidden animate-in slide-in-from-bottom-2">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border/50 bg-card/30">
              <div>
                <h2 className="text-lg sm:text-xl font-bold">Filtros</h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  {filteredAndSortedProducts.length} productos encontrados
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowFilters(false)}
                className="min-h-[44px] min-w-[44px] h-11 w-11 active:scale-95 transition-transform"
                aria-label="Cerrar filtros"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Filters Content - Scrollable */}
            <div className="overflow-y-auto h-[calc(100%-8rem)] p-4 sm:p-6 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-bold mb-4 text-base sm:text-lg">Categorías</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-3 min-h-[44px]">
                      <Checkbox
                        id={`mobile-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                        className="h-5 w-5"
                      />
                      <Label
                        htmlFor={`mobile-${category.id}`}
                        className="text-sm sm:text-base cursor-pointer flex-1"
                      >
                        {category.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subcategories */}
              <div>
                <h3 className="font-bold mb-4 text-base sm:text-lg">Subcategorías</h3>
                <div className="space-y-3">
                  {subcategories.slice(0, 6).map((subcategory) => (
                    <div key={subcategory.id} className="flex items-center space-x-3 min-h-[44px]">
                      <Checkbox
                        id={`mobile-${subcategory.id}`}
                        checked={selectedSubcategories.includes(subcategory.id)}
                        onCheckedChange={() => toggleSubcategory(subcategory.id)}
                        className="h-5 w-5"
                      />
                      <Label
                        htmlFor={`mobile-${subcategory.id}`}
                        className="text-sm sm:text-base cursor-pointer flex-1"
                      >
                        {subcategory.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-bold mb-4 text-base sm:text-lg">Rango de Precio</h3>
                <Slider
                  defaultValue={[0, 10000000]}
                  max={10000000}
                  step={100000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-6"
                />
                <div className="flex justify-between text-sm sm:text-base text-muted-foreground">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>

              {/* Brands */}
              <div>
                <h3 className="font-bold mb-4 text-base sm:text-lg">Marcas</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-3 min-h-[44px]">
                      <Checkbox
                        id={`mobile-${brand}`}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => toggleBrand(brand)}
                        className="h-5 w-5"
                      />
                      <Label htmlFor={`mobile-${brand}`} className="text-sm sm:text-base cursor-pointer flex-1">
                        {brand}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h3 className="font-bold mb-4 text-base sm:text-lg">Disponibilidad</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 min-h-[44px]">
                    <Checkbox
                      id="mobile-in-stock"
                      checked={onlyInStock}
                      onCheckedChange={(checked) => setOnlyInStock(!!checked)}
                      className="h-5 w-5"
                    />
                    <Label htmlFor="mobile-in-stock" className="text-sm sm:text-base cursor-pointer flex-1">
                      Solo en stock
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-background border-t border-border/50 flex gap-3">
              <Button
                variant="outline"
                onClick={clearFilters}
                className="flex-1 min-h-[48px] text-base active:scale-95 transition-transform"
              >
                Limpiar
              </Button>
              <Button
                onClick={() => setShowFilters(false)}
                className="flex-1 min-h-[48px] text-base active:scale-95 transition-transform"
              >
                Ver {filteredAndSortedProducts.length} productos
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Tienda;
