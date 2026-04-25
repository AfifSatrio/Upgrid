"use client";

import Link from "next/link";
import Image from "next/image";
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
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/connect-with-us.png"
                alt="Connect with UPGRID DIGITAL"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
