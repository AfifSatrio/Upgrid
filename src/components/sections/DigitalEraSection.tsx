"use client";

import { motion } from "framer-motion";
import { digitalReasons } from "@/data/index";

export const DigitalEraSection = () => {
  return (
    <section className="py-20 relative overflow-hidden border-t border-primary-100">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-white" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(37,99,235,0.12) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Di Era Digital, Kehadiran Online Bukan Lagi Pilihan —{" "}
            <span className="text-primary-600">Melainkan Kebutuhan</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Bisnis yang tidak hadir secara digital tertinggal sebelum bersaing. Berikut alasan mengapa digital marketing menjadi fondasi bisnis yang kuat.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {digitalReasons.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                {item.icon}
              </div>
              <h3 className="font-poppins font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
