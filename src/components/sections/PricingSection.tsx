"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────
type BenefitPaket = {
  id_benefit: number;
  deskripsi_benefit: string;
};

type ApiPaket = {
  id_paket: number;
  nama_paket: string;
  slug: string;
  deskripsi: string | null;
  harga: number;
  estimasi_hari: number;
  tipe_paket: string;
  benefit_paket: BenefitPaket[];
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatHarga(harga: number): string {
  if (harga >= 1000000) {
    const jt = harga / 1000000;
    return `Rp ${Number.isInteger(jt) ? jt : jt.toLocaleString("id-ID", { maximumFractionDigits: 1 })}JT`;
  }
  return `Rp ${(harga / 1000).toLocaleString("id-ID")}K`;
}

function getPer(tipe: string): string {
  return tipe === "creative" ? "Mulai dari / bulan" : "Harga mulai dari";
}

// ─── FlipCard ─────────────────────────────────────────────────────────────────
const FlipCard = ({ pkg, isPopular }: { pkg: ApiPaket; isPopular: boolean }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative w-full h-[500px]" style={{ perspective: "1200px" }}>
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        whileHover={!isFlipped ? { rotateY: 15, y: -6, scale: 1.02 } : {}}
        transition={{ duration: 0.65, type: "spring", stiffness: 110, damping: 18 }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 rounded-2xl p-7 flex flex-col justify-between border ${
            isPopular
              ? "border-primary-500 shadow-xl bg-primary-50"
              : "border-gray-200 bg-white shadow-sm"
          }`}
          style={{ backfaceVisibility: "hidden" }}
        >
          {isPopular && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap">
              Paling Laris
            </div>
          )}

          <div className="text-center">
            <div className="w-14 h-14 bg-gray-100 rounded-full mx-auto mb-5 flex items-center justify-center text-xl">
              🔥
            </div>
            <h3 className="font-poppins text-lg font-bold text-gray-900 mb-2">
              {pkg.nama_paket}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {pkg.deskripsi ?? ""}
            </p>
          </div>

          <div className="mt-4">
            <div className="bg-white border border-gray-100 rounded-xl py-3 px-4 shadow-sm text-center mb-4">
              <div className="text-gray-400 text-xs uppercase tracking-wide mb-0.5">
                {getPer(pkg.tipe_paket)}
              </div>
              <div className="text-primary-600 font-bold text-2xl font-poppins">
                {formatHarga(pkg.harga)}
              </div>
            </div>

            <button
              onClick={() => setIsFlipped(true)}
              className="w-full text-sm text-primary-600 font-semibold hover:text-primary-700 mb-3 py-1 transition-colors cursor-pointer"
            >
              Lihat Detail →
            </button>

            <Link href={`/pesan?paket=${pkg.id_paket}`}>
              <Button variant={isPopular ? "primary" : "secondary"} className="w-full">
                Pesan Sekarang
              </Button>
            </Link>
          </div>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 rounded-2xl p-7 flex flex-col justify-between border ${
            isPopular
              ? "border-primary-500 shadow-xl bg-primary-50"
              : "border-gray-200 bg-gray-50 shadow-sm"
          }`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="overflow-hidden">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
              <h3 className="font-poppins text-sm font-bold text-gray-900">
                Yang Anda Dapatkan
              </h3>
              <button
                onClick={() => setIsFlipped(false)}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer flex items-center gap-1"
              >
                ← Kembali
              </button>
            </div>
            <ul className="space-y-1.5">
              {pkg.benefit_paket.map((b) => (
                <li key={b.id_benefit} className="flex items-start text-xs text-gray-700">
                  <svg
                    className="w-3.5 h-3.5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {b.deskripsi_benefit}
                </li>
              ))}
            </ul>
          </div>

          <Link href={`/pesan?paket=${pkg.id_paket}`} className="block mt-4">
            <Button variant="primary" className="w-full">
              Pesan Sekarang
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const CardSkeleton = () => (
  <div className="w-full h-[500px] rounded-2xl bg-gray-100 animate-pulse" />
);

// ─── PricingSection ───────────────────────────────────────────────────────────
export const PricingSection = () => {
  const [pakets, setPakets] = useState<ApiPaket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/paket")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setPakets(json.data);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 max-w-3xl mx-auto"
        >
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pilih Paket Sesuai Kebutuhan Anda
          </h2>
          <p className="text-gray-600 text-lg">
            Setiap paket dirancang dengan fitur terbaik untuk beragam skala bisnis. Klik{" "}
            <span className="text-primary-600 font-medium">Lihat Detail</span> untuk melihat
            benefit masing-masing paket.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <CardSkeleton />
                </motion.div>
              ))
            : pakets.map((pkg, idx) => (
                <motion.div
                  key={pkg.id_paket}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <FlipCard pkg={pkg} isPopular={pkg.slug === "standard"} />
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
};
