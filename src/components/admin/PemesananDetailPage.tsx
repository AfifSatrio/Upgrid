"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiArrowLeftLine, RiAddLine, RiDeleteBin6Line } from "@remixicon/react";
import { createBrowserClient } from "@/lib/supabase/client";

type ProgressItem = {
  id_progress: number;
  judul_update: string;
  deskripsi_progress: string | null;
  persentase: number | null;
  status_progress: string;
  tanggal_update: string;
  admin: { nama: string } | null;
  lampiran_urls?: string[] | null;
  feedback_user?: string | null;
  tanggal_feedback?: string | null;
  balasan_admin?: string | null;
  tanggal_balasan?: string | null;
};

type OrderDetail = {
  id_pemesanan: number;
  kode_pemesanan: string;
  nama_proyek: string;
  total_harga: number;
  status_pemesanan: string;
  catatan_tambahan: string | null;
  tanggal_pesan: string;
  tanggal_mulai: string | null;
  tanggal_selesai: string | null;
  pelanggan: { nama: string; email: string; no_telepon: string; nama_brand: string | null } | null;
  paket: { nama_paket: string; tipe_paket: string; harga: number; estimasi_hari: number } | null;
  pembayaran: { status_pembayaran: string; payment_type: string | null; gross_amount: number | null; tanggal_bayar: string | null } | null;
  progress_pemesanan: ProgressItem[];
};

const STATUS_PEMESANAN = [
  { value: "menunggu_pembayaran", label: "Menunggu Pembayaran" },
  { value: "diproses", label: "Diproses" },
  { value: "review", label: "Review & Revisi" },
  { value: "selesai", label: "Selesai" },
  { value: "dibatalkan", label: "Dibatalkan" },
];

const STATUS_PROGRESS = [
  { value: "brief", label: "Brief" },
  { value: "desain", label: "Desain" },
  { value: "development", label: "Development" },
  { value: "revisi", label: "Revisi" },
  { value: "selesai", label: "Selesai" },
];

const STATUS_COLOR: Record<string, string> = {
  menunggu_pembayaran: "bg-yellow-100 text-yellow-800",
  diproses: "bg-blue-100 text-blue-800",
  review: "bg-purple-100 text-purple-800",
  selesai: "bg-green-100 text-green-800",
  dibatalkan: "bg-red-100 text-red-800",
};

function formatIDR(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);
}
function formatDate(d: string) {
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}
function formatDateTime(d: string) {
  return new Date(d).toLocaleString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between py-2 gap-4 border-b border-gray-100 last:border-0">
    <span className="text-sm text-gray-500 flex-shrink-0">{label}</span>
    <span className="text-sm font-medium text-gray-900 text-right">{value}</span>
  </div>
);

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
    <div className="px-6 py-4 border-b border-gray-100">
      <h3 className="font-poppins font-semibold text-gray-900 text-sm">{title}</h3>
    </div>
    <div className="px-6 py-4">{children}</div>
  </div>
);

export function PemesananDetailPage({ id }: { id: string }) {
  const router = useRouter();

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [newStatus, setNewStatus] = useState("");
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const [showProgressForm, setShowProgressForm] = useState(false);
  const [progJudul, setProgJudul] = useState("");
  const [progDeskripsi, setProgDeskripsi] = useState("");
  const [progPersentase, setProgPersentase] = useState(0);
  const [progStatus, setProgStatus] = useState("brief");
  const [progFiles, setProgFiles] = useState<File[]>([]);
  const [progLoading, setProgLoading] = useState(false);
  const [progMsg, setProgMsg] = useState("");

  const [replyState, setReplyState] = useState<{id_progress: number | null, text: string, loading: boolean}>({
    id_progress: null,
    text: "",
    loading: false
  });

  const fetchOrder = useCallback(() => {
    fetch(`/api/admin/pemesanan/${id}`)
      .then((r) => {
        if (r.status === 404) { setNotFound(true); return null; }
        return r.json();
      })
      .then((json) => {
        if (json?.success) {
          setOrder(json.data);
          setNewStatus(json.data.status_pemesanan);
          setTanggalMulai(json.data.tanggal_mulai ? json.data.tanggal_mulai.split("T")[0] : "");
          setTanggalSelesai(json.data.tanggal_selesai ? json.data.tanggal_selesai.split("T")[0] : "");
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [id]);

  useEffect(() => { fetchOrder(); }, [fetchOrder]);

  const handleStatusUpdate = async () => {
    setStatusLoading(true);
    setStatusMsg("");
    try {
      const body: Record<string, string> = { status_pemesanan: newStatus };
      if (tanggalMulai) body.tanggal_mulai = tanggalMulai;
      if (tanggalSelesai) body.tanggal_selesai = tanggalSelesai;

      const res = await fetch(`/api/admin/pemesanan/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      setStatusMsg(json.success ? "✓ Status berhasil diperbarui" : (json.error ?? "Gagal memperbarui status"));
      if (json.success) fetchOrder();
    } catch {
      setStatusMsg("Terjadi kesalahan");
    } finally {
      setStatusLoading(false);
    }
  };

  const handleAddProgress = async (e: React.FormEvent) => {
    e.preventDefault();
    setProgLoading(true);
    setProgMsg("");
    try {
      let lampiran_urls: string[] = [];
      if (progFiles.length > 0) {
        const supabase = createBrowserClient();
        for (const file of progFiles) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
          const filePath = `${id}/${fileName}`;
          const { data, error } = await supabase.storage.from('progress_updates').upload(filePath, file);
          if (error) throw new Error("Gagal mengunggah foto");
          const { data: { publicUrl } } = supabase.storage.from('progress_updates').getPublicUrl(filePath);
          lampiran_urls.push(publicUrl);
        }
      }

      const res = await fetch("/api/admin/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_pemesanan: Number(id),
          judul_update: progJudul,
          deskripsi_progress: progDeskripsi || undefined,
          persentase: progPersentase,
          status_progress: progStatus,
          lampiran_urls: lampiran_urls.length > 0 ? lampiran_urls : undefined,
        }),
      });
      const json = await res.json();
      setProgMsg(json.success ? "✓ Progress berhasil ditambahkan" : (json.error ?? "Gagal menambahkan progress"));
      if (json.success) {
        setProgJudul("");
        setProgDeskripsi("");
        setProgPersentase(0);
        setProgStatus("brief");
        setProgFiles([]);
        setShowProgressForm(false);
        fetchOrder();
      }
    } catch (err: any) {
      setProgMsg(err.message || "Terjadi kesalahan");
    } finally {
      setProgLoading(false);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent, id_progress: number) => {
    e.preventDefault();
    if (!replyState.text.trim()) return;
    setReplyState(p => ({...p, loading: true}));
    try {
      const res = await fetch('/api/admin/progress/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_progress, balasan_admin: replyState.text })
      });
      const json = await res.json();
      if (json.success) {
        setReplyState({id_progress: null, text: "", loading: false});
        fetchOrder();
      } else {
        alert(json.error || "Gagal membalas");
        setReplyState(p => ({...p, loading: false}));
      }
    } catch {
      alert("Gagal membalas");
      setReplyState(p => ({...p, loading: false}));
    }
  };

  const handleDeleteProgress = async (progressId: number) => {
    if (!confirm("Hapus progress ini?")) return;
    await fetch(`/api/admin/progress/${progressId}`, { method: "DELETE" });
    fetchOrder();
  };

  const handleDeleteOrder = async () => {
    if (!confirm(`Hapus pesanan "${order?.nama_proyek}" (${order?.kode_pemesanan})?\n\nSemua data terkait termasuk progress dan pembayaran akan ikut terhapus. Tindakan ini tidak bisa dibatalkan.`)) return;
    try {
      const res = await fetch(`/api/admin/pemesanan/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        router.push("/admin/pemesanan");
      } else {
        alert("Gagal menghapus pesanan: " + (json.error ?? "Terjadi kesalahan"));
      }
    } catch {
      alert("Terjadi kesalahan saat menghapus pesanan");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !order) {
    return (
      <div className="text-center py-24 text-gray-400">
        <p className="font-medium">Pesanan tidak ditemukan</p>
        <Link href="/admin/pemesanan" className="text-sm text-primary-600 mt-2 inline-block">← Kembali</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <Link
          href="/admin/pemesanan"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors"
        >
          <RiArrowLeftLine size={16} />
          Kembali ke daftar pesanan
        </Link>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-poppins text-2xl font-bold text-gray-900">{order.nama_proyek}</h1>
            <p className="text-gray-500 font-mono text-sm mt-0.5">{order.kode_pemesanan}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`inline-block text-sm font-semibold px-3 py-1.5 rounded-full ${STATUS_COLOR[order.status_pemesanan] ?? "bg-gray-100 text-gray-700"}`}>
              {STATUS_PEMESANAN.find(s => s.value === order.status_pemesanan)?.label ?? order.status_pemesanan}
            </span>
            <button
              onClick={handleDeleteOrder}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl transition-colors"
            >
              <RiDeleteBin6Line size={15} />
              Hapus Pesanan
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {order.pelanggan && (
          <Card title="Data Pelanggan">
            <InfoRow label="Nama" value={order.pelanggan.nama} />
            <InfoRow label="Email" value={order.pelanggan.email} />
            <InfoRow label="Telepon" value={order.pelanggan.no_telepon} />
            {order.pelanggan.nama_brand && <InfoRow label="Brand" value={order.pelanggan.nama_brand} />}
          </Card>
        )}

        {order.paket && (
          <Card title="Paket yang Dipesan">
            <InfoRow label="Nama Paket" value={order.paket.nama_paket} />
            <InfoRow label="Tipe" value={order.paket.tipe_paket} />
            <InfoRow label="Estimasi" value={`${order.paket.estimasi_hari} hari kerja`} />
            <InfoRow label="Harga Paket" value={formatIDR(order.paket.harga)} />
            <InfoRow label="Total Bayar" value={formatIDR(order.total_harga)} />
          </Card>
        )}

        <Card title="Status Pembayaran">
          {order.pembayaran ? (
            <>
              <InfoRow label="Status" value={order.pembayaran.status_pembayaran} />
              {order.pembayaran.payment_type && <InfoRow label="Metode" value={order.pembayaran.payment_type} />}
              {order.pembayaran.gross_amount && <InfoRow label="Jumlah" value={formatIDR(order.pembayaran.gross_amount)} />}
              {order.pembayaran.tanggal_bayar && <InfoRow label="Tgl Bayar" value={formatDate(order.pembayaran.tanggal_bayar)} />}
            </>
          ) : (
            <p className="text-sm text-gray-400">Belum ada data pembayaran</p>
          )}
        </Card>
      </div>

      {order.catatan_tambahan && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4">
          <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">Catatan Tambahan</p>
          <p className="text-sm text-amber-900">{order.catatan_tambahan}</p>
        </div>
      )}

      <Card title="Update Status Pesanan">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Status Pemesanan</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none"
              >
                {STATUS_PEMESANAN.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Tanggal Mulai</label>
              <input
                type="date"
                value={tanggalMulai}
                onChange={(e) => setTanggalMulai(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Tanggal Selesai</label>
              <input
                type="date"
                value={tanggalSelesai}
                onChange={(e) => setTanggalSelesai(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleStatusUpdate}
              disabled={statusLoading}
              className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              {statusLoading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
            {statusMsg && (
              <p className={`text-sm ${statusMsg.startsWith("✓") ? "text-green-600" : "text-red-600"}`}>
                {statusMsg}
              </p>
            )}
          </div>
        </div>
      </Card>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-poppins font-semibold text-gray-900 text-sm">Progress Pengerjaan</h3>
          <button
            onClick={() => { setShowProgressForm(!showProgressForm); setProgMsg(""); }}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            <RiAddLine size={14} />
            Tambah Update
          </button>
        </div>

        {showProgressForm && (
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50">
            <form onSubmit={handleAddProgress} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Judul Update <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    required
                    value={progJudul}
                    onChange={(e) => setProgJudul(e.target.value)}
                    placeholder="Contoh: Desain mockup selesai"
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Tahap Progress <span className="text-red-400">*</span></label>
                  <select
                    value={progStatus}
                    onChange={(e) => setProgStatus(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                  >
                    {STATUS_PROGRESS.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Persentase: <span className="font-bold text-primary-600">{progPersentase}%</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={progPersentase}
                  onChange={(e) => setProgPersentase(Number(e.target.value))}
                  className="w-full accent-primary-600"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Deskripsi (opsional)</label>
                  <textarea
                    rows={3}
                    value={progDeskripsi}
                    onChange={(e) => setProgDeskripsi(e.target.value)}
                    placeholder="Keterangan tambahan untuk pelanggan..."
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Lampiran Foto (Max 4)</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files) {
                        const files = Array.from(e.target.files).slice(0, 4);
                        setProgFiles(files);
                      }
                    }}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                  {progFiles.length > 0 && (
                    <p className="text-xs text-gray-500 mt-1">{progFiles.length} file dipilih</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={progLoading}
                  className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  {progLoading ? "Menyimpan..." : "Simpan Progress"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowProgressForm(false)}
                  className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Batal
                </button>
                {progMsg && (
                  <p className={`text-sm ${progMsg.startsWith("✓") ? "text-green-600" : "text-red-600"}`}>{progMsg}</p>
                )}
              </div>
            </form>
          </div>
        )}

        <div className="px-6 py-4">
          {order.progress_pemesanan.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">Belum ada update progress</p>
          ) : (
            <div className="space-y-0">
              {[...order.progress_pemesanan]
                .sort((a, b) => new Date(b.tanggal_update).getTime() - new Date(a.tanggal_update).getTime())
                .map((p, idx, arr) => (
                  <div key={p.id_progress} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-primary-100 border-2 border-primary-300 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-700 text-xs font-bold">{p.persentase ?? 0}%</span>
                      </div>
                      {idx < arr.length - 1 && <div className="w-0.5 bg-gray-200 flex-1 mt-1 min-h-[24px]" />}
                    </div>
                    <div className="pb-6 min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{p.judul_update}</p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {formatDateTime(p.tanggal_update)}
                            {p.admin && ` · ${p.admin.nama}`}
                            {" · "}
                            <span className="capitalize">{p.status_progress}</span>
                          </p>
                          {p.deskripsi_progress && (
                            <p className="text-sm text-gray-600 mt-1">{p.deskripsi_progress}</p>
                          )}
                          
                          {p.lampiran_urls && p.lampiran_urls.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {p.lampiran_urls.map((url, i) => (
                                <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="block w-20 h-20 rounded-lg overflow-hidden border border-gray-200 hover:opacity-90 transition-opacity">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={url} alt={`Lampiran ${i+1}`} className="w-full h-full object-cover" />
                                </a>
                              ))}
                            </div>
                          )}

                          {p.feedback_user && (
                            <div className="mt-3 bg-amber-50 rounded-xl p-3 border border-amber-100">
                              <p className="text-xs font-semibold text-amber-800 mb-1">Masukan Pelanggan:</p>
                              <p className="text-sm text-amber-900">{p.feedback_user}</p>
                              
                              {p.balasan_admin ? (
                                <div className="mt-2 ml-3 pl-3 border-l-2 border-primary-300">
                                  <p className="text-xs font-semibold text-primary-700 mb-1">Balasan Anda:</p>
                                  <p className="text-sm text-primary-900">{p.balasan_admin}</p>
                                </div>
                              ) : (
                                <div className="mt-2">
                                  {replyState.id_progress === p.id_progress ? (
                                    <form onSubmit={(e) => handleReplySubmit(e, p.id_progress)} className="space-y-2">
                                      <textarea
                                        autoFocus
                                        rows={2}
                                        placeholder="Tulis balasan..."
                                        value={replyState.text}
                                        onChange={e => setReplyState(prev => ({...prev, text: e.target.value}))}
                                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                                      />
                                      <div className="flex gap-2">
                                        <button type="submit" disabled={replyState.loading || !replyState.text.trim()} className="px-3 py-1 bg-primary-600 text-white text-xs font-medium rounded-lg">
                                          {replyState.loading ? "Mengirim..." : "Kirim"}
                                        </button>
                                        <button type="button" onClick={() => setReplyState({id_progress: null, text: "", loading: false})} className="px-3 py-1 text-gray-500 text-xs hover:text-gray-900">
                                          Batal
                                        </button>
                                      </div>
                                    </form>
                                  ) : (
                                    <button onClick={() => setReplyState({id_progress: p.id_progress, text: "", loading: false})} className="text-xs font-medium text-primary-600 hover:text-primary-700">
                                      Balas Masukan
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteProgress(p.id_progress)}
                          className="flex-shrink-0 text-gray-300 hover:text-red-500 transition-colors"
                          title="Hapus progress"
                        >
                          <RiDeleteBin6Line size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
