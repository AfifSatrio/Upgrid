"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  RiMoneyDollarCircleLine,
  RiShoppingBag2Line,
  RiTimeLine,
  RiCheckboxCircleLine,
  RiArrowRightLine,
} from "@remixicon/react";

type Stats = {
  total_pendapatan: number;
  total_pemesanan: number;
  pemesanan_aktif: number;
  pemesanan_selesai: number;
  pemesanan_menunggu: number;
  recent_orders: RecentOrder[];
};

type RecentOrder = {
  id_pemesanan: number;
  kode_pemesanan: string;
  nama_proyek: string;
  total_harga: number;
  status_pemesanan: string;
  tanggal_pesan: string;
  pelanggan: { nama: string } | null;
  paket: { nama_paket: string } | null;
};

const STATUS_LABEL: Record<string, string> = {
  menunggu_pembayaran: "Menunggu Bayar",
  diproses: "Diproses",
  review: "Review",
  selesai: "Selesai",
  dibatalkan: "Dibatalkan",
};

const STATUS_COLOR: Record<string, string> = {
  menunggu_pembayaran: "bg-yellow-100 text-yellow-800",
  diproses: "bg-blue-100 text-blue-800",
  review: "bg-purple-100 text-purple-800",
  selesai: "bg-green-100 text-green-800",
  dibatalkan: "bg-red-100 text-red-800",
};

function formatIDR(n: number) {
  if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(1).replace(".0", "")}JT`;
  if (n >= 1_000) return `Rp ${(n / 1_000).toFixed(0)}K`;
  return `Rp ${n}`;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((json) => { if (json.success) setStats(json.data); })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const statCards = stats
    ? [
        {
          label: "Total Pendapatan",
          value: new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(stats.total_pendapatan),
          icon: RiMoneyDollarCircleLine,
          color: "bg-green-50 text-green-600",
        },
        {
          label: "Total Pesanan",
          value: String(stats.total_pemesanan),
          icon: RiShoppingBag2Line,
          color: "bg-blue-50 text-blue-600",
        },
        {
          label: "Pesanan Aktif",
          value: String(stats.pemesanan_aktif),
          icon: RiTimeLine,
          color: "bg-purple-50 text-purple-600",
        },
        {
          label: "Pesanan Selesai",
          value: String(stats.pemesanan_selesai),
          icon: RiCheckboxCircleLine,
          color: "bg-primary-50 text-primary-600",
        },
      ]
    : [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-poppins text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Selamat datang di panel administrasi Upgrid Digital</p>
      </div>

      {/* Stat Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 animate-pulse">
              <div className="w-10 h-10 bg-gray-100 rounded-xl mb-4" />
              <div className="h-7 bg-gray-100 rounded w-2/3 mb-2" />
              <div className="h-4 bg-gray-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {statCards.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${color} mb-4`}>
                <Icon size={20} />
              </div>
              <p className="font-poppins text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-gray-500 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Recent Orders */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-poppins font-semibold text-gray-900">Pesanan Terbaru</h2>
          <Link
            href="/admin/pemesanan"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
          >
            Lihat Semua <RiArrowRightLine size={16} />
          </Link>
        </div>

        {isLoading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-12 bg-gray-50 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : !stats?.recent_orders.length ? (
          <div className="px-6 py-12 text-center text-gray-400 text-sm">
            Belum ada pesanan masuk.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 text-xs uppercase tracking-wider bg-gray-50">
                  <th className="px-6 py-3 font-semibold">Kode</th>
                  <th className="px-6 py-3 font-semibold">Pelanggan</th>
                  <th className="px-6 py-3 font-semibold">Paket</th>
                  <th className="px-6 py-3 font-semibold">Total</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Tanggal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats.recent_orders.map((order) => (
                  <tr key={order.id_pemesanan} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/pemesanan/${order.id_pemesanan}`}
                        className="font-mono text-xs font-medium text-primary-600 hover:underline"
                      >
                        {order.kode_pemesanan}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{order.pelanggan?.nama ?? "-"}</td>
                    <td className="px-6 py-4 text-gray-600">{order.paket?.nama_paket ?? "-"}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{formatIDR(order.total_harga)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLOR[order.status_pemesanan] ?? "bg-gray-100 text-gray-700"}`}>
                        {STATUS_LABEL[order.status_pemesanan] ?? order.status_pemesanan}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{formatDate(order.tanggal_pesan)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
