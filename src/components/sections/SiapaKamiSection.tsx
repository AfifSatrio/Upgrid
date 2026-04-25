"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export const SiapaKamiSection = () => {
  return (
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
  );
};
