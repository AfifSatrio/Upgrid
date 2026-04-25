"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { RiEyeLine, RiSearchLine } from "@remixicon/react";

type Order = {
  id_pemesanan: number;
  kode_pemesanan: string;
  nama_proyek: string;
  total_harga: number;
  status_pemesanan: string;
  tanggal_pesan: string;
  pelanggan: { nama: string; email: string; no_telepon: string } | null;
  paket: { nama_paket: string; tipe_paket: string } | null;
  pembayaran: { status_pembayaran: string } | null;
};

type Pagination = { total: number; page: number; limit: number; total_pages: number };

const STATUS_TABS = [
  { key: "", label: "Semua" },
  { key: "menunggu_pembayaran", label: "Menunggu Bayar" },
  { key: "diproses", label: "Diproses" },
  { key: "review", label: "Review" },
  { key: "selesai", label: "Selesai" },
  { key: "dibatalkan", label: "Dibatalkan" },
];

const STATUS_COLOR: Record<string, string> = {
  menunggu_pembayaran: "bg-yellow-100 text-yellow-800",
  diproses: "bg-blue-100 text-blue-800",
  review: "bg-purple-100 text-purple-800",
  selesai: "bg-green-100 text-green-800",
  dibatalkan: "bg-red-100 text-red-800",
};

const STATUS_BAYAR_COLOR: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  settlement: "bg-green-100 text-green-800",
  capture: "bg-green-100 text-green-800",
  paid: "bg-green-100 text-green-800",
  deny: "bg-red-100 text-red-800",
  cancel: "bg-red-100 text-red-800",
  expire: "bg-red-100 text-red-800",
  failed: "bg-red-100 text-red-800",
};

const STATUS_BAYAR_LABEL: Record<string, string> = {
  pending: "Menunggu",
  settlement: "Lunas",
  capture: "Lunas",
  paid: "Lunas",
  deny: "Gagal",
  cancel: "Batal",
  expire: "Kadaluarsa",
  failed: "Gagal",
};

function formatIDR(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n);
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminPemesanan() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [activeTab, setActiveTab] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = (status: string, p: number) => {
    setIsLoading(true);
    const params = new URLSearchParams({ page: String(p), limit: "15" });
    if (status) params.set("status", status);
    fetch(`/api/admin/pemesanan?${params}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success) {
          setOrders(json.data.data ?? []);
          setPagination(json.data.pagination);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  };

  useEffect(() => { fetchOrders(activeTab, page); }, [activeTab, page]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-poppins text-2xl font-bold text-gray-900">Manajemen Pesanan</h1>
        <p className="text-gray-500 text-sm mt-1">Kelola semua pesanan masuk dari pelanggan</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 overflow-x-auto">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 bg-gray-50 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <RiSearchLine size={40} className="mb-3 opacity-40" />
            <p className="font-medium">Tidak ada pesanan ditemukan</p>
            <p className="text-sm mt-1">Coba ubah filter status</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 text-xs uppercase tracking-wider bg-gray-50 border-b border-gray-100">
                    <th className="px-5 py-3 font-semibold hidden md:table-cell">Kode</th>
                    <th className="px-5 py-3 font-semibold">Pelanggan</th>
                    <th className="px-5 py-3 font-semibold">Proyek / Paket</th>
                    <th className="px-5 py-3 font-semibold hidden md:table-cell">Total</th>
                    <th className="px-5 py-3 font-semibold hidden md:table-cell">Pembayaran</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 font-semibold hidden md:table-cell">Tanggal</th>
                    <th className="px-5 py-3 font-semibold" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((o) => (
                    <tr key={o.id_pemesanan} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5 hidden md:table-cell">
                        <span className="font-mono text-xs font-medium text-gray-700">{o.kode_pemesanan}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="font-medium text-gray-900">{o.pelanggan?.nama ?? "-"}</p>
                        <p className="text-xs text-gray-400">{o.pelanggan?.no_telepon ?? ""}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="text-gray-900">{o.nama_proyek}</p>
                        <p className="text-xs text-gray-400">{o.paket?.nama_paket ?? "-"}</p>
                      </td>
                      <td className="px-5 py-3.5 font-medium text-gray-900 whitespace-nowrap hidden md:table-cell">{formatIDR(o.total_harga)}</td>
                      <td className="px-5 py-3.5 hidden md:table-cell">
                        {o.pembayaran ? (
                          <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_BAYAR_COLOR[o.pembayaran.status_pembayaran] ?? "bg-gray-100 text-gray-700"}`}>
                            {STATUS_BAYAR_LABEL[o.pembayaran.status_pembayaran] ?? o.pembayaran.status_pembayaran}
                          </span>
                        ) : <span className="text-gray-400 text-xs">-</span>}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLOR[o.status_pemesanan] ?? "bg-gray-100 text-gray-700"}`}>
                          {STATUS_TABS.find(t => t.key === o.status_pemesanan)?.label ?? o.status_pemesanan}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-gray-500 text-xs whitespace-nowrap hidden md:table-cell">{formatDate(o.tanggal_pesan)}</td>
                      <td className="px-5 py-3.5">
                        <Link
                          href={`/admin/pemesanan/${o.id_pemesanan}`}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <RiEyeLine size={14} />
                          Detail
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination && pagination.total_pages > 1 && (
              <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  {pagination.total} pesanan &bull; Halaman {pagination.page} dari {pagination.total_pages}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 rounded-lg transition-colors"
                  >
                    Sebelumnya
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(pagination.total_pages, p + 1))}
                    disabled={page >= pagination.total_pages}
                    className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 rounded-lg transition-colors"
                  >
                    Berikutnya
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
