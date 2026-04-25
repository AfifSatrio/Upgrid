"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PricingSection } from "@/components/sections/PricingSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { CallToActionCTA } from "@/components/sections/CallToActionCTA";

export default function Layanan() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* ─── Header ─── */}
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

      {/* ─── Services Detail ─── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-poppins text-3xl font-bold text-gray-900 mb-4">Layanan Digital Marketing yang Kami Tawarkan</h2>
            <p className="text-gray-600">Kami menyediakan berbagai layanan digital marketing yang dirancang untuk membantu bisnis Anda tumbuh secara online.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="h-44 sm:h-52 md:h-64 relative border-b border-gray-100 overflow-hidden">
                <Image
                  src="/images/pembuatan-website.jpg"
                  alt="Jasa Pembuatan Website"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <h3 className="font-poppins text-2xl font-bold text-gray-900 mb-4">Jasa Pembuatan Website</h3>
                <p className="text-gray-600 mb-6">
                  Kami merancang website profesional yang responsif, cepat, dan sesuai dengan identitas bisnis Anda. Mulai dari company profile, landing page, hingga e-commerce.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center text-gray-700 text-sm"><span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span> Custom Design Web</li>
                  <li className="flex items-center text-gray-700 text-sm"><span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span> Web App Development</li>
                  <li className="flex items-center text-gray-700 text-sm"><span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span> CMS Integration</li>
                </ul>
                <Link href="#pricing" className="font-semibold text-primary-600 border-b-2 border-primary-600 pb-1 hover:text-primary-700 hover:border-primary-700 transition-colors">
                  Lihat Paket
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="h-44 sm:h-52 md:h-64 relative border-b border-gray-100 overflow-hidden">
                <Image
                  src="/images/digital-agency.jpg"
                  alt="Digital Creative Agency"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <h3 className="font-poppins text-2xl font-bold text-gray-900 mb-4">Digital Creative Agency</h3>
                <p className="text-gray-600 mb-6">
                  Kami mengelola kehadiran brand Anda di platform media sosial, memproduksi konten menarik, hingga manajemen social media.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center text-gray-700 text-sm"><span className="w-1.5 h-1.5 bg-secondary-500 rounded-full mr-2"></span> Social Media Management</li>
                  <li className="flex items-center text-gray-700 text-sm"><span className="w-1.5 h-1.5 bg-secondary-500 rounded-full mr-2"></span> Content Production</li>
                  <li className="flex items-center text-gray-700 text-sm"><span className="w-1.5 h-1.5 bg-secondary-500 rounded-full mr-2"></span> Digital Advertising</li>
                </ul>
                <Link href="/kontak" className="font-semibold text-primary-600 border-b-2 border-primary-600 pb-1 hover:text-primary-700 hover:border-primary-700 transition-colors">
                  Lihat Paket
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div id="pricing">
        <PricingSection />
      </div>
      <BenefitsSection />
      <CallToActionCTA />
    </div>
  );
}
