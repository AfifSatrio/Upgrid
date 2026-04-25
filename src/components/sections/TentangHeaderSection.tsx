"use client";

import { motion } from "framer-motion";

export const TentangHeaderSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 pt-16 pb-20 overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-secondary-400 font-bold tracking-wider uppercase text-sm mb-3">TENTANG UPGRID DIGITAL</p>
          <h1 className="font-poppins text-4xl md:text-5xl font-bold text-white mb-6">
            UPGRID DIGITAL
          </h1>
          <p className="text-lg text-primary-200 leading-relaxed border-l-4 border-primary-400 pl-6 text-white">
            Kami adalah tim yang percaya bahwa setiap bisnis berhak tumbuh di era digital. Kami hadir untuk mewujudkannya.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
