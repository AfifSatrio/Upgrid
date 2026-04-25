"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export const ServicesPreviewSection = () => {
  return (
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
            <div className="h-64 w-full relative border-b border-gray-100 overflow-hidden">
              <Image
                src="/images/pembuatan-website.jpg"
                alt="Jasa Pembuatan Website"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
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
            <div className="h-64 w-full relative border-b border-gray-100 overflow-hidden">
              <Image
                src="/images/digital-agency.jpg"
                alt="Digital Creative Agency"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
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
  );
};
