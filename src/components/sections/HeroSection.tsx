"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export const HeroSection = () => {
  return (
    <section className="relative pt-20 pb-24 md:pt-32 md:pb-36 overflow-hidden bg-white">
      <div className="pointer-events-none absolute -top-32 -right-32 w-[550px] h-[550px] bg-primary-100 rounded-full blur-3xl opacity-40 animate-blob" />
      <div className="pointer-events-none absolute bottom-0 -left-32 w-[450px] h-[450px] bg-secondary-100 rounded-full blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="pointer-events-none absolute top-1/2 left-1/3 w-[350px] h-[350px] bg-primary-50 rounded-full blur-3xl opacity-50 animate-blob animation-delay-4000" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <h1 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.15] mb-6">
              Wujudkan Pertumbuhan Bisnis Anda Melalui Strategi Digital yang{" "}
              <span className="text-primary-600">Tepat Sasaran</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              UPGRID DIGITAL membantu merek skala kecil hingga besar di Indonesia untuk go-digital,
              menjangkau audiens baru, dan membangun konversi yang lebih baik.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/kontak">
                <Button variant="primary" size="lg">Konsultasi Gratis</Button>
              </Link>
              <Link href="/layanan">
                <Button variant="outline" size="lg">Lihat Layanan</Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 w-full"
          >
            <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="/images/hero.gif"
                alt="Hero UPGRID DIGITAL"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
