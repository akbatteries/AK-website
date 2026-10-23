"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, Truck, ShieldCheck, Image as ImageIcon } from "lucide-react";

interface ProductDetailClientProps {
  product: any;
  relatedProducts?: any[];
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

export function ProductDetailClient({ product, relatedProducts = [] }: ProductDetailClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [copied, setCopied] = React.useState(false);

  const productImages: string[] = product.images && product.images.length > 0
    ? product.images
    : product.image
      ? [product.image]
      : [];

  const formattedPrice = formatPrice(product.price);
  const formattedMrp = product.mrp ? formatPrice(product.mrp) : null;
  const discountBadge = calculateDiscount(product.mrp, product.price) || "43% OFF";
  const category = (product.category || "").toLowerCase();

  const highlights = React.useMemo(() => {
    if (product.highlights && Array.isArray(product.highlights) && product.highlights.length > 0) {
      return product.highlights;
    }
    if (product.description && typeof product.description === "string") {
      const parts = product.description
        .split(/[\n,•]+/)
        .map((s: string) => s.replace(/^[✓\s*•\-]+/, "").trim())
        .filter(Boolean);
      if (parts.length >= 2) return parts;
    }
    if (category.includes("water") || category.includes("purifier") || category.includes("ro")) {
      return DEFAULT_HIGHLIGHTS_RO;
    }
    return DEFAULT_HIGHLIGHTS_INVERTER;
  }, [product.highlights, product.description, category]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.brandname,
        text: `Check out ${product.brandname} at AK Batteries & RO Solutions!`,
        url: window.location.href,
      }).catch(() => { });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello AK Batteries! I want to order "${product.brandname}" (${formattedPrice}). Please share availability and delivery details.`
  );
  const whatsappUrl = `https://wa.me/918870534049?text=${whatsappMessage}`;

  return (
    <div className="py-6 sm:py-10 bg-mesh-gradient min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Top Header Navigation Bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            href={category.includes("water") || category.includes("purifier") || category.includes("ro") ? "/water-purifier" : "/batteries-inverters"}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-lg border border-slate-200 shadow-xs transition-all hover:-translate-x-0.5"
          >
            <ArrowLeft className="w-4 h-4 text-slate-700" />
            Back to Products
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-lg border border-slate-200 shadow-xs hover:bg-slate-50 transition-all cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-700" />
            {copied ? "Link Copied!" : "Share Product"}
          </button>
        </div>

        {/* Main Product Showcase Card (Matches Mobile Mockup Design Exactly) */}
        <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_14px_rgba(15,23,42,0.04)] p-4 sm:p-7 mb-16">
          {/* Top Product Image Container */}
          <div className="w-full rounded-xl bg-[#F3F4F6] border border-slate-100 p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden group select-none">
            {productImages.length > 0 ? (
              <div className="flex flex-col items-center w-full">
                {/* Main Display Image */}
                <div className="relative w-full h-56 sm:h-80 md:h-96">
                  <Image
                    src={productImages[selectedImageIndex] || productImages[0]}
                    alt={product.brandname}
                    fill
                    priority
                    className="object-contain transition-transform duration-300 group-hover:scale-105 pointer-events-none"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>

                {/* Multi-Image Thumbnails Row */}
                {productImages.length > 1 && (
                  <div className="flex items-center gap-2.5 mt-4 pt-3 border-t border-slate-200/70 w-full overflow-x-auto pb-1 scrollbar-none">
                    {productImages.map((img: string, idx: number) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 bg-white overflow-hidden shrink-0 transition-all cursor-pointer ${
                          selectedImageIndex === idx
                            ? "border-slate-900 ring-2 ring-slate-900/10 scale-105"
                            : "border-slate-200 opacity-70 hover:opacity-100"
                        }`}
                        aria-label={`View angle ${idx + 1}`}
                      >
                        <Image
                          src={img}
                          alt={`${product.brandname} thumbnail ${idx + 1}`}
                          fill
                          className="object-contain p-1"
                          sizes="64px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Mockup Placeholder View */
              <div className="flex flex-col items-center justify-center gap-2 text-center py-12 sm:py-16">
                <div className="w-14 h-14 rounded-xl bg-slate-200/60 flex items-center justify-center text-slate-700 mb-1">
                  <ImageIcon className="w-8 h-8 stroke-[1.5]" />
                </div>
                <span className="text-sm sm:text-base font-semibold text-slate-800 tracking-tight">
                  Large Product Image + Thumbnails
                </span>
              </div>
            )}
          </div>

          {/* Product Brand Title */}
          <h1 className="text-xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug mt-5 mb-2.5">
            {product.brandname}
          </h1>

          {/* Price Row */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <span className="text-2xl sm:text-4xl font-extrabold text-[#b91c1c] tracking-tight">
              {formattedPrice}
            </span>

            {formattedMrp && (
              <span className="text-sm sm:text-lg text-slate-400 line-through font-normal">
                {formattedMrp}
              </span>
            )}

            {discountBadge && (
              <span className="bg-[#DCFCE7] text-[#15803D] text-xs sm:text-sm font-bold px-2.5 py-0.5 rounded-md tracking-wide">
                {discountBadge}
              </span>
            )}
          </div>

          {/* Subtitle Details */}
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1.5 mb-5 leading-normal">
            Inclusive of taxes • Free Delivery • Installation Included
          </p>

          {/* Two Feature Badges (Grid of 2) */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-[#F3F4F6] rounded-xl py-3.5 px-3 flex items-center justify-center gap-2 text-center">
              <Truck className="w-5 h-5 text-[#059669] shrink-0 stroke-[2]" />
              <span className="text-xs sm:text-sm font-semibold text-slate-800">
                Free Delivery
              </span>
            </div>
            <div className="bg-[#F3F4F6] rounded-xl py-3.5 px-3 flex items-center justify-center gap-2 text-center">
              <ShieldCheck className="w-5 h-5 text-[#2563EB] shrink-0 stroke-[2]" />
              <span className="text-xs sm:text-sm font-semibold text-slate-800">
                Warranty Support
              </span>
            </div>
          </div>

          {/* Section Heading */}
          <div className="mb-3.5">
            <h2 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight">
              Product Highlights
            </h2>
          </div>

          {/* Checklist */}
          <ul className="space-y-2.5 sm:space-y-3 mb-8">
            {highlights.map((itemText: string, i: number) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm sm:text-base text-slate-800 font-medium leading-relaxed"
              >
                <span className="text-slate-900 font-bold shrink-0 select-none text-base leading-none mt-0.5">
                  ✓
                </span>
                <span>{itemText}</span>
              </li>
            ))}
          </ul>

          {/* Action Buttons (Stacked Vertically) */}
          <div className="flex flex-col gap-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#059669] hover:bg-[#047857] active:scale-[0.99] text-white font-bold text-sm sm:text-base py-3.5 px-4 rounded-xl text-center transition-all duration-200 shadow-xs flex items-center justify-center cursor-pointer"
            >
              WhatsApp — Order Now
            </a>

            <a
              href="tel:+918870534049"
              className="w-full bg-[#0F172A] hover:bg-[#1E293B] active:scale-[0.99] text-white font-bold text-sm sm:text-base py-3.5 px-4 rounded-xl text-center transition-all duration-200 shadow-xs flex items-center justify-center cursor-pointer"
            >
              Call Technician
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetailClient;
