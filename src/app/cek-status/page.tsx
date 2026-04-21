"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

// ─── Types ───────────────────────────────────────────────────────────────────
type ProgressItem = {
  id_progress: number;
  judul_update: string;
  deskripsi_progress: string | null;
  persentase: number | null;
  status_progress: string;
  tanggal_update: string;
};

type OrderDetail = {
  kode_pemesanan: string;
  nama_proyek: string;
  total_harga: number;
  status_pemesanan: string;
  tanggal_pesan: string;
  tanggal_mulai: string | null;
  tanggal_selesai: string | null;
  pelanggan: { nama: string; email: string; no_telepon: string; nama_brand: string | null } | null;
  paket: { nama_paket: string; tipe_paket: string; estimasi_hari: number } | null;
  pembayaran: { status_pembayaran: string; payment_type: string | null; gross_amount: number | null } | null;
  progress: ProgressItem[];
  whatsapp_url: string;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const STATUS_PEMESANAN_LABEL: Record<string, string> = {
  menunggu_pembayaran: "Menunggu Pembayaran",
  diproses: "Diproses",
  review: "Review & Revisi",
  selesai: "Selesai",
};

const STATUS_PEMESANAN_COLOR: Record<string, string> = {
  menunggu_pembayaran: "bg-yellow-100 text-yellow-800",
  diproses: "bg-blue-100 text-blue-800",
  review: "bg-purple-100 text-purple-800",
  selesai: "bg-green-100 text-green-800",
};

const STATUS_BAYAR_LABEL: Record<string, string> = {
  pending: "Menunggu",
  settlement: "Lunas",
  capture: "Lunas",
  deny: "Gagal",
  cancel: "Dibatalkan",
  expire: "Kadaluarsa",
};

const STATUS_BAYAR_COLOR: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  settlement: "bg-green-100 text-green-800",
  capture: "bg-green-100 text-green-800",
  deny: "bg-red-100 text-red-800",
  cancel: "bg-red-100 text-red-800",
  expire: "bg-red-100 text-red-800",
};

// ─── Progress timeline ────────────────────────────────────────────────────────
const STAGES = [
  { key: "diterima", label: "Pesanan Diterima" },
  { key: "pengerjaan", label: "Dalam Pengerjaan" },
  { key: "review", label: "Review dan Revisi" },
  { key: "selesai", label: "Selesai dan Diserahkan" },
];

const STATUS_TO_ACTIVE_STAGE: Record<string, number> = {
  menunggu_pembayaran: 0,
  diproses: 1,
  review: 2,
  selesai: 4,
};

function getStageState(stageIdx: number, status: string): "done" | "active" | "pending" {
  const active = STATUS_TO_ACTIVE_STAGE[status] ?? 0;
  if (stageIdx < active) return "done";
  if (stageIdx === active) return "active";
  return "pending";
}

function getStageTimestamp(stageIdx: number, order: OrderDetail): string | null {
  if (stageIdx === 0) return order.tanggal_pesan;
  if (stageIdx === 1) return order.tanggal_mulai;
  if (stageIdx === 3) return order.tanggal_selesai;
  return null;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between py-2.5 gap-4">
    <span className="text-sm font-semibold text-gray-800 flex-shrink-0">{label}</span>
    <span className="text-sm text-gray-700 text-right">{value}</span>
  </div>
);

const Badge = ({ label, colorClass }: { label: string; colorClass: string }) => (
  <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${colorClass}`}>
    {label}
  </span>
);

// ─── Main content ─────────────────────────────────────────────────────────────
const CekStatusContent = () => {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get("kode") ?? "";

  const [code, setCode] = useState(initialCode);
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;

    setIsLoading(true);
    setError(null);
    setOrder(null);
    setSearched(true);

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(trimmed)}`);
      const json = await res.json();
      if (json.success) {
        setOrder(json.data);
      } else {
        setError(json.error ?? "Pesanan tidak ditemukan.");
      }
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
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
            <p className="text-secondary-400 font-bold tracking-wider uppercase text-sm mb-3">Lihat Pesanan Saya</p>
            <h1 className="font-poppins text-4xl md:text-5xl font-bold text-white mb-6">
              Cek Status Pesanan Anda
            </h1>
            <p className="text-white text-lg text-primary-200 leading-relaxed border-l-4 border-primary-400 pl-6">
              Masukkan kode pemesanan yang anda terima setelah pembayaran untuk melihat status terkini dari project anda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Search ─── */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
            <h2 className="font-poppins text-lg font-bold text-gray-900 mb-1">
              Masukkan Kode Pemesanan
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Kode pemesanan dikirimkan setelah pembayaran berhasil. Format: UPG-XXXXXXXX-XXXXX
            </p>
            <form onSubmit={handleSearch} className="flex gap-3">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="UPG-20260420-0001"
                className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-400 focus:border-primary-300 outline-none transition-colors"
              />
              <Button
                variant="primary"
                type="submit"
                disabled={isLoading || !code.trim()}
              >
                {isLoading ? "Mencari..." : "Cek Status"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* ─── Results ─── */}
      {searched && (
        <section className="pb-20 bg-white">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl">

            {/* Divider */}
            <div className="flex items-center gap-4 mb-10">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-sm font-semibold text-gray-500">Hasil Pencarian</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                <p className="text-red-700 font-semibold mb-1">Pesanan Tidak Ditemukan</p>
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            {order && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Informasi Pesanan */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
                  <h3 className="font-poppins text-xl font-bold text-gray-900 mb-6">
                    Informasi Pesanan
                  </h3>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between py-2.5 gap-4">
                      <span className="text-sm font-semibold text-gray-800">Kode Pemesanan</span>
                      <span className="text-sm font-mono font-bold text-gray-900">{order.kode_pemesanan}</span>
                    </div>

                    <div className="flex items-center justify-between py-2.5 gap-4">
                      <span className="text-sm font-semibold text-gray-800">Status Pemesanan</span>
                      <Badge
                        label={STATUS_PEMESANAN_LABEL[order.status_pemesanan] ?? order.status_pemesanan}
                        colorClass={STATUS_PEMESANAN_COLOR[order.status_pemesanan] ?? "bg-gray-100 text-gray-700"}
                      />
                    </div>

                    {order.pembayaran && (
                      <div className="flex items-center justify-between py-2.5 gap-4">
                        <span className="text-sm font-semibold text-gray-800">Status Pembayaran</span>
                        <Badge
                          label={STATUS_BAYAR_LABEL[order.pembayaran.status_pembayaran] ?? order.pembayaran.status_pembayaran}
                          colorClass={STATUS_BAYAR_COLOR[order.pembayaran.status_pembayaran] ?? "bg-gray-100 text-gray-700"}
                        />
                      </div>
                    )}
                  </div>

                  <div className="h-px bg-gray-200 my-4" />

                  <div className="space-y-1">
                    {order.paket && <InfoRow label="Paket" value={order.paket.nama_paket} />}
                    <InfoRow label="Nama Project" value={order.nama_proyek} />
                    {order.pelanggan && <InfoRow label="Nama Pelanggan" value={order.pelanggan.nama} />}
                    <InfoRow label="Tanggal Pesan" value={formatDate(order.tanggal_pesan)} />
                    {order.tanggal_selesai && (
                      <InfoRow label="Estimasi Selesai" value={formatDate(order.tanggal_selesai)} />
                    )}
                    {order.paket && !order.tanggal_selesai && (
                      <InfoRow label="Estimasi Pengerjaan" value={`${order.paket.estimasi_hari} Hari Kerja`} />
                    )}
                    <InfoRow label="Total Dibayar" value={formatCurrency(order.total_harga)} />
                  </div>
                </div>

                {/* Progress Project */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
                  <h3 className="font-poppins text-xl font-bold text-gray-900 mb-8">
                    Progress Project
                  </h3>

                  <div className="space-y-0">
                    {STAGES.map((stage, idx) => {
                      const state = getStageState(idx, order.status_pemesanan);
                      const timestamp = getStageTimestamp(idx, order);
                      const progressItem = order.progress.find((p) =>
                        p.judul_update.toLowerCase().includes(stage.key.split("_")[0])
                      );

                      return (
                        <div key={stage.key} className="flex gap-5">
                          {/* Timeline indicator */}
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${state === "done"
                                ? "bg-gray-800"
                                : state === "active"
                                  ? "bg-gray-500"
                                  : "bg-gray-200"
                                }`}
                            >
                              {state === "done" && (
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                              {state === "active" && (
                                <div className="w-2.5 h-2.5 bg-white rounded-full" />
                              )}
                            </div>
                            {idx < STAGES.length - 1 && (
                              <div className={`w-0.5 h-10 mt-1 ${state === "done" ? "bg-gray-800" : "bg-gray-200"}`} />
                            )}
                          </div>

                          {/* Content */}
                          <div className="pb-8 min-w-0">
                            <p className={`font-semibold text-sm ${state === "pending" ? "text-gray-400" : "text-gray-900"}`}>
                              {stage.label}
                            </p>
                            {state === "pending" ? (
                              <p className="text-xs text-gray-400 mt-0.5">Menunggu</p>
                            ) : (
                              <>
                                {timestamp && (
                                  <p className="text-xs text-gray-500 mt-0.5">{formatDateTime(timestamp)}</p>
                                )}
                                {progressItem?.deskripsi_progress && (
                                  <p className="text-xs text-gray-500 mt-0.5">{progressItem.deskripsi_progress}</p>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* WA button */}
                <div className="text-center pt-2">
                  <a
                    href={order.whatsapp_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
                  >
                    Ada pertanyaan? Hubungi kami via WhatsApp →
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

// ─── Page export ──────────────────────────────────────────────────────────────
export default function CekStatus() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen text-gray-400">
          Memuat...
        </div>
      }
    >
      <CekStatusContent />
    </Suspense>
  );
}
