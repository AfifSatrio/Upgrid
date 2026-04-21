"use client";

import React from "react";
import { motion } from "framer-motion";
import { features } from "@/data/index";

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-8 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Partner Digital Marketing yang Bisa Anda Andalkan
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Kami tidak hanya menawarkan jasa, tapi juga komitmen untuk membantu bisnis Anda berkembang.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all duration-300 text-left flex items-start space-x-6"
            >
              <div className="bg-primary-50 p-4 rounded-xl flex-shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-xl text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
