"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";

export const CallToActionCTA = () => {
  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10"
        >
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 bg-secondary-400/20 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

          <div className="lg:w-1/2 relative z-10">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Siap Membawa Bisnis Anda ke Level Berikutnya?
            </h2>
            <p className="text-primary-100 mb-8 text-lg max-w-lg">
              Konsultasikan kebutuhan digital marketing bisnis Anda bersama tim UPGRID DIGITAL.
              Gratis, tanpa komitmen.
            </p>
            <Link href="/kontak">
              <Button variant="secondary" size="lg">
                Konsultasi Gratis
              </Button>
            </Link>
          </div>

          <div className="lg:w-1/2 w-full relative z-10">
            <div className="aspect-[4/3] bg-white/10 rounded-2xl flex items-center justify-center border-2 border-dashed border-white/30 backdrop-blur-sm">
              <span className="text-white/50 font-medium">Image Placeholder</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
