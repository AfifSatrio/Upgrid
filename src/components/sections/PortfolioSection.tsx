"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

type PortofolioItem = {
  id_portofolio: number;
  judul: string;
  deskripsi: string | null;
  gambar: string | null;
  link_project: string | null;
  tanggal_publish: string | null;
};

export const PortfolioSection = () => {
  const [portfolio, setPortfolio] = useState<PortofolioItem[]>([]);
  const [portfolioLoading, setPortfolioLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portofolio")
      .then((res) => res.json())
      .then((json) => setPortfolio(json.data ?? []))
      .catch(() => setPortfolio([]))
      .finally(() => setPortfolioLoading(false));
  }, []);

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <h4 className="text-secondary-600 font-bold tracking-wider uppercase text-sm mb-3">Portofolio</h4>
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900">
              Karya yang Telah Kami Hasilkan
            </h2>
          </div>
          <p className="text-gray-600 md:max-w-sm">
            Berikut beberapa project yang telah kami kerjakan bersama klien-klien kami.
          </p>
        </motion.div>

        {portfolioLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-gray-100 bg-white animate-pulse">
                <div className="h-52 bg-gray-100" />
                <div className="p-5 space-y-2">
                  <div className="h-3 w-20 bg-gray-100 rounded" />
                  <div className="h-4 w-3/4 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : portfolio.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">Belum ada portofolio yang ditampilkan.</p>
            <p className="text-gray-400 text-sm mt-1">Nantikan karya-karya kami segera.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((item, idx) => (
              <motion.div
                key={item.id_portofolio}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group rounded-2xl overflow-hidden border border-gray-100 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`h-52 border-b border-gray-100 relative overflow-hidden ${!item.gambar ? (idx % 2 === 0 ? "bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center" : "bg-gradient-to-br from-secondary-50 to-secondary-100 flex items-center justify-center") : ""}`}>
                  {item.gambar ? (
                    <Image
                      src={item.gambar}
                      alt={item.judul}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <span className={`font-medium text-sm ${idx % 2 === 0 ? "text-primary-300" : "text-secondary-400"}`}>
                      {item.judul}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  {item.tanggal_publish && (
                    <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                      {new Date(item.tanggal_publish).toLocaleDateString("id-ID", { year: "numeric", month: "long" })}
                    </span>
                  )}
                  <h3 className="font-poppins font-bold text-gray-900 mt-1 group-hover:text-primary-600 transition-colors">{item.judul}</h3>
                  {item.deskripsi && (
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.deskripsi}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/portofolio">
            <Button variant="outline" size="lg">Lihat Semua Portofolio</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
