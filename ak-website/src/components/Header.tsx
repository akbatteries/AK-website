"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, PhoneCall, ChevronDown, BadgeCheck, Wrench, UserCheck, ShieldCheck, Tag, Zap, MapPin, Home, Battery, Droplets, Phone, HelpCircle, Info } from "lucide-react";
import { Button } from "./ui/Button";
import { EnquiryModal } from "./EnquiryModal";

const marqueeFeatures = [
  { text: "Genuine Products", Icon: BadgeCheck, color: "text-[#0D9488] bg-[#14B8A6]/10 border-[#14B8A6]/20" },
  { text: "Doorstep Installation", Icon: Wrench, color: "text-[#0D9488] bg-[#14B8A6]/10 border-[#14B8A6]/20" },
  { text: "Expert Technicians", Icon: UserCheck, color: "text-[#0D9488] bg-[#14B8A6]/10 border-[#14B8A6]/20" },
  { text: "Warranty Support", Icon: ShieldCheck, color: "text-[#0D9488] bg-[#14B8A6]/10 border-[#14B8A6]/20" },
  { text: "Affordable Pricing", Icon: Tag, color: "text-[#0D9488] bg-[#14B8A6]/10 border-[#14B8A6]/20" },
  { text: "Fast Response", Icon: Zap, color: "text-[#0D9488] bg-[#14B8A6]/10 border-[#14B8A6]/20" },
  { text: "Trusted Local Service", Icon: MapPin, color: "text-[#0D9488] bg-[#14B8A6]/10 border-[#14B8A6]/20" },
];

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    {
      name: "Products",
      href: "/batteries-inverters",
      dropdown: [
        { name: "UPS Inverters & Batteries", href: "/batteries-inverters" },
        { name: "RO Water Purifier", href: "/water-purifier" },
      ],
    },
    { name: "About us", href: "/about" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  const activeItem = React.useMemo(() => {
    const current = navItems.find(
      (item) =>
        item.href === pathname ||
        (item.dropdown && item.dropdown.some((sub) => sub.href === pathname))
    );
    return current ? current.name : "Home";
  }, [pathname]);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Top Announcement Marquee Bar at Very Top of Website - Light Theme */}
      <div className="w-full bg-white/90 backdrop-blur-md border-b border-slate-200/60 py-2 overflow-hidden relative select-none">
        {/* Gradient edge masks */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#FAFBFD] via-[#FAFBFD]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#FAFBFD] via-[#FAFBFD]/80 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex w-max items-center gap-12 whitespace-nowrap">
          {marqueeFeatures.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-slate-700 font-semibold text-xs tracking-wide">
              <span className={`flex items-center justify-center w-5 h-5 rounded-md border ${feature.color}`}>
                <feature.Icon className="w-3 h-3" />
              </span>
              <span>{feature.text}</span>
            </div>
          ))}
          {marqueeFeatures.map((feature, index) => (
            <div key={`dup-${index}`} className="flex items-center gap-2 text-slate-700 font-semibold text-xs tracking-wide">
              <span className={`flex items-center justify-center w-5 h-5 rounded-md border ${feature.color}`}>
                <feature.Icon className="w-3 h-3" />
              </span>
              <span>{feature.text}</span>
            </div>
          ))}
        </div>
      </div>

      <header
        className={`w-full transition-all duration-300 ${scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(15,23,42,0.06)] border-b border-slate-200/80"
          : "bg-white/80 backdrop-blur-sm border-b border-slate-100/60"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="flex items-center gap-2.5 select-none transition-transform hover:scale-105"
              >
                <Image
                  src="/new logo.svg"
                  alt="AK Batteries Logo"
                  width={44}
                  height={44}
                  className="w-10 h-10 sm:w-11 sm:h-11 object-contain"
                  priority
                  loading="eager"
                />

              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => {
                if (item.dropdown) {
                  const isDropdownActive = item.dropdown.some((sub) => sub.href === pathname);
                  return (
                    <div key={item.name} className="relative group flex items-center h-full py-4">
                      <button
                        className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300 flex items-center gap-1 text-slate-600 hover:text-red-600 hover:bg-slate-50 focus:outline-none ${isDropdownActive ? "text-red-600 bg-red-50/50" : ""
                          }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                      </button>
                      {/* Dropdown Menu */}
                      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-0.5 hidden group-hover:block bg-white border border-slate-100 rounded-md shadow-xl py-2 w-48 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={handleNavClick}
                            className={`block px-4 py-2.5 text-xs font-bold transition-colors uppercase tracking-wider ${pathname === sub.href ? "text-red-600 bg-red-50/20" : "text-slate-600 hover:text-red-600 hover:bg-slate-50"
                              }`}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={handleNavClick}
                    className={`relative px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-300 ${activeItem === item.name
                      ? "text-red-600 bg-red-50/50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>


            {/* Mobile menu circular toggle (Matching reference design) */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md hover:bg-slate-800 active:scale-95 transition-all focus:outline-none cursor-pointer"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="block h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="block h-5 w-5 stroke-[2.5]" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel — only About Us, FAQ, Place Order */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-b border-slate-100 ${isOpen ? "max-h-[350px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
            }`}
          id="mobile-menu"
        >
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link
              href="/about"
              onClick={handleNavClick}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-base font-semibold transition-colors duration-200 ${pathname === "/about"
                ? "text-red-600 bg-red-50 font-bold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
            >
              <Info className="w-4 h-4" />
              About us
            </Link>
            <Link
              href="/faq"
              onClick={handleNavClick}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-base font-semibold transition-colors duration-200 ${pathname === "/faq"
                ? "text-red-600 bg-red-50 font-bold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
            >
              <HelpCircle className="w-4 h-4" />
              FAQ
            </Link>
            <div className="pt-4 border-t border-slate-100 px-4">
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setIsOpen(false);
                  setIsModalOpen(true);
                }}
                className="w-full justify-center shadow-sm"
              >
                <PhoneCall className="w-4 h-4 mr-2" />
                Place Order
              </Button>
            </div>
          </div>
        </div>

        <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </header>


      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 shadow-[0_-2px_16px_rgba(15,23,42,0.08)] pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around h-16 px-2">
          {[
            { name: "Home", href: "/", icon: Home },
            { name: "Batteries", href: "/batteries-inverters", icon: Battery },
            { name: "RO", href: "/water-purifier", icon: Droplets },
            { name: "Contact", href: "/contact", icon: Phone },
          ].map((tab) => {
            const isActive = pathname === tab.href;
            const TabIcon = tab.icon;
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className="relative flex flex-col items-center justify-center gap-1 min-w-[60px] py-1.5 select-none"
              >
                {/* Active indicator pill that slides between tabs */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute -top-[1px] w-8 h-[3px] rounded-full bg-red-500"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <motion.div
                  className="flex items-center justify-center w-8 h-8 rounded-xl"
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <TabIcon
                    className={`w-5 h-5 transition-colors duration-200 ${isActive ? "text-red-600 stroke-[2.5]" : "text-slate-400 stroke-[1.8]"
                      }`}
                  />
                </motion.div>
                <span className={`text-[10px] font-semibold tracking-wide leading-none ${isActive ? "text-red-600" : "text-slate-400"
                  }`}>
                  {tab.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

