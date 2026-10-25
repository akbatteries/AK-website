"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Inbox, ArrowUpDown } from "lucide-react";
import { Button } from "./ui/Button";
import { PageLoader } from "./PageLoader";
import { ProductCard } from "./ProductCard";

const parseNumericPrice = (p: any) => {
  if (!p) return 0;
  const num = parseInt(String(p).replace(/[^0-9]/g, ""), 10);
  return isNaN(num) ? 0 : num;
};

interface CategoryProductsProps {
  initialProducts: any[];
  pageTitle?: string;
  pageSubtitle?: string;
}

export function CategoryProducts({
  initialProducts = [],
  pageTitle,
  pageSubtitle,
}: CategoryProductsProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState("default");
  const [isNavigating, setIsNavigating] = React.useState(false);

  const router = useRouter();
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const debounceTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleNavigate = (url: string) => {
    setIsNavigating(true);
    router.push(url);
  };

  const handleSearchChange = (value: string) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      setSearchQuery(value);
    }, 300);
  };

  React.useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  const conformedInitial = React.useMemo(() => {
    return initialProducts.map((item: any) => ({
      id: item.id || encodeURIComponent(item.brandname || "product"),
      brandname: item.brandname || item.name || "Product",
      category: (item.category || "").toLowerCase(),
      description: item.description || "",
      price: item.price || item.selling_price || 0,
      mrp: item.mrp || 0,
      images: Array.isArray(item.images) ? item.images : item.image ? [item.image] : [],
      image: item.image || (Array.isArray(item.images) && item.images[0]) || "",
      created_at: item.created_at,
    }));
  }, [initialProducts]);

  const filteredProjects = React.useMemo(() => {
    const filtered = conformedInitial.filter((project: any) => {
      return (
        !searchQuery.trim() ||
        project.brandname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    if (sortBy === "lowToHigh") {
      return [...filtered].sort((a, b) => parseNumericPrice(a.price) - parseNumericPrice(b.price));
    }
    if (sortBy === "highToLow") {
      return [...filtered].sort((a, b) => parseNumericPrice(b.price) - parseNumericPrice(a.price));
    }

    return filtered;
  }, [conformedInitial, searchQuery, sortBy]);

  return (
    <div className="py-12 sm:py-20 bg-mesh-gradient min-h-screen">
      {isNavigating && <PageLoader />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-10 md:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gradient text-3xl sm:text-4xl font-extrabold tracking-tight mb-3"
          >
            {pageTitle || "Products & Pricing"}
          </motion.h2>
          {pageSubtitle && (
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
              {pageSubtitle}
            </p>
          )}
        </div>

        {/* Filters & Sorting Panel */}
        {initialProducts.length > 0 && (
          <div className="max-w-6xl mx-auto mb-10 flex flex-row items-center justify-between gap-3">
            <div className="relative flex-1 min-w-0">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </span>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search products..."
                defaultValue=""
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-sm text-slate-800 transition-all bg-white shadow-xs"
              />
            </div>

            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-xs shrink-0 h-11">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-7 bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer pr-1"
              >
                <option value="default">Default</option>
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
              </select>
            </div>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-xs max-w-lg mx-auto"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 mb-4">
              <Inbox className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">
              No products found
            </h3>
            <p className="text-slate-500 text-sm max-w-xs mx-auto mb-6">
              We couldn't find any products matching your search.
            </p>
            <Button
              onClick={() => {
                if (searchInputRef.current) {
                  searchInputRef.current.value = "";
                }
                setSearchQuery("");
              }}
              variant="secondary"
              size="sm"
            >
              Reset Search
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 max-w-6xl mx-auto">
            {filteredProjects.map((project, idx) => (
              <ProductCard
                key={idx}
                project={project}
                idx={idx}
                onNavigate={handleNavigate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryProducts;
