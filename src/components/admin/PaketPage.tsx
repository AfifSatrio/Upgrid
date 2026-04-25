"use client";

import { useEffect, useState } from "react";
import {
  RiAddLine,
  RiEditLine,
  RiDeleteBin6Line,
  RiCloseLine,
  RiPriceTag3Line,
} from "@remixicon/react";

type BenefitPaket = {
  id_benefit: number;
  deskripsi_benefit: string;
};

type Paket = {
  id_paket: number;
  nama_paket: string;
  slug: string;
  deskripsi: string | null;
  harga: number;
  estimasi_hari: number;
  tipe_paket: string;
  status_aktif: boolean;
  benefit_paket: BenefitPaket[];
};

type FormData = {
  nama_paket: string;
  slug: string;
  deskripsi: string;
  harga: string;
  estimasi_hari: string;
  tipe_paket: string;
  status_aktif: boolean;
  benefit: string[];
};

const EMPTY_FORM: FormData = {
  nama_paket: "",
  slug: "",
  deskripsi: "",
  harga: "",
  estimasi_hari: "",
  tipe_paket: "website",
  status_aktif: true,
  benefit: [""],
};

function formatIDR(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);
}

export function PaketPage() {
  const [items, setItems] = useState<Paket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formMode, setFormMode] = useState<"idle" | "add" | "edit">("idle");
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [formLoading, setFormLoading] = useState(false);
  const [formMsg, setFormMsg] = useState("");

  const fetchItems = () => {
    fetch("/api/admin/paket")
      .then((r) => r.json())
      .then((json) => { if (json.success) setItems(json.data ?? []); })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  };

  useEffect(() => { fetchItems(); }, []);

  const openAddForm = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setFormMsg("");
    setFormMode("add");
  };

  const openEditForm = (item: Paket) => {
    setForm({
      nama_paket: item.nama_paket,
      slug: item.slug,
      deskripsi: item.deskripsi ?? "",
      harga: String(item.harga),
      estimasi_hari: String(item.estimasi_hari),
      tipe_paket: item.tipe_paket,
      status_aktif: item.status_aktif,
      benefit: item.benefit_paket.length > 0
        ? item.benefit_paket.map((b) => b.deskripsi_benefit)
        : [""],
    });
    setEditId(item.id_paket);
    setFormMsg("");
    setFormMode("edit");
  };

  const closeForm = () => {
    setFormMode("idle");
    setEditId(null);
    setFormMsg("");
  };

  const updateForm = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateBenefit = (idx: number, value: string) => {
    setForm((prev) => {
      const benefit = [...prev.benefit];
      benefit[idx] = value;
      return { ...prev, benefit };
    });
  };

  const addBenefit = () => {
    setForm((prev) => ({ ...prev, benefit: [...prev.benefit, ""] }));
  };

  const removeBenefit = (idx: number) => {
    setForm((prev) => ({ ...prev, benefit: prev.benefit.filter((_, i) => i !== idx) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormMsg("");

    const body = {
      nama_paket: form.nama_paket,
      slug: form.slug,
      deskripsi: form.deskripsi || undefined,
      harga: Number(form.harga),
      estimasi_hari: Number(form.estimasi_hari),
      tipe_paket: form.tipe_paket,
      status_aktif: form.status_aktif,
      benefit: form.benefit.filter((b) => b.trim() !== ""),
    };

    try {
      const url = formMode === "edit" ? `/api/admin/paket/${editId}` : "/api/admin/paket";
      const method = formMode === "edit" ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      setFormMsg(json.success ? "✓ Berhasil disimpan" : (json.error ?? "Gagal menyimpan"));
      if (json.success) {
        closeForm();
        fetchItems();
      }
    } catch {
      setFormMsg("Terjadi kesalahan");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: number, nama: string) => {
    if (!confirm(`Hapus paket "${nama}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    const res = await fetch(`/api/admin/paket/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (json.success) fetchItems();
    else alert(json.error ?? "Gagal menghapus paket");
  };

  const handleToggleStatus = async (item: Paket) => {
    await fetch(`/api/admin/paket/${item.id_paket}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status_aktif: !item.status_aktif }),
    });
    fetchItems();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-poppins text-2xl font-bold text-gray-900">Manajemen Paket</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola paket layanan yang ditampilkan ke pelanggan</p>
        </div>
        {formMode === "idle" && (
          <button
            onClick={openAddForm}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            <RiAddLine size={16} />
            Tambah Paket
          </button>
        )}
      </div>

      {formMode !== "idle" && (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-poppins font-semibold text-gray-900">
              {formMode === "add" ? "Tambah Paket Baru" : "Edit Paket"}
            </h2>
            <button onClick={closeForm} className="text-gray-400 hover:text-gray-700 transition-colors">
              <RiCloseLine size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Nama Paket <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.nama_paket}
                  onChange={(e) => updateForm("nama_paket", e.target.value)}
                  placeholder="Contoh: Paket Starter"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Slug <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.slug}
                  onChange={(e) => updateForm("slug", e.target.value)}
                  placeholder="Contoh: starter"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Harga (Rp) <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  value={form.harga}
                  onChange={(e) => updateForm("harga", e.target.value)}
                  placeholder="Contoh: 1500000"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Estimasi Hari <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={form.estimasi_hari}
                  onChange={(e) => updateForm("estimasi_hari", e.target.value)}
                  placeholder="Contoh: 14"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Tipe Paket <span className="text-red-400">*</span>
                </label>
                <select
                  required
                  value={form.tipe_paket}
                  onChange={(e) => updateForm("tipe_paket", e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                >
                  <option value="website">Website</option>
                  <option value="creative">Creative Agency</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Deskripsi</label>
              <textarea
                rows={2}
                value={form.deskripsi}
                onChange={(e) => updateForm("deskripsi", e.target.value)}
                placeholder="Deskripsi singkat tentang paket ini..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none resize-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-gray-600">Benefit / Fitur Paket</label>
                <button
                  type="button"
                  onClick={addBenefit}
                  className="inline-flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 font-medium"
                >
                  <RiAddLine size={14} /> Tambah
                </button>
              </div>
              <div className="space-y-2">
                {form.benefit.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={b}
                      onChange={(e) => updateBenefit(idx, e.target.value)}
                      placeholder={`Benefit ${idx + 1}`}
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                    {form.benefit.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeBenefit(idx)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <RiCloseLine size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.status_aktif}
                  onChange={(e) => updateForm("status_aktif", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-gray-200 peer-checked:bg-primary-600 rounded-full peer-focus:ring-2 peer-focus:ring-primary-300 transition-colors" />
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
              </label>
              <span className="text-sm text-gray-700">Aktifkan paket (tampil di halaman publik)</span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                type="submit"
                disabled={formLoading}
                className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                {formLoading ? "Menyimpan..." : formMode === "add" ? "Tambah Paket" : "Simpan Perubahan"}
              </button>
              <button type="button" onClick={closeForm} className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Batal
              </button>
              {formMsg && (
                <p className={`text-sm ${formMsg.startsWith("✓") ? "text-green-600" : "text-red-600"}`}>{formMsg}</p>
              )}
            </div>
          </form>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 bg-gray-50 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <RiPriceTag3Line size={40} className="mb-3 opacity-40" />
            <p className="font-medium">Belum ada paket</p>
            <p className="text-sm mt-1">Klik &quot;Tambah Paket&quot; untuk mulai menambahkan</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 text-xs uppercase tracking-wider bg-gray-50 border-b border-gray-100">
                  <th className="px-5 py-3 font-semibold">Nama Paket</th>
                  <th className="px-5 py-3 font-semibold hidden sm:table-cell">Tipe</th>
                  <th className="px-5 py-3 font-semibold hidden md:table-cell">Harga</th>
                  <th className="px-5 py-3 font-semibold hidden lg:table-cell">Estimasi</th>
                  <th className="px-5 py-3 font-semibold hidden md:table-cell">Benefit</th>
                  <th className="px-5 py-3 font-semibold">Aktif</th>
                  <th className="px-5 py-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item) => (
                  <tr key={item.id_paket} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-900">{item.nama_paket}</p>
                      <p className="text-xs text-gray-400 font-mono">{item.slug}</p>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${
                        item.tipe_paket === "website" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                      }`}>
                        {item.tipe_paket === "website" ? "Website" : "Creative"}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap hidden md:table-cell">
                      {formatIDR(item.harga)}
                    </td>
                    <td className="px-5 py-4 text-gray-600 hidden lg:table-cell">
                      {item.estimasi_hari} hari
                    </td>
                    <td className="px-5 py-4 text-gray-500 text-xs hidden md:table-cell">
                      {item.benefit_paket.length} item
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleToggleStatus(item)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                          item.status_aktif ? "bg-primary-600" : "bg-gray-300"
                        }`}
                        title={item.status_aktif ? "Nonaktifkan" : "Aktifkan"}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                          item.status_aktif ? "translate-x-4" : "translate-x-0.5"
                        }`} />
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditForm(item)}
                          className="inline-flex items-center gap-1 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 px-2.5 py-1.5 rounded-lg transition-colors"
                        >
                          <RiEditLine size={13} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id_paket, item.nama_paket)}
                          className="inline-flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-lg transition-colors"
                        >
                          <RiDeleteBin6Line size={13} />
                          Hapus
                        </button>
                      </div>
                    </td>
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
