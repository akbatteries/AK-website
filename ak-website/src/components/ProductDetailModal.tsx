"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Truck, ShieldCheck, Image as ImageIcon } from "lucide-react";

interface ProductDetailModalProps {
  product: any | null;
  isOpen: boolean;
  onClose: () => void;
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

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  // Reset selected image when a new product opens
  React.useEffect(() => {
    if (product) {
      setSelectedImageIndex(0);
    }
  }, [product]);

  // Close modal on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!product) return null;

  const productImages: string[] = product.images && product.images.length > 0
    ? product.images
    : product.image
      ? [product.image]
      : [];

  const formattedPrice = formatPrice(product.price);
  const formattedMrp = product.mrp ? formatPrice(product.mrp) : null;
  const discountBadge = calculateDiscount(product.mrp, product.price) || "43% OFF";
  const category = (product.category || "").toLowerCase();

  const highlights = product.highlights && product.highlights.length > 0
    ? product.highlights
    : product.description && typeof product.description === "string"
      ? product.description
          .split(/[\n,•]+/)
          .map((s: string) => s.replace(/^[✓\s*•\-]+/, "").trim())
          .filter(Boolean)
      : category.includes("water") || category.includes("purifier") || category.includes("ro")
        ? DEFAULT_HIGHLIGHTS_RO
        : DEFAULT_HIGHLIGHTS_INVERTER;

  const whatsappMessage = encodeURIComponent(
    `Hello AK Batteries! I want to order "${product.brandname}" (${formattedPrice}). Please share availability and delivery details.`
  );
  const whatsappUrl = `https://wa.me/918870534049?text=${whatsappMessage}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden z-10 my-auto border border-slate-200/90 max-h-[92vh] flex flex-col"
          >
            {/* Header Close Button */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-3.5 bg-white/95 backdrop-blur-md border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">
                Product Details
              </span>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors duration-200 cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Body Content */}
            <div className="overflow-y-auto p-4 sm:p-6 flex-1">
              {/* Product Image Frame */}
              <div className="w-full rounded-xl bg-[#F3F4F6] border border-slate-100 p-4 flex flex-col items-center justify-center relative overflow-hidden group select-none">
                {productImages.length > 0 ? (
                  <div className="flex flex-col items-center w-full">
                    <div className="relative w-full h-48 sm:h-64">
                      <Image
                        src={productImages[selectedImageIndex] || productImages[0]}
                        alt={product.brandname}
                        fill
                        priority
                        className="object-contain transition-transform duration-300 group-hover:scale-105 pointer-events-none"
                        sizes="(max-width: 640px) 90vw, 450px"
                      />
                    </div>

                    {productImages.length > 1 && (
                      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-200/70 w-full overflow-x-auto pb-1 scrollbar-none">
                        {productImages.map((img: string, idx: number) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setSelectedImageIndex(idx)}
                            className={`relative w-12 h-12 rounded-lg border-2 bg-white overflow-hidden shrink-0 transition-all cursor-pointer ${
                              selectedImageIndex === idx
                                ? "border-slate-900 ring-2 ring-slate-900/10 scale-105"
                                : "border-slate-200 opacity-70 hover:opacity-100"
                            }`}
                          >
                            <Image
                              src={img}
                              alt={`${product.brandname} thumbnail ${idx + 1}`}
                              fill
                              className="object-contain p-0.5"
                              sizes="48px"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 text-center py-10">
                    <div className="w-12 h-12 rounded-lg bg-slate-200/60 flex items-center justify-center text-slate-700 mb-1">
                      <ImageIcon className="w-7 h-7 stroke-[1.5]" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800 tracking-tight">
                      Large Product Image + Thumbnails
                    </span>
                  </div>
                )}
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug mt-4 mb-2">
                {product.brandname}
              </h2>

              {/* Price Row */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-2xl sm:text-[28px] font-extrabold text-[#b91c1c] tracking-tight">
                  {formattedPrice}
                </span>

                {formattedMrp && (
                  <span className="text-sm sm:text-base text-slate-400 line-through font-normal">
                    {formattedMrp}
                  </span>
                )}

                {discountBadge && (
                  <span className="bg-[#DCFCE7] text-[#15803D] text-xs font-bold px-2 py-0.5 rounded-md tracking-wide">
                    {discountBadge}
                  </span>
                )}
              </div>

              {/* Subtitle */}
              <p className="text-xs sm:text-[13px] text-slate-500 font-normal mt-1.5 mb-4 leading-normal">
                Inclusive of taxes • Free Delivery • Installation Included
              </p>

              {/* Two Feature Badges (Grid of 2) */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-[#F3F4F6] rounded-xl py-3 px-2 flex items-center justify-center gap-2 text-center">
                  <Truck className="w-4.5 h-4.5 text-[#059669] shrink-0 stroke-[2]" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    Free Delivery
                  </span>
                </div>
                <div className="bg-[#F3F4F6] rounded-xl py-3 px-2 flex items-center justify-center gap-2 text-center">
                  <ShieldCheck className="w-4.5 h-4.5 text-[#2563EB] shrink-0 stroke-[2]" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    Warranty Support
                  </span>
                </div>
              </div>

              {/* Section Heading */}
              <div className="mb-3">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  Product Highlights
                </h3>
              </div>

              {/* Checklist */}
              <ul className="space-y-2 sm:space-y-2.5 mb-6">
                {highlights.map((itemText: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm sm:text-[15px] text-slate-800 font-medium leading-relaxed"
                  >
                    <span className="text-slate-900 font-bold shrink-0 select-none text-base leading-none mt-0.5">
                      ✓
                    </span>
                    <span>{itemText}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons (Stacked Vertically) */}
            <div className="p-4 bg-white border-t border-slate-100 flex flex-col gap-2.5">
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ProductDetailModal;
