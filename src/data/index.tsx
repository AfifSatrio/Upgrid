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
