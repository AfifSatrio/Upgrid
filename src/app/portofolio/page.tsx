"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CallToActionCTA } from "@/components/sections/CallToActionCTA";
import { Button } from "@/components/ui/Button";

// ─── Types ────────────────────────────────────────────────────────────────────
type PortfolioItem = {
  id_portofolio: number;
  judul: string;
  deskripsi: string | null;
  gambar: string | null;
  link_project: string | null;
  tanggal_publish: string | null;
};

// ─── Gradient colors for items without image ──────────────────────────────────
const GRADIENTS = [
  "from-primary-50 to-primary-100",
  "from-secondary-50 to-secondary-100",
  "from-blue-50 to-blue-100",
  "from-purple-50 to-purple-100",
  "from-green-50 to-green-100",
  "from-orange-50 to-orange-100",
];

const GRADIENT_TEXT = [
  "text-primary-300",
  "text-secondary-400",
  "text-blue-300",
  "text-purple-300",
  "text-green-300",
  "text-orange-300",
];

export default function Portofolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portofolio")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setItems(json.data);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">

      {/* ─── Header ─── */}
      <section className="relative bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 pt-16 pb-20 overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-secondary-400 font-bold tracking-wider uppercase text-sm mb-3">
              PORTOFOLIO UPGRID DIGITAL
            </p>
            <h1 className="font-poppins text-4xl md:text-5xl font-bold text-white mb-6">
              Karya Nyata, Hasil Nyata
            </h1>
            <p className="text-lg text-primary-200 leading-relaxed border-l-4 border-primary-400 pl-6">
              Setiap project yang kami kerjakan adalah bukti komitmen kami terhadap kualitas. Lihat
              sendiri bagaimana kami membantu bisnis-bisnis ini membangun kehadiran digital mereka.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Portfolio Grid ─── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-3xl font-bold text-gray-900 mb-4">
              Project yang Telah Kami Selesaikan
            </h2>
            <p className="text-gray-600">
              Dari berbagai industri dan skala bisnis, kami bangga telah menjadi bagian dari
              perjalanan digital mereka.
            </p>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-72 w-full rounded-2xl bg-gray-100 mb-4" />
                  <div className="h-5 bg-gray-100 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-100 rounded w-1/2" />
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && items.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg mb-2">Belum ada portofolio yang ditampilkan.</p>
              <p className="text-gray-400 text-sm">
                Segera hadir — kami sedang mempersiapkan showcase karya terbaik kami.
              </p>
            </div>
          )}

          {/* Portfolio items */}
          {!isLoading && items.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item, idx) => {
                const gradientClass = GRADIENTS[idx % GRADIENTS.length];
                const textClass = GRADIENT_TEXT[idx % GRADIENT_TEXT.length];

                return (
                  <motion.div
                    key={item.id_portofolio}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group"
                  >
                    <div
                      className={`h-72 w-full rounded-2xl mb-4 overflow-hidden relative flex items-center justify-center bg-gradient-to-br ${gradientClass}`}
                    >
                      {item.gambar ? (
                        <Image
                          src={item.gambar}
                          alt={item.judul}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <span className={`font-medium ${textClass}`}>{item.judul}</span>
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        {item.link_project ? (
                          <a
                            href={item.link_project}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button variant="primary">Lihat Project</Button>
                          </a>
                        ) : (
                          <Button variant="primary">Lihat Detail</Button>
                        )}
                      </div>
                    </div>
                    <h3 className="font-poppins font-bold text-xl text-gray-900">{item.judul}</h3>
                    {item.deskripsi && (
                      <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.deskripsi}</p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <CallToActionCTA />
    </div>
  );
}
