"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { statsData } from "@/data/index";

export const StatsSection = () => {
  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h4 className="text-secondary-600 font-bold tracking-wider uppercase text-sm mb-3">Track Record</h4>
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 mb-12">
              Apa yang Kita Capai
            </h2>
            <div className="space-y-5">
              {statsData.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50/50 transition-colors duration-300"
                >
                  <div className="text-4xl font-poppins font-bold text-primary-600 min-w-[80px]">{stat.value}</div>
                  <div>
                    <div className="font-poppins font-semibold text-gray-900 mb-1">{stat.label}</div>
                    <div className="text-gray-500 text-sm">{stat.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="/images/stats.jpg"
                alt="Track Record UPGRID DIGITAL"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
