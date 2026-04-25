"use client";

import { useEffect, useState } from "react";
import {
  RiAddLine,
  RiEditLine,
  RiDeleteBin6Line,
  RiCloseLine,
  RiChatQuoteLine,
  RiStarFill,
} from "@remixicon/react";

type Testimoni = {
  id_testimoni: number;
  nama_tampil: string;
  nama_brand: string | null;
  rating: number;
  komentar: string;
  status_tampil: boolean;
  admin?: { nama: string } | null;
};

type FormData = {
  nama_tampil: string;
  nama_brand: string;
  rating: number;
  komentar: string;
  status_tampil: boolean;
};

const EMPTY_FORM: FormData = {
  nama_tampil: "",
  nama_brand: "",
  rating: 5,
  komentar: "",
  status_tampil: true,
};

export function TestimoniPage() {
  const [items, setItems] = useState<Testimoni[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formMode, setFormMode] = useState<"idle" | "add" | "edit">("idle");
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [formLoading, setFormLoading] = useState(false);
  const [formMsg, setFormMsg] = useState("");

  const fetchItems = () => {
    fetch("/api/admin/testimoni")
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

  const openEditForm = (item: Testimoni) => {
    setForm({
      nama_tampil: item.nama_tampil,
      nama_brand: item.nama_brand ?? "",
      rating: item.rating,
      komentar: item.komentar,
      status_tampil: item.status_tampil,
    });
    setEditId(item.id_testimoni);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormMsg("");

    const body = {
      nama_tampil: form.nama_tampil,
      nama_brand: form.nama_brand || undefined,
      rating: form.rating,
      komentar: form.komentar,
      status_tampil: form.status_tampil,
    };

    try {
      const url = formMode === "edit" ? `/api/admin/testimoni/${editId}` : "/api/admin/testimoni";
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
    if (!confirm(`Hapus testimoni dari "${nama}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    const res = await fetch(`/api/admin/testimoni/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (json.success) fetchItems();
  };

  const handleToggleVisibility = async (item: Testimoni) => {
    await fetch(`/api/admin/testimoni/${item.id_testimoni}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status_tampil: !item.status_tampil }),
    });
    fetchItems();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-poppins text-2xl font-bold text-gray-900">Manajemen Testimoni</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola testimoni pelanggan yang ditampilkan di website</p>
        </div>
        {formMode === "idle" && (
          <button
            onClick={openAddForm}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            <RiAddLine size={16} />
            Tambah Testimoni
          </button>
        )}
      </div>

      {formMode !== "idle" && (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-poppins font-semibold text-gray-900">
              {formMode === "add" ? "Tambah Testimoni Baru" : "Edit Testimoni"}
            </h2>
            <button onClick={closeForm} className="text-gray-400 hover:text-gray-700 transition-colors">
              <RiCloseLine size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Nama Tampil <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.nama_tampil}
                  onChange={(e) => updateForm("nama_tampil", e.target.value)}
                  placeholder="Nama pelanggan"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Nama Brand / Perusahaan</label>
                <input
                  type="text"
                  value={form.nama_brand}
                  onChange={(e) => updateForm("nama_brand", e.target.value)}
                  placeholder="Opsional"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">
                Rating <span className="text-red-400">*</span>
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => updateForm("rating", star)}
                    className="transition-transform hover:scale-110"
                  >
                    <RiStarFill
                      size={28}
                      className={star <= form.rating ? "text-yellow-400" : "text-gray-200"}
                    />
                  </button>
                ))}
                <span className="text-sm text-gray-500 ml-2">{form.rating}/5</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Komentar <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={form.komentar}
                onChange={(e) => updateForm("komentar", e.target.value)}
                placeholder="Tuliskan testimoni pelanggan di sini..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none resize-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.status_tampil}
                  onChange={(e) => updateForm("status_tampil", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-gray-200 peer-checked:bg-primary-600 rounded-full peer-focus:ring-2 peer-focus:ring-primary-300 transition-colors" />
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
              </label>
              <span className="text-sm text-gray-700">Tampilkan di halaman publik</span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                type="submit"
                disabled={formLoading}
                className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                {formLoading ? "Menyimpan..." : formMode === "add" ? "Tambah Testimoni" : "Simpan Perubahan"}
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
            <RiChatQuoteLine size={40} className="mb-3 opacity-40" />
            <p className="font-medium">Belum ada testimoni</p>
            <p className="text-sm mt-1">Klik &quot;Tambah Testimoni&quot; untuk mulai menambahkan</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 text-xs uppercase tracking-wider bg-gray-50 border-b border-gray-100">
                  <th className="px-5 py-3 font-semibold">Pelanggan</th>
                  <th className="px-5 py-3 font-semibold hidden sm:table-cell">Rating</th>
                  <th className="px-5 py-3 font-semibold hidden md:table-cell">Komentar</th>
                  <th className="px-5 py-3 font-semibold">Tampil</th>
                  <th className="px-5 py-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item) => (
                  <tr key={item.id_testimoni} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-900">{item.nama_tampil}</p>
                      {item.nama_brand && (
                        <p className="text-xs text-gray-400">{item.nama_brand}</p>
                      )}
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <RiStarFill
                            key={i}
                            size={14}
                            className={i < item.rating ? "text-yellow-400" : "text-gray-200"}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <p className="text-gray-600 text-xs truncate max-w-xs">{item.komentar}</p>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleToggleVisibility(item)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                          item.status_tampil ? "bg-primary-600" : "bg-gray-300"
                        }`}
                        title={item.status_tampil ? "Sembunyikan" : "Tampilkan"}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                          item.status_tampil ? "translate-x-4" : "translate-x-0.5"
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
                          onClick={() => handleDelete(item.id_testimoni, item.nama_tampil)}
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
