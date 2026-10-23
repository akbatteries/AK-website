"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Truck, ShieldCheck, Image as ImageIcon, ArrowRight } from "lucide-react";

export interface ProductData {
  id?: string | number;
  brandname?: string;
  name?: string;
  category?: string;
  price?: string | number;
  mrp?: string | number;
  description?: string;
  image?: string;
  images?: string[];
  highlights?: string[];
}

interface ProductCardProps {
  product?: ProductData;
  project?: ProductData; // Alias for catalog usage
  idx?: number;
  onNavigate?: (url: string) => void;
  className?: string;
  showAllHighlights?: boolean;
}

const DEFAULT_HIGHLIGHTS_INVERTER = [
  "1125VA Pure Sine Wave Inverter",
  "150Ah Tall Tubular Battery",
  "Essential Appliance Backup",
  "Overload & Thermal Protection",
  "LED Status Display",
  "42-Month Inverter Warranty",
  "60-Month Battery Warranty",
];

const DEFAULT_HIGHLIGHTS_RO = [
  "Multi-Stage RO + UV + UF + Alkaline Purification",
  "High-TDS Borewell Membrane (Up to 2000+ PPM)",
  "Active Copper & Essential Mineral Cartridge",
  "Overload & Leakage Auto-Protection",
  "Food-Grade 10L Storage Tank with Level Sensor",
  "12-Month In-Home Complete Warranty",
  "Free Doorstep Professional Installation",
];

const formatPrice = (p: string | number | undefined) => {
  if (p === undefined || p === null || p === "") return "₹19,999";
  const str = String(p).trim();
  if (str.startsWith("₹") || str.toLowerCase().startsWith("rs")) {
    return str;
  }
  const numeric = parseInt(str.replace(/[^0-9]/g, ""), 10);
  if (isNaN(numeric)) return `₹${str}`;
  return `₹${numeric.toLocaleString("en-IN")}`;
};

const calculateDiscount = (mrpVal?: string | number, sellVal?: string | number) => {
  if (!mrpVal || !sellVal) return "43% OFF";
  const numMrp = parseInt(String(mrpVal).replace(/[^0-9]/g, ""), 10);
  const numSell = parseInt(String(sellVal).replace(/[^0-9]/g, ""), 10);
  if (isNaN(numMrp) || isNaN(numSell) || numMrp <= numSell) return null;
  const pct = Math.round(((numMrp - numSell) / numMrp) * 100);
  return `${pct}% OFF`;
};

export function ProductCard({
  product: productProp,
  project,
  idx = 0,
  onNavigate,
  className = "",
  showAllHighlights = true,
}: ProductCardProps) {
  // Support either 'product' or 'project' prop
  const item = productProp || project;

  const brandname = item?.brandname || item?.name || "Exide Inverter and Battery Combo";
  const rawPrice = item?.price !== undefined ? item.price : 19999;
  const rawMrp = item?.mrp !== undefined ? item.mrp : 34999;
  const category = (item?.category || "").toLowerCase();

  const formattedPrice = formatPrice(rawPrice);
  const formattedMrp = rawMrp ? formatPrice(rawMrp) : null;
  const discountText = calculateDiscount(rawMrp, rawPrice) || "43% OFF";

  // Multi-image handling
  const imageList: string[] = React.useMemo(() => {
    if (item?.images && Array.isArray(item.images) && item.images.length > 0) {
      return item.images;
    }
    if (item?.image) {
      return [item.image];
    }
    return [];
  }, [item?.images, item?.image]);


  // Parse highlights from description or fallback to exact design defaults
  const highlights = React.useMemo(() => {
    if (item?.highlights && item.highlights.length > 0) {
      return item.highlights;
    }

    if (item?.description && typeof item.description === "string") {
      const parts = item.description
        .split(/[\n,•]+/)
        .map((s) => s.replace(/^[✓\s*•\-]+/, "").trim())
        .filter(Boolean);

      if (parts.length >= 2) {
        return parts;
      }
    }

    // Default highlights matching the exact design
    if (category.includes("water") || category.includes("purifier") || category.includes("ro")) {
      return DEFAULT_HIGHLIGHTS_RO;
    }
    return DEFAULT_HIGHLIGHTS_INVERTER;
  }, [item?.highlights, item?.description, category]);

  const productId = item?.id || encodeURIComponent(brandname);
  const productUrl = `/product/${productId}`;

  const handleCardClick = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(productUrl);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`w-full bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_14px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_30px_rgba(15,23,42,0.08)] hover:border-slate-300 transition-all duration-300 p-4 sm:p-6 flex flex-col justify-between ${
        onNavigate ? "cursor-pointer" : ""
      } ${className}`}
    >
      {/* 2-Column Layout (Left Column: Product Image | Right Column: Product Content & Details) */}
      <div className="grid grid-cols-[130px_1fr] sm:grid-cols-[170px_1fr] md:grid-cols-[200px_1fr] gap-4 sm:gap-6 items-center">
        
        {/* Left Column: Single Product Image Container (Vertically Centered) */}
        <div className="w-full self-center my-auto flex items-center justify-center">
          <div className="w-full aspect-square rounded-2xl bg-[#F3F4F6] border border-slate-100 p-3 sm:p-4 flex items-center justify-center relative overflow-hidden group select-none shadow-xs">
            {imageList.length > 0 ? (
              <div className="relative w-full h-full">
                <Image
                  src={imageList[0]}
                  alt={brandname}
                  fill
                  priority={idx < 2}
                  className="object-contain transition-transform duration-300 group-hover:scale-105 pointer-events-none"
                  sizes="(max-width: 640px) 130px, (max-width: 768px) 170px, 200px"
                />
              </div>
            ) : (
              /* Mockup Placeholder View */
              <div className="flex flex-col items-center justify-center gap-1.5 text-center p-2">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-200/60 flex items-center justify-center text-slate-700">
                  <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-700 leading-tight">
                  Product Image
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: All Product Content & Purchasing Details */}
        <div className="flex flex-col justify-between h-full min-w-0">
          <div>
            {/* Product Brand Title */}
            <h2 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 tracking-tight leading-snug line-clamp-2 mb-2">
              {brandname}
            </h2>

            {/* Price Row: Selling Price, MRP strikethrough, Discount Badge */}
            <div className="flex items-baseline gap-2 flex-wrap mb-1.5">
              <span className="text-base sm:text-xl md:text-2xl font-extrabold text-[#b91c1c] tracking-tight">
                {formattedPrice}
              </span>

              {formattedMrp && (
                <span className="text-[11px] sm:text-xs md:text-sm text-slate-400 line-through font-normal">
                  {formattedMrp}
                </span>
              )}

              {discountText && (
                <span className="bg-[#DCFCE7] text-[#15803D] text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded tracking-wide">
                  {discountText}
                </span>
              )}
            </div>

            {/* Subtitle Details */}
            <p className="text-[10px] sm:text-xs text-slate-500 font-normal leading-tight line-clamp-1 mb-3">
              Inclusive of taxes • Free Delivery • Installation Included
            </p>

            {/* Two Feature Badges (Grid of 2) */}
            <div className="grid grid-cols-2 gap-2 my-3">
              <div className="bg-[#F3F4F6] rounded-xl py-2 px-2 flex items-center justify-center gap-1.5 text-center">
                <Truck className="w-3.5 h-3.5 text-[#059669] shrink-0 stroke-[2]" />
                <span className="text-[10px] sm:text-xs font-semibold text-slate-800 truncate">
                  Free Delivery
                </span>
              </div>
              <div className="bg-[#F3F4F6] rounded-xl py-2 px-2 flex items-center justify-center gap-1.5 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB] shrink-0 stroke-[2]" />
                <span className="text-[10px] sm:text-xs font-semibold text-slate-800 truncate">
                  Warranty Support
                </span>
              </div>
            </div>

            {/* Product Highlights Checklist */}
            <div className="mt-3 mb-2">
              <span className="text-[11px] sm:text-xs font-bold text-slate-900 block mb-1.5">
                Product Highlights
              </span>
              <ul className="space-y-1.5">
                {highlights.slice(0, 3).map((itemText, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-1.5 text-[10px] sm:text-xs text-slate-700 font-medium leading-snug line-clamp-1"
                  >
                    <span className="text-slate-900 font-bold shrink-0 select-none leading-none">
                      ✓
                    </span>
                    <span className="truncate">{itemText}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Button: View Details */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <Link
              href={productUrl}
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate(productUrl);
                }
              }}
              className="w-full bg-[#0F172A] hover:bg-[#1E293B] active:scale-[0.99] text-white font-bold text-xs sm:text-sm py-2.5 sm:py-3 px-4 rounded-xl text-center transition-all duration-200 shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductCard;
