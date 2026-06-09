"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 lg:px-8"
    >
      <div
        className={cn(
          "mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between rounded-2xl px-4 transition-all duration-500 sm:px-5",
          scrolled
            ? "border border-white/70 bg-white/80 shadow-lg shadow-primary/10 backdrop-blur-xl"
            : "border border-transparent bg-white/40 backdrop-blur-md",
        )}
      >
        <Link href="#home" className="group flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: [0, -8, 8, 0], scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-sm font-bold text-primary ring-1 ring-primary/15 transition-colors group-hover:from-primary group-hover:to-rose-500 group-hover:text-white"
          >
            {siteConfig.firstName[0]}
            {siteConfig.lastName[0]}
          </motion.span>
          <span className="hidden font-display text-lg font-semibold tracking-tight text-foreground sm:block">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {siteConfig.nav.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * index + 0.2 }}
            >
              <Link
                href={item.href}
                className="group relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
                <span className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-primary transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="hidden sm:block"
          >
            <Button asChild size="sm" className="shadow-md shadow-primary/20">
              <Link href="#contact">{siteConfig.cta.header}</Link>
            </Button>
          </motion.div>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/15 bg-white/90 text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="absolute inset-x-4 top-[calc(4.25rem+0.75rem)] rounded-2xl border border-white/70 bg-white/95 p-4 shadow-xl shadow-primary/10 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-1">
              {siteConfig.nav.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/8 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <Button asChild className="mt-4 w-full">
              <Link href="#contact" onClick={() => setMobileOpen(false)}>
                {siteConfig.cta.header}
              </Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
