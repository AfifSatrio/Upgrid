"use client";
import React from "react";
import {
  RiGlobalLine,
  RiMoneyDollarCircleLine,
  RiTargetLine,
  RiBarChartBoxLine,
  RiTeamLine,
  RiChatSmile2Line,
  RiShieldKeyholeLine,
  RiSmartphoneLine,
  RiSearchLine,
  RiBookOpenLine,
  RiCustomerService2Line,
} from "@remixicon/react";

export const digitalReasons = [
  {
    title: "Jangkauan Lebih Luas",
    description: "Raih pelanggan di seluruh Indonesia bahkan mancanegara tanpa batas geografis.",
    icon: <RiGlobalLine className="w-7 h-7 text-primary-600" />,
  },
  {
    title: "Biaya Lebih Efisien",
    description: "Hemat anggaran promosi dengan iklan digital yang terukur dan tepat sasaran.",
    icon: <RiMoneyDollarCircleLine className="w-7 h-7 text-primary-600" />,
  },
  {
    title: "Target Pasar Lebih Lengkap",
    description: "Segmentasi audiens yang presisi berdasarkan usia, lokasi, minat, dan perilaku.",
    icon: <RiTargetLine className="w-7 h-7 text-primary-600" />,
  },
  {
    title: "Hasil Terukur dan Transparan",
    description: "Setiap kampanye memiliki data performa yang bisa Anda pantau secara real-time.",
    icon: <RiBarChartBoxLine className="w-7 h-7 text-primary-600" />,
  },
];

export const features = [
  {
    title: "Tim Profesional & Berpengalaman",
    description: "Didukung oleh tim yang ahli di bidang digital marketing dan berpengalaman menangani berbagai spesialisasi.",
    icon: <RiTeamLine className="w-8 h-8 text-primary-600" />,
  },
  {
    title: "Harga Transparan",
    description: "Tidak ada biaya tersembunyi. Semua paket layanan kami dirincikan secara jelas agar Anda nyaman.",
    icon: <RiMoneyDollarCircleLine className="w-8 h-8 text-primary-600" />,
  },
  {
    title: "Laporan Berkala",
    description: "Anda akan menerima laporan performa secara berkala sehingga bisa memantau perkembangan kampanye Anda.",
    icon: <RiBarChartBoxLine className="w-8 h-8 text-primary-600" />,
  },
  {
    title: "Konsultasi Gratis",
    description: "Masih ragu? Diskusikan kebutuhan bisnis Anda dengan kami secara gratis bersama tim ahli kami.",
    icon: <RiChatSmile2Line className="w-8 h-8 text-primary-600" />,
  },
];

export const benefits = [
  {
    title: "Domain & Hosting Gratis",
    description: "Tidak perlu beli terpisah. Domain dan hosting 1 tahun pertama sudah kami sediakan di semua paket. Anda cukup pilih nama domain dan website Anda siap online.",
    icon: <RiGlobalLine className="w-7 h-7 text-secondary-500" />,
  },
  {
    title: "Sertifikat SSL",
    description: "Keamanan website terjamin dengan label koneksi yang aman. Website Anda otomatis mendapatkan SSL untuk mendukung SEO dan rasa aman bagi pengunjung.",
    icon: <RiShieldKeyholeLine className="w-7 h-7 text-secondary-500" />,
  },
  {
    title: "Desain Responsif",
    description: "Di era mobile-first, website yang tidak responsif sama saja mengusir pelanggan sebelum melihat produk. Website kami pastikan bisa dibuka pada berbagai layar.",
    icon: <RiSmartphoneLine className="w-7 h-7 text-secondary-500" />,
  },
  {
    title: "Optimasi SEO Dasar",
    description: "Website yang bagus tapi tidak ditemukan di Google itu percuma. Kami memastikan pondasi SEO website Anda sudah benar sejak awal (URL, meta tag, kecepatan).",
    icon: <RiSearchLine className="w-7 h-7 text-secondary-500" />,
  },
  {
    title: "Panduan Pengelolaan",
    description: "Kami tidak ingin Anda kebingungan sendiri. Karena itu, kami sediakan panduan lengkap agar Anda bisa mengelola konten website dengan mandiri.",
    icon: <RiBookOpenLine className="w-7 h-7 text-secondary-500" />,
  },
  {
    title: "Support & Konsultasi",
    description: "Ada kendala atau ingin ubah profil? Hubungi kami kapan saja. Kami percaya hubungan baik adalah kunci kepuasan jangka panjang.",
    icon: <RiCustomerService2Line className="w-7 h-7 text-secondary-500" />,
  },
];

export const packages = [
  {
    id: 1,
    name: "Paket Regular",
    description: "Cocok untuk UMKM atau Anda yang ingin mulai hadir secara online dengan budget terjangkau.",
    price: "Rp 1.500K",
    per: "Harga mulai dari",
    renewal: "Perpanjangan Rp 300K / tahun",
    benefits: [
      "Desain 1 halaman (landing page)",
      "Responsif (mobile-friendly)",
      "Domain + hosting 1 tahun",
      "Sertifikat SSL",
      "Revisi 2 kali",
      "Panduan pengelolaan",
    ],
  },
  {
    id: 2,
    name: "Paket Standard",
    description: "Cocok untuk bisnis berkembang yang butuh website lebih lengkap dengan integrasi pendaftaran layanan.",
    price: "Rp 3.5JT",
    per: "Harga mulai dari",
    renewal: "Perpanjangan Rp 500K / tahun",
    isPopular: true,
    benefits: [
      "Desain hingga 5 halaman",
      "Responsif (mobile-friendly)",
      "Domain + hosting 1 tahun",
      "Sertifikat SSL",
      "SEO dasar",
      "Integrasi WhatsApp chat",
      "Revisi 3 kali",
      "Panduan pengelolaan",
    ],
  },
  {
    id: 3,
    name: "Paket Premium",
    description: "Cocok untuk korporasi atau brand yang memiliki kebutuhan tingkat lanjut dengan resource tinggi.",
    price: "Rp 7JT",
    per: "Harga mulai dari",
    renewal: "Perpanjangan Rp 750K / tahun",
    benefits: [
      "Desain hingga 10 halaman",
      "Responsif (mobile-friendly)",
      "Domain + hosting 1 tahun",
      "Sertifikat SSL",
      "SEO lanjutan",
      "Integrasi media sosial & WhatsApp",
      "Google Analytics setup",
      "Revisi unlimited",
      "Maintenance 1 bulan",
      "Panduan pengelolaan",
    ],
  },
  {
    id: 4,
    name: "Digital Creative Agency",
    description: "Manajemen media sosial, konten kreatif, copywriting, serta iklan digital di Meta & Google Ads.",
    price: "Rp 900K",
    per: "Mulai dari / bulan",
    benefits: [
      "Manajemen media sosial",
      "Produksi konten grafis + video pendek",
      "Copywriting caption",
      "Penjadwalan & posting",
      "Pengelolaan iklan digital",
      "Laporan performa bulanan",
      "Konsultasi strategi",
    ],
  },
];

export const portfolioItems = [
  { title: "Rebranding Website UMKM Kuliner", category: "Jasa Website" },
  { title: "Kampanye Meta Ads Fashion Brand", category: "Digital Creative" },
  { title: "Landing Page Event Organizer", category: "Jasa Website" },
  { title: "Manajemen Sosmed Klinik Kecantikan", category: "Digital Creative" },
  { title: "E-Commerce Produk Lokal", category: "Jasa Website" },
  { title: "Google Ads Properti Developer", category: "Digital Creative" },
];

export const statsData = [
  { value: "50+", label: "Klien Terlayani", desc: "Berbagai skala bisnis dari UMKM hingga korporasi" },
  { value: "100+", label: "Proyek Selesai", desc: "Website, iklan digital, dan manajemen sosial media" },
  { value: "98%", label: "Kepuasan Klien", desc: "Berdasarkan survei klien aktif kami" },
];
