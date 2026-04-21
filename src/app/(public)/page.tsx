"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { CallToActionCTA } from "@/components/sections/CallToActionCTA";
import { digitalReasons, portfolioItems, statsData } from "@/data/index";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* ─── Hero Section ─── */}
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-36 overflow-hidden bg-white">
        {/* Animated gradient blobs */}
        <div className="pointer-events-none absolute -top-32 -right-32 w-[550px] h-[550px] bg-primary-100 rounded-full blur-3xl opacity-40 animate-blob" />
        <div className="pointer-events-none absolute bottom-0 -left-32 w-[450px] h-[450px] bg-secondary-100 rounded-full blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="pointer-events-none absolute top-1/2 left-1/3 w-[350px] h-[350px] bg-primary-50 rounded-full blur-3xl opacity-50 animate-blob animation-delay-4000" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2"
            >
              <h1 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.15] mb-6">
                Wujudkan Pertumbuhan Bisnis Anda Melalui Strategi Digital yang{" "}
                <span className="text-primary-600">Tepat Sasaran</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                UPGRID DIGITAL membantu merek skala kecil hingga besar di Indonesia untuk go-digital,
                menjangkau audiens baru, dan membangun konversi yang lebih baik.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/kontak">
                  <Button variant="primary" size="lg">Konsultasi Gratis</Button>
                </Link>
                <Link href="/layanan">
                  <Button variant="outline" size="lg">Lihat Layanan</Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/2 w-full"
            >
              <div className="relative aspect-square md:aspect-[4/3] bg-gray-100 rounded-3xl overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center">
                <span className="text-gray-400 font-medium">Image Placeholder (Hero)</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Di Era Digital ─── */}
      <section className="py-20 relative overflow-hidden border-t border-primary-100">
        {/* Dot grid background */}
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

      {/* ─── About Section ─── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:w-1/2 w-full"
            >
              <div className="relative aspect-[4/3] bg-gray-100 rounded-3xl overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center">
                <span className="text-gray-400 font-medium">Image Placeholder (About)</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h4 className="text-secondary-600 font-bold tracking-wider uppercase text-sm mb-3">UPGRID DIGITAL</h4>
              <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Solusi Digital Marketing untuk Bisnis Anda
              </h2>
              <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                UPGRID DIGITAL adalah agensi digital marketing yang membantu bisnis dalam dunia yang terus berubah
                dengan cepat. Kami hadir menjembatani jarak antara bisnis Anda dan dunia digital.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Dengan bahasa yang membumi, proses yang transparan, dan hasil yang konkret — kami memastikan
                setiap langkah digital Anda berdampak nyata bagi pertumbuhan bisnis.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/tentang">
                  <Button variant="outline">Tentang Kami</Button>
                </Link>
                <Link href="/portofolio">
                  <Button variant="ghost">Lihat Portofolio →</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Partner / Features ─── */}
      <FeaturesSection />

      {/* ─── Stats — Apa yang Kita Capai ─── */}
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
              <div className="relative aspect-[4/3] bg-gray-100 rounded-3xl overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center">
                <span className="text-gray-400 font-medium">Image Placeholder (Stats)</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Services Preview ─── */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Layanan Digital Marketing yang Kami Tawarkan
            </h2>
            <p className="text-gray-600 text-lg">
              Solusi end-to-end untuk membawa brand Anda bersinar di platform digital.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white flex flex-col h-full"
            >
              <div className="h-64 bg-gradient-to-br from-primary-50 to-primary-100 w-full relative flex items-center justify-center border-b border-gray-100">
                <span className="text-primary-300 font-medium">Image Placeholder</span>
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-poppins text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">Jasa Pembuatan Website</h3>
                  <p className="text-gray-600 mb-6">
                    Bangun presensi online yang kuat dengan website perusahaan, e-commerce, atau landing page berkonversi tinggi yang dioptimasi untuk kecepatan dan SEO.
                  </p>
                </div>
                <Link href="/layanan" className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700">
                  Lihat Paket <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white flex flex-col h-full"
            >
              <div className="h-64 bg-gradient-to-br from-secondary-50 to-secondary-100 w-full relative flex items-center justify-center border-b border-gray-100">
                <span className="text-secondary-400 font-medium">Image Placeholder</span>
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-poppins text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">Digital Creative Agency</h3>
                  <p className="text-gray-600 mb-6">
                    Manajemen media sosial yang komprehensif, desain konten grafis, copywriting persuasif, hingga iklan digital di Meta dan Google Ads.
                  </p>
                </div>
                <Link href="/layanan" className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700">
                  Lihat Detail <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <PricingSection />
      <BenefitsSection />

      {/* ─── Portfolio ─── */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div>
              <h4 className="text-secondary-600 font-bold tracking-wider uppercase text-sm mb-3">Portofolio</h4>
              <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900">
                Karya yang Telah Kami Hasilkan
              </h2>
            </div>
            <p className="text-gray-600 md:max-w-sm">
              Berikut beberapa project yang telah kami kerjakan bersama klien-klien kami.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group rounded-2xl overflow-hidden border border-gray-100 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`h-52 border-b border-gray-100 flex items-center justify-center ${idx % 2 === 0 ? "bg-gradient-to-br from-primary-50 to-primary-100" : "bg-gradient-to-br from-secondary-50 to-secondary-100"}`}>
                  <span className={`font-medium text-sm ${idx % 2 === 0 ? "text-primary-300" : "text-secondary-400"}`}>Image Placeholder</span>
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">{item.category}</span>
                  <h3 className="font-poppins font-bold text-gray-900 mt-1 group-hover:text-primary-600 transition-colors">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/portofolio">
              <Button variant="outline" size="lg">Lihat Semua Portofolio</Button>
            </Link>
          </div>
        </div>
      </section>

      <CallToActionCTA />
    </div>
  );
}
