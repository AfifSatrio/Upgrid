"use client";

import { motion } from "framer-motion";

export const VisiMisiSection = () => {
  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-poppins text-3xl font-bold text-gray-900 mb-4">Visi & Misi</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Kami dipandu oleh komitmen kuat untuk mengkatalisasi pertumbuhan digital klien kami.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:w-1/3 bg-white rounded-2xl p-8 border border-primary-100 shadow-sm"
          >
            <h3 className="font-poppins text-primary-600 font-bold tracking-wider uppercase mb-4">Visi</h3>
            <p className="text-lg leading-relaxed text-gray-700">
              Menjadi agensi digital marketing terpercaya yang memberikan dampak nyata dalam membangun dan mengembangkan ekosistem digital bisnis di Indonesia.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:w-2/3 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
          >
            <h3 className="font-poppins text-secondary-600 font-bold tracking-wider uppercase mb-6">Misi</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-secondary-500 mt-2 mr-3 flex-shrink-0"></span>
                <p className="text-gray-600">Menyediakan layanan pembuatan website dan digital marketing yang berkualitas, inovatif, dan terjangkau untuk berbagai skala bisnis.</p>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-secondary-500 mt-2 mr-3 flex-shrink-0"></span>
                <p className="text-gray-600">Membantu pelaku usaha memahami dan memanfaatkan potensi digital marketing untuk meningkatkan pertumbuhan bisnis mereka.</p>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-secondary-500 mt-2 mr-3 flex-shrink-0"></span>
                <p className="text-gray-600">Mengutamakan transparansi, komunikasi, dan kepuasan klien di setiap tahap kerja sama.</p>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-secondary-500 mt-2 mr-3 flex-shrink-0"></span>
                <p className="text-gray-600">Terus berinovasi mengikuti perkembangan teknologi dan tren digital demi memberikan solusi terbaik.</p>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
