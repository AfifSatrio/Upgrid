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
  status_pemesanan: string;
  tanggal_pesan: string;
  paket: { nama_paket: string; estimasi_hari: number } | null;
  pembayaran: {
    status_pembayaran: string;
    payment_type: string | null;
    gross_amount: number | null;
    settlement_time: string | null;
    transaction_time: string | null;
  } | null;
  whatsapp_url: string;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function extractKode(orderId: string): string {
  const parts = orderId.split("-");
  // UPG-YYYYMMDD-XXXXX-TIMESTAMP → take first 3 segments
  return parts.slice(0, 3).join("-");
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
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

function formatPaymentType(type: string | null): string {
  if (!type) return "-";
  const map: Record<string, string> = {
    qris: "QRIS",
    bank_transfer: "Transfer Bank",
    credit_card: "Kartu Kredit",
    echannel: "Mandiri Bill",
    cstore: "Minimarket",
    gopay: "GoPay",
    shopeepay: "ShopeePay",
  };
  return map[type] ?? type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// ─── Row component ────────────────────────────────────────────────────────────
const InfoRow = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
  <div className="flex items-center justify-between py-2.5 gap-4">
    <span className="text-sm font-semibold text-gray-800 flex-shrink-0">{label}</span>
    <span className={`text-sm text-right ${bold ? "font-bold text-gray-900" : "text-gray-700"}`}>{value}</span>
  </div>
);

// ─── Main content ─────────────────────────────────────────────────────────────
const BerhasilContent = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id") ?? "";
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

  const paymentTime =
    order?.pembayaran?.settlement_time ?? order?.pembayaran?.transaction_time ?? null;

  const waUrl =
    order?.whatsapp_url ??
    `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "6281234567890"}?text=${encodeURIComponent(
      "Halo, pembayaran saya berhasil. Saya ingin berdiskusi lebih lanjut tentang project saya."
    )}`;

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-2xl">

        {/* Icon + heading */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Pembayaran Berhasil!
          </h1>
          <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
            Terima kasih telah mempercayakan project website anda kepada UPGRID DIGITAL.
            Tim kami akan segera memproses pesanan anda.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center text-gray-400 py-12">Memuat detail pesanan...</div>
        ) : (
          <>
            {/* Order code card */}
            {(kode || order?.kode_pemesanan) && (
              <div className="bg-gray-100 rounded-2xl p-8 text-center mb-6">
                <p className="text-sm text-gray-500 mb-2">Kode Pemesanan Anda</p>
                <p className="font-poppins text-2xl md:text-3xl font-bold text-gray-900 tracking-widest mb-2">
                  {order?.kode_pemesanan ?? kode}
                </p>
                <p className="text-xs text-gray-500">Simpan kode ini untuk mengecek status pesanan anda</p>
              </div>
            )}

            {/* Detail card */}
            {order && (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-6">
                <h2 className="font-poppins text-xl font-bold text-gray-900 mb-4">Detail Pesanan</h2>

                <div className="space-y-1">
                  <div className="flex items-center justify-between py-2.5 gap-4">
                    <span className="text-sm font-semibold text-gray-800">Status</span>
                    <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      Diproses
                    </span>
                  </div>
                  {order.paket && <InfoRow label="Paket" value={order.paket.nama_paket} />}
                  <InfoRow label="Nama Project" value={order.nama_proyek} />
                  {order.paket && (
                    <InfoRow label="Estimasi Pengerjaan" value={`${order.paket.estimasi_hari} Hari Kerja`} />
                  )}
                </div>

                <div className="h-px bg-gray-100 my-4" />

                <div className="space-y-1">
                  {order.pembayaran?.payment_type && (
                    <InfoRow label="Metode Pembayaran" value={formatPaymentType(order.pembayaran.payment_type)} />
                  )}
                  <InfoRow
                    label="Total Dibayar"
                    value={formatCurrency(order.pembayaran?.gross_amount ?? order.total_harga)}
                    bold
                  />
                  {paymentTime && (
                    <InfoRow label="Tanggal Pembayaran" value={formatDateTime(paymentTime)} />
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* CTA buttons */}
        <div className="space-y-3">
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="block">
            <Button variant="primary" className="w-full" size="md">
              Chat Admin via Whatsapp untuk Diskusi Project Lebih Lanjut
            </Button>
          </a>
          <Link href={`/cek-status${kode ? `?kode=${kode}` : ""}`} className="block">
            <Button variant="outline" className="w-full" size="md">
              Cek Status Pesanan
            </Button>
          </Link>
          <Link href="/" className="block">
            <Button variant="ghost" className="w-full" size="md">
              Kembali ke Beranda
            </Button>
          </Link>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8 leading-relaxed">
          Tim kami akan menghubungi anda melalui WhatsApp dalam waktu 1×24 jam untuk membahas detail
          project lebih lanjut. Jika ada pertanyaan, jangan ragu untuk menghubungi kami.
        </p>
      </div>
    </div>
  );
};

// ─── Page export ──────────────────────────────────────────────────────────────
export default function Berhasil() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen text-gray-400">
          Memuat...
        </div>
      }
    >
      <BerhasilContent />
    </Suspense>
  );
}
