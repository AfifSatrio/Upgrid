"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

// ─── Types ───────────────────────────────────────────────────────────────────
type OrderDetail = {
  kode_pemesanan: string;
  nama_proyek: string;
  total_harga: number;
  paket: { nama_paket: string; estimasi_hari: number } | null;
  pembayaran: {
    status_pembayaran: string;
    gross_amount: number | null;
    redirect_url: string | null;
  } | null;
  whatsapp_url: string;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function extractKode(orderId: string): string {
  return orderId.split("-").slice(0, 3).join("-");
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

const STATUS_LABEL: Record<string, string> = {
  deny: "Ditolak",
  cancel: "Dibatalkan",
  expire: "Kadaluarsa",
  failure: "Gagal",
};

const POSSIBLE_CAUSES = [
  "Saldo tidak mencukupi",
  "Koneksi internet terputus saat proses pembayaran",
  "Waktu pembayaran telah habis (expired)",
  "Pembayaran dibatalkan oleh pengguna",
];

// ─── Row component ────────────────────────────────────────────────────────────
const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between py-2.5 gap-4">
    <span className="text-sm font-semibold text-gray-800 flex-shrink-0">{label}</span>
    <span className="text-sm text-gray-700 text-right">{value}</span>
  </div>
);

// ─── Main content ─────────────────────────────────────────────────────────────
const GagalContent = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id") ?? "";
  const transactionStatus = searchParams.get("transaction_status") ?? "failure";
  const kode = orderId ? extractKode(orderId) : "";

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!kode) { setIsLoading(false); return; }
    fetch(`/api/orders/${encodeURIComponent(kode)}`)
      .then((r) => r.json())
      .then((json) => { if (json.success) setOrder(json.data); })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [kode]);

  const statusLabel = STATUS_LABEL[transactionStatus] ?? "Gagal/Expired";

  const waUrl =
    order?.whatsapp_url ??
    `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "6281234567890"}?text=${encodeURIComponent(
      "Halo, pembayaran saya gagal. Saya membutuhkan bantuan."
    )}`;

  const retryUrl = order?.pembayaran?.redirect_url ?? null;

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-2xl">

        {/* Icon + heading */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Pembayaran Belum Selesai
          </h1>
          <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
            Sepertinya pembayaran anda belum berhasil diproses. Jangan khawatir, anda bisa
            mencoba kembali atau menghubungi tim kami untuk bantuan.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center text-gray-400 py-12">Memuat detail pesanan...</div>
        ) : (
          <div className="bg-gray-100 rounded-2xl p-8 mb-6">
            <div className="space-y-1">
              <div className="flex items-center justify-between py-2.5 gap-4">
                <span className="text-sm font-semibold text-gray-800">Status</span>
                <span className="text-xs font-semibold bg-red-100 text-red-800 px-3 py-1 rounded-full">
                  {statusLabel}
                </span>
              </div>
              {order?.paket && <InfoRow label="Paket" value={order.paket.nama_paket} />}
              {order && (
                <InfoRow
                  label="Total"
                  value={formatCurrency(order.pembayaran?.gross_amount ?? order.total_harga)}
                />
              )}
              {order?.paket && (
                <InfoRow label="Estimasi Pengerjaan" value={`${order.paket.estimasi_hari} Hari Kerja`} />
              )}
            </div>

            <div className="h-px bg-gray-300 my-5" />

            <h3 className="font-semibold text-sm text-gray-900 mb-3">Kemungkinan Penyebab:</h3>
            <ul className="space-y-2">
              {POSSIBLE_CAUSES.map((cause) => (
                <li key={cause} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0" />
                  {cause}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA buttons */}
        <div className="space-y-3">
          {retryUrl ? (
            <a href={retryUrl} className="block">
              <Button variant="primary" className="w-full" size="md">
                Coba Bayar Lagi
              </Button>
            </a>
          ) : (
            <Link href={kode ? `/pesan` : "/layanan"} className="block">
              <Button variant="primary" className="w-full" size="md">
                Coba Bayar Lagi
              </Button>
            </Link>
          )}
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="block">
            <Button variant="outline" className="w-full" size="md">
              Hubungi Admin via Whatsapp
            </Button>
          </a>
          <Link href="/" className="block">
            <Button variant="ghost" className="w-full" size="md">
              Kembali ke Beranda
            </Button>
          </Link>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8 leading-relaxed">
          Data pesanan anda tetap tersimpan. Anda bisa melakukan pembayaran ulang kapan saja
          selama pesanan belum kedaluwarsa.
        </p>
      </div>
    </div>
  );
};

// ─── Page export ──────────────────────────────────────────────────────────────
export default function Gagal() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen text-gray-400">
          Memuat...
        </div>
      }
    >
      <GagalContent />
    </Suspense>
  );
}
