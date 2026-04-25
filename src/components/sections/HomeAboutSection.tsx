"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export const HomeAboutSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="/images/about.jpg"
                alt="Tentang UPGRID DIGITAL"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
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
  );
};
