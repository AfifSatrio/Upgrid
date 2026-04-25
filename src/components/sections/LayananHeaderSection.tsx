"use client";

import { motion } from "framer-motion";

export const LayananHeaderSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 pt-16 pb-20 overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-secondary-400 font-bold tracking-wider uppercase text-sm mb-3">LAYANAN YANG DITAWARKAN</p>
          <h1 className="font-poppins text-4xl md:text-5xl font-bold text-white mb-6">
            Untuk Pertumbuhan Bisnis Anda
          </h1>
          <p className="text-lg text-primary-200 leading-relaxed text-white">
            Kami menyediakan dua layanan utama — pembuatan website profesional dan layanan digital creative agency — yang bisa Anda pilih sesuai kebutuhan dan skala bisnis Anda.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
