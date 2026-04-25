"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CallToActionCTA } from "@/components/sections/CallToActionCTA";
import { FeaturesSection } from "@/components/sections/FeaturesSection";

const ProcessStep = ({ number, title, desc }: { number: string; title: string; desc: string }) => (
  <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group hover:border-primary-100 hover:shadow-md transition-all">
    <div className="absolute top-0 right-0 w-24 h-24 bg-primary-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
    <div className="relative z-10 w-10 h-10 bg-primary-50 border border-primary-100 rounded-lg flex items-center justify-center font-poppins font-bold text-primary-600 mb-4">
      {number}
    </div>
    <h3 className="relative z-10 font-poppins font-semibold text-lg text-gray-900 mb-2">{title}</h3>
    <p className="relative z-10 text-gray-500 text-sm">{desc}</p>
  </div>
);

export default function Tentang() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* ─── Header ─── */}
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

      {/* ─── Siapa Kami ─── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="font-poppins text-3xl font-bold text-gray-900 mb-6">Siapa Kami?</h2>
              <p className="text-gray-600 mb-4">
                UPGRID DIGITAL adalah agensi digital marketing yang berbasis di Indonesia, berfokus pada jasa pembuatan website dan layanan creative digital agency. Kami berdiri dengan satu tujuan sederhana: membantu bisnis dari berbagai skala untuk membangun kehadiran online yang kuat, profesional, dan berdampak nyata terhadap pertumbuhan usaha.
              </p>
              <p className="text-gray-600 mb-4">
                Kami memahami bahwa dunia digital terus berubah dengan cepat, dan tidak semua pemilik bisnis punya waktu atau sumber daya untuk mengikutinya. Di sinilah peran kami — menjadi partner yang mengatur seluruh kebutuhan digital Anda, sementara Anda fokus mengerjakan dan mengembangkan bisnis.
              </p>
              <p className="text-gray-600 font-medium">
                Dengan pendekatan yang berbasis data, berorientasi pada hasil, dan mengutamakan komunikasi yang transparan, kami berkomitmen untuk memberikan layanan terbaik bagi setiap klien - tanpa terkecuali.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 w-full"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-sm">
                <Image
                  src="/images/about-page.jpg"
                  alt="Siapa Kami - UPGRID DIGITAL"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Visi Misi ─── */}
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

      <FeaturesSection />

      {/* ─── Process Section ─── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:w-1/2">
              <h2 className="font-poppins text-3xl font-bold text-gray-900 mb-4">Bagaimana Cara Kami Bekerja?</h2>
              <p className="text-gray-600">Proses kerja di rancang agar transparan, terstruktur, dan mudah dipahami. Anda akan selalu tahu apa yang sedang terjadi di setiap tahap.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:w-1/3 border-l-4 border-secondary-500 pl-6">
              <p className="text-sm text-gray-600 font-medium italic">Sederhana, transparan, dan berorientasi pada kepuasan Anda. Itulah cara kami bekerja.</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProcessStep number="1" title="Konsultasi" desc="Anda menceritakan kebutuhan dan tujuan bisnis Anda. Kami mendengarkan, mambahas, dan memberi gambaran awal — gratis dan tanpa komitmen." />
            <ProcessStep number="2" title="Analisis & Perencanaan" desc="Kami menganalisis kebutuhan Anda secara mendalam, menentukan strategi yang tepat, dan menyusun rencana kerja beserta timeline yang jelas." />
            <ProcessStep number="3" title="Perancangan" desc="Tim kami mulai merancang desain dan konten berdasarkan riset yang telah disepakati. Anda akan dilibatkan untuk memberikan feedback." />
            <ProcessStep number="4" title="Pengerjaan" desc="Setelah desain disetujui, kami mulai mengerjakan project — baik itu development website atau produksi konten digital." />
            <ProcessStep number="5" title="Review & Revisi" desc="Hasil pekerjaan dipresentasikan kepada Anda untuk direview. Kami melakukan revisi sesuai feedback hingga Anda benar-benar puas." />
            <ProcessStep number="6" title="Serah Terima & Support" desc="Project diserahkan beserta panduan pengelolaan. Tapi hubungan kami tidak berhenti di sini — tim support kami tetap siap membantu kapanpun." />
          </div>
        </div>
      </section>

      <CallToActionCTA />
    </div>
  );
}
