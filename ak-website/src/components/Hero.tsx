"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Droplets,
  BatteryCharging,
  ChevronRight,
  BadgeCheck,
  Wrench,
  UserCheck,
  Tag,
  Zap,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/Button";

interface Partner {
  name: string;
  color: string;
  src?: string;
  width?: number;
  height?: number;
  logo?: React.ReactNode;
}

interface ServiceItem {
  id: "ro" | "battery" | "inverter";
  title: string;
  shortTitle: string;
  tag: string;
  cardImg: string;
  bgImg: string;
  link: string;
  badge: {
    title: string;
    sub: string;
    color: string;
  };
}

const SERVICES: ServiceItem[] = [
  {
    id: "ro",
    title: "RO Water Purifier",
    shortTitle: "RO Repair",
    tag: "Clean & Pure Water",
    cardImg: "/images/service_ro_repair.jpg",
    bgImg: "/images/hero_bg_ro.jpg",
    link: "/water-purifier",
    badge: {
      title: "100% PURE",
      sub: "RO + ALKALINE",
      color: "from-cyan-600 via-teal-700 to-slate-900",
    },
  },
  {
    id: "battery",
    title: "Inverter Batteries",
    shortTitle: "Battery",
    tag: "Heavy-Duty Power",
    cardImg: "/images/service_battery_replace.jpg",
    bgImg: "/images/hero_bg_battery.jpg",
    link: "/batteries-inverters",
    badge: {
      title: "100% GENUINE",
      sub: "EXIDE & AMARON",
      color: "from-red-600 via-red-700 to-slate-900",
    },
  },
  {
    id: "inverter",
    title: "UPS & Inverters",
    shortTitle: "Inverter",
    tag: "Pure Sine Wave",
    cardImg: "/images/service_inverter_maintenance.jpg",
    bgImg: "/images/hero_bg_inverter.jpg",
    link: "/batteries-inverters",
    badge: {
      title: "SMART UPS",
      sub: "ZERO DOWNTIME",
      color: "from-amber-600 via-orange-700 to-slate-900",
    },
  },
];

export function Hero() {
  const [activeId, setActiveId] = React.useState<"ro" | "battery" | "inverter">("battery");

  const activeService = React.useMemo(
    () => SERVICES.find((s) => s.id === activeId) || SERVICES[1],
    [activeId]
  );

  // Cyclical slot order placing active item consistently in the center (index 1)
  const orderedServices = React.useMemo(() => {
    if (activeId === "ro") {
      return [SERVICES[2], SERVICES[0], SERVICES[1]]; // [Inverter, RO (center), Battery]
    } else if (activeId === "inverter") {
      return [SERVICES[1], SERVICES[2], SERVICES[0]]; // [Battery, Inverter (center), RO]
    } else {
      return [SERVICES[0], SERVICES[1], SERVICES[2]]; // [RO, Battery (center), Inverter]
    }
  }, [activeId]);

  const handleCardClick = (service: ServiceItem) => {
    setActiveId(service.id);
  };

  const features = [
    { text: "Genuine Products", Icon: BadgeCheck },
    { text: "Doorstep Installation", Icon: Wrench },
    { text: "Warranty Support", Icon: ShieldCheck },
    { text: "Affordable Pricing", Icon: Tag },
    { text: "Fast Response", Icon: Zap },
    { text: "Trusted Local Service", Icon: MapPin },
  ];

  const partners: Partner[] = [
    {
      name: "EXIDE",
      color: "text-[#DC2626]",
      src: "/logos/1.png",
      width: 206,
      height: 41,
    },
    {
      name: "AMARON",
      color: "text-[#4CAF50]",
      src: "/logos/2.jpg",
      width: 178,
      height: 56,
    },
    {
      name: "LUMINOUS",
      color: "text-[#0284C7]",
      src: "/logos/3.webp",
      width: 148,
      height: 35,
    },
    {
      name: "purosis",
      color: "text-[#10B981]",
      logo: (
        <svg
          className="max-h-full max-w-full"
          viewBox="0 0 110 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            x="0"
            y="22"
            fontFamily="Georgia, serif"
            fontStyle="italic"
            fontSize="20"
            fill="currentColor"
          >
            purosis
          </text>
          <circle cx="85" cy="8" r="2.5" fill="#10B981" />
        </svg>
      ),
    },
    {
      name: "Aquaguard",
      color: "text-[#0369A1]",
      src: "/logos/5.png",
      width: 340,
      height: 231,
    },
    {
      name: "Aqua Era",
      color: "text-[#0284C7]",
      src: "/logos/4.png",
      width: 432,
      height: 282,
    },
  ];

  return (
    <section id="home" className="relative w-full bg-white text-slate-900 overflow-hidden">
      {/* ============================================================== */}
      {/* 1. HERO SECTION BACKGROUND WITH ANIMATED CROSS-FADE            */}
      {/* ============================================================== */}
      <div className="relative w-full h-[400px] sm:h-[570px] md:h-[630px] overflow-hidden select-none">
        {SERVICES.map((srv) => {
          const isActive = srv.id === activeId;
          return (
            <motion.div
              key={srv.id}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 1.05,
              }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{
                zIndex: isActive ? 1 : 0,
              }}
            >
              <Image
                src={srv.bgImg}
                alt={srv.title}
                fill
                priority={srv.id === "battery"}
                className="object-cover object-center"
                sizes="100vw"
              />
            </motion.div>
          );
        })}

        {/* Ambient Top Shadow */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-transparent pointer-events-none z-[2]" />

        {/* Smooth Transition into Clean White Content Section Below */}
        <div className="absolute inset-x-0 bottom-0 h-44 sm:h-64 bg-gradient-to-t from-white via-white/85 to-transparent pointer-events-none z-[2]" />

        {/* Prominent AK Batteries Brand Showcase in Hero Section (Generously Spaced) */}
        <div className="absolute top-5 sm:top-8 md:top-10 inset-x-0 flex justify-center z-[3] pointer-events-none select-none px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center max-w-md sm:max-w-lg md:max-w-xl w-full"
          >


            {/* Brand Card with Generous Half-White Frosted Glass Styling */}
            <div className="w-full py-5 sm:py-7 md:py-8 px-6 sm:px-10 md:px-12 rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-sm border border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.18)] ring-1 ring-black/5 flex flex-col items-center">
              {/* Title */}
              <h1 className="font-serif font-black text-slate-900 text-2xl sm:text-3xl md:text-4xl tracking-tight leading-none drop-shadow-2xs">
                AK Batteries
              </h1>


              {/* Subtitle */}
              <div className="flex items-center gap-2 sm:gap-2.5 mt-3 sm:mt-3.5">
                <span className="text-xs sm:text-sm md:text-base font-extrabold text-slate-700 tracking-[0.14em] uppercase whitespace-nowrap">
                  Batteries & Water Purifiers
                </span>
              </div>

              {/* Trust Feature Pills */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-3.5 max-w-sm sm:max-w-lg">
                {features.slice(0, 5).map((feature, idx) => {
                  const IconComp = feature.Icon;
                  return (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200 text-slate-700 text-[10px] sm:text-xs font-semibold shadow-2xs select-none"
                    >
                      <IconComp className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                      <span>{feature.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Motto */}
              <h3 className="font-serif italic text-slate-600 text-xs sm:text-sm md:text-base font-medium tracking-wide mt-3.5 sm:mt-4 pt-3 sm:pt-3.5 border-t border-slate-200/90 w-full text-center">
                “Trusted Solutions for Everyday Living”
              </h3>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. FEATURED SERVICES CARDS (INTERACTIVE CENTER REORDERING)     */}
      {/* ============================================================== */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 -mt-12 sm:-mt-16 md:-mt-20">
        {/* Script label matching "Popular Services" with generous margin */}
        <div className="flex items-center justify-center mb-4 sm:mb-5 select-none">
          <span className="font-serif italic text-slate-800 text-xs sm:text-sm font-semibold tracking-wider drop-shadow-sm bg-white/85 backdrop-blur-md px-4.5 py-1.5 rounded-full border border-white/90 shadow-2xs inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Popular Services</span>
          </span>
        </div>

        {/* Horizontal Row of 3 Rounded Cards with generous gap and padding */}
        <div className="flex items-center justify-center gap-3.5 sm:gap-6 md:gap-7 py-3 sm:py-4">
          {orderedServices.map((service, index) => {
            const isCenter = index === 1;
            return (
              <motion.div
                key={service.id}
                layout
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 28,
                }}
                onClick={() => handleCardClick(service)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick(service);
                  }
                }}
                className={`cursor-pointer select-none rounded-2xl sm:rounded-3xl relative overflow-hidden transition-all duration-300 group ${isCenter
                  ? "w-28 sm:w-44 md:w-52 aspect-square shadow-2xl ring-4 ring-white z-10 scale-105 sm:scale-110"
                  : "w-24 sm:w-36 md:w-44 aspect-square shadow-lg border border-white/80 opacity-80 hover:opacity-100 z-0 hover:-translate-y-1 hover:shadow-xl"
                  }`}
              >
                <Image
                  src={service.cardImg}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes={isCenter ? "(max-width: 640px) 112px, 208px" : "(max-width: 640px) 96px, 176px"}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end justify-center p-2.5 sm:p-4 text-center">
                  <span
                    className={`font-serif font-extrabold text-white tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] text-center ${isCenter ? "text-base sm:text-xl" : "text-xs sm:text-base"
                      }`}
                  >
                    {service.shortTitle}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. TYPOGRAPHY & ACTION BUTTONS SECTION                        */}
      {/* ============================================================== */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-7 sm:pt-10 pb-8 text-center">
        {/* High-Contrast Bold Editorial Headline matching Reference */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-[1.12] max-w-2xl mx-auto"
        >
          Discover Reliable Power & Pure Water for Your Home
        </motion.h1>

        {/* Concise Description Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed mt-3.5 sm:mt-4 font-normal"
        >
          Doorstep sales, installation & service across Kannamangalam, Vellore and nearby areas.
          Authorized dealer for Exide, Amaron, and Purosis trusted by 1000+ happy homes.
        </motion.p>

        {/* Action CTAs (Side-by-Side: Solid Dark Button + Secondary Outlined Button) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10"
        >
          {/* Solid Dark Button with Drop Shadow */}
          <Link href="/batteries-inverters">
            <button className="bg-slate-950 hover:bg-black active:scale-95 text-white font-semibold text-xs sm:text-sm px-6 sm:px-8 py-3.5 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-all cursor-pointer">
              Explore Batteries
            </button>
          </Link>

          {/* Secondary Outlined Button */}
          <Link href="/water-purifier">
            <button className="bg-white hover:bg-slate-50 active:scale-95 text-slate-900 border border-slate-300 font-semibold text-xs sm:text-sm px-6 sm:px-8 py-3.5 rounded-full shadow-xs transition-all cursor-pointer">
              RO Purifiers
            </button>
          </Link>
        </motion.div>
      </div>

      <div className="pb-8 sm:pb-12" />
    </section>
  );
}

export default Hero;
