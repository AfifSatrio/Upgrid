"use client";

import React from "react";
import { motion } from "framer-motion";
import { benefits } from "@/data/index";

export const BenefitsSection = () => {
  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Apa yang Anda Dapatkan di Setiap Paket
            </h2>
            <p className="text-gray-600 text-lg">
              Semua paket kami sudah mencakup fitur-fitur berikut tanpa biaya tambahan.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/3 border-l-4 border-primary-500 pl-6"
          >
            <p className="text-sm text-gray-600 font-medium italic">
              "Fokus kami memberikan fungsionalitas terbaik, bukan sekedar estetika visual."
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col items-start hover:border-secondary-300 hover:shadow-md transition-all duration-300"
            >
              <div className="w-14 h-14 bg-secondary-50 rounded-xl flex items-center justify-center mb-6">
                {benefit.icon}
              </div>
              <h3 className="font-poppins font-bold text-lg text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
