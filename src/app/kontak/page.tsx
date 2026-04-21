"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { RiMapPinLine, RiMailLine, RiPhoneLine, RiCheckLine } from "@remixicon/react";

type FormState = { nama: string; email: string; pesan: string };
type Status = "idle" | "loading" | "success" | "error";

export default function Kontak() {
  const [form, setForm] = useState<FormState>({ nama: "", email: "", pesan: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isValid = form.nama.trim() && form.email.trim() && form.pesan.trim();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      // Format pesan untuk WhatsApp
      const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "6281234567890";
      const text = encodeURIComponent(
        `Halo, saya ${form.nama} (${form.email}) ingin menghubungi Upgrid Digital.\n\nPesan:\n${form.pesan}`
      );
      const waUrl = `https://wa.me/${waNumber}?text=${text}`;

      // Simpan ke Supabase via API jika tersedia, jika tidak langsung ke WA
      await fetch("/api/kontak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }).catch(() => null);

      setStatus("success");

      // Buka WA setelah jeda singkat
      setTimeout(() => {
        window.open(waUrl, "_blank");
      }, 800);

      // Reset form
      setForm({ nama: "", email: "", pesan: "" });
    } catch {
      setStatus("error");
      setErrorMsg("Terjadi kesalahan. Silakan hubungi kami langsung via WhatsApp.");
    }
  };

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
            <p className="text-secondary-400 font-bold tracking-wider uppercase text-sm mb-3">KONTAK</p>
            <h1 className="font-poppins text-4xl md:text-5xl font-bold text-white mb-6">
              Hubungi Kami
            </h1>
            <p className="text-lg text-primary-200 leading-relaxed border-l-4 border-primary-400 pl-6">
              Punya pertanyaan, ingin konsultasi, atau siap memulai project? Kami senang mendengar
              dari Anda. Hubungi kami melalui cara yang paling nyaman untuk Anda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Contact Body ─── */}
      <section className="py-20 flex-grow bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">

            {/* Info Kontak */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-5/12"
            >
              <div className="bg-gray-50 rounded-3xl p-8 md:p-12 h-full border border-gray-100">
                <h2 className="font-poppins text-2xl font-bold text-gray-900 mb-4">
                  Informasi Kontak
                </h2>
                <p className="text-gray-600 mb-10 text-sm leading-relaxed">
                  Jangan ragu untuk menghubungi kami melalui salah satu cara di bawah ini. Tim kami
                  biasanya merespons dalam waktu kurang dari 24 jam di hari kerja.
                </p>

                <div className="w-12 h-1 bg-primary-200 rounded mb-8" />

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-primary-600 mr-4 flex-shrink-0 border border-gray-100">
                      <RiPhoneLine size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Hubungi Kami</p>
                      <h3 className="font-poppins font-bold text-gray-900">+62 812-3456-7890</h3>
                    </div>
                  </div>
                  <div className="w-full h-px bg-gray-200" />
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-primary-600 mr-4 flex-shrink-0 border border-gray-100">
                      <RiMailLine size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email</p>
                      <h3 className="font-poppins font-bold text-gray-900">info@upgriddigital.com</h3>
                    </div>
                  </div>
                  <div className="w-full h-px bg-gray-200" />
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-primary-600 mr-4 flex-shrink-0 border border-gray-100">
                      <RiMapPinLine size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Alamat Kami</p>
                      <h3 className="font-poppins font-bold text-gray-900">Indonesia</h3>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-7/12 py-4"
            >
              <h2 className="font-poppins text-3xl font-bold text-gray-900 mb-4">
                Kirim Pesan kepada Kami
              </h2>
              <p className="text-gray-600 mb-8">
                Isi form di bawah ini dan tim kami akan menghubungi Anda sesegera mungkin.
              </p>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RiCheckLine size={32} className="text-green-600" />
                  </div>
                  <h3 className="font-poppins text-xl font-bold text-gray-900 mb-2">
                    Pesan Terkirim!
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Terima kasih telah menghubungi kami. WhatsApp kami akan terbuka otomatis.
                    Jika tidak, silakan hubungi kami langsung.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                  >
                    Kirim pesan lain →
                  </button>
                </motion.div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.nama}
                      onChange={(e) => setForm((p) => ({ ...p, nama: e.target.value }))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary-500 focus:bg-white focus:border-primary-300 transition-colors outline-none"
                      placeholder="Masukkan nama Anda"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary-500 focus:bg-white focus:border-primary-300 transition-colors outline-none"
                      placeholder="Masukkan email Anda"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Isi Pesan <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      rows={6}
                      required
                      value={form.pesan}
                      onChange={(e) => setForm((p) => ({ ...p, pesan: e.target.value }))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary-500 focus:bg-white focus:border-primary-300 transition-colors outline-none resize-none"
                      placeholder="Ceritakan kebutuhan Anda di sini..."
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                      {errorMsg}
                    </p>
                  )}

                  <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    disabled={!isValid || status === "loading"}
                  >
                    {status === "loading" ? "Mengirim..." : "Kirim Pesan"}
                  </Button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
