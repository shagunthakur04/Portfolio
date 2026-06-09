"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Download,
  Github,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import { motion } from "framer-motion";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { HeroBackground } from "@/components/sections/hero-background";
import { HeroVisual } from "@/components/sections/hero-visual";

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
} as const;

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden pt-28 pb-20 sm:pt-32 lg:pb-28"
    >
      <HeroBackground />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="order-2 max-w-2xl lg:order-1"
        >
          <motion.div
            variants={fadeUp}
            className="group mb-6 inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-primary/20 bg-white/80 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm backdrop-blur-md"
          >
            <motion.span
              animate={{ rotate: [0, 18, -10, 16, -6, 12, 0] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                repeatDelay: 1.2,
                ease: "easeInOut",
              }}
              className="inline-block origin-[70%_75%] text-base leading-none"
              aria-hidden
            >
              👋
            </motion.span>
            <span className="relative">
              {siteConfig.greeting}
              <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display text-[3.25rem] leading-[0.98] tracking-tight text-foreground sm:text-6xl lg:text-[4.5rem]"
          >
            <motion.span
              className="block font-sans font-bold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
            >
              {siteConfig.firstName}
            </motion.span>
            <motion.span
              className="mt-2 block font-serif text-[1.12em] italic"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
            >
              <span className="animate-gradient bg-gradient-to-r from-primary via-rose-500 to-primary bg-[length:200%_auto] bg-clip-text text-transparent">
                {siteConfig.lastName}
              </span>
            </motion.span>
          </motion.h1>

          <motion.div variants={fadeUp} className="mt-6 flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-primary to-primary/0" />
            <p className="text-xl font-semibold text-primary sm:text-2xl">
              {siteConfig.role}
            </p>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg"
          >
            {siteConfig.bio}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button asChild size="lg" className="group relative overflow-hidden">
                <Link href="#projects">
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  {siteConfig.cta.primary}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button asChild variant="outline" size="lg" className="group">
                <Link href={siteConfig.cvUrl} target="_blank" rel="noreferrer">
                  {siteConfig.cta.secondary}
                  <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <span className="text-sm font-medium text-muted-foreground">
              Follow me
            </span>
            <div className="flex items-center gap-3">
              {siteConfig.social.map((item, index) => {
                const Icon = socialIcons[item.icon];
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.08 }}
                    whileHover={{ y: -4, scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={item.href}
                      aria-label={item.label}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/15 bg-white/90 text-muted-foreground shadow-sm transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/25"
                    >
                      <Icon className="h-4 w-4" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        <div className="order-1 lg:order-2">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
