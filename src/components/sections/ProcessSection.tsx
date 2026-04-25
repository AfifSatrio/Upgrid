"use client";

import { motion } from "framer-motion";

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

export const ProcessSection = () => {
  return (
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
  );
};
