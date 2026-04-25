"use client";

import { useEffect, useState } from "react";
import { RiAddLine, RiEditLine, RiDeleteBin6Line, RiCloseLine, RiImageLine } from "@remixicon/react";

type PortfolioItem = {
  id_portofolio: number;
  judul: string;
  deskripsi: string | null;
  gambar: string | null;
  link_project: string | null;
  tanggal_publish: string | null;
  status_tampil: boolean;
};

type FormData = {
  judul: string;
  deskripsi: string;
  gambar: string;
  link_project: string;
  tanggal_publish: string;
  status_tampil: boolean;
};

const EMPTY_FORM: FormData = {
  judul: "",
  deskripsi: "",
  gambar: "",
  link_project: "",
  tanggal_publish: "",
  status_tampil: true,
};

function formatDate(d: string | null) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export function PortofolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formMode, setFormMode] = useState<"idle" | "add" | "edit">("idle");
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [formLoading, setFormLoading] = useState(false);
  const [formMsg, setFormMsg] = useState("");

  const fetchItems = () => {
    fetch("/api/admin/portofolio")
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

  const openEditForm = (item: PortfolioItem) => {
    setForm({
      judul: item.judul,
      deskripsi: item.deskripsi ?? "",
      gambar: item.gambar ?? "",
      link_project: item.link_project ?? "",
      tanggal_publish: item.tanggal_publish ? item.tanggal_publish.split("T")[0] : "",
      status_tampil: item.status_tampil,
    });
    setEditId(item.id_portofolio);
    setFormMsg("");
    setFormMode("edit");
  };

  const closeForm = () => {
    setFormMode("idle");
    setEditId(null);
    setFormMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormMsg("");

    const body = {
      judul: form.judul,
      deskripsi: form.deskripsi || undefined,
      gambar: form.gambar || undefined,
      link_project: form.link_project || undefined,
      tanggal_publish: form.tanggal_publish || undefined,
      status_tampil: form.status_tampil,
    };

    try {
      const url = formMode === "edit" ? `/api/admin/portofolio/${editId}` : "/api/admin/portofolio";
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

  const handleDelete = async (id: number, judul: string) => {
    if (!confirm(`Hapus portofolio "${judul}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    const res = await fetch(`/api/admin/portofolio/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (json.success) fetchItems();
  };

  const handleToggleVisibility = async (item: PortfolioItem) => {
    await fetch(`/api/admin/portofolio/${item.id_portofolio}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status_tampil: !item.status_tampil }),
    });
    fetchItems();
  };

  const updateForm = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-poppins text-2xl font-bold text-gray-900">Manajemen Portofolio</h1>
          <p className="text-gray-500 text-sm mt-1">Tambah, edit, dan kelola tampilan portofolio</p>
        </div>
        {formMode === "idle" && (
          <button
            onClick={openAddForm}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            <RiAddLine size={16} />
            Tambah Portofolio
          </button>
        )}
      </div>

      {formMode !== "idle" && (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-poppins font-semibold text-gray-900">
              {formMode === "add" ? "Tambah Portofolio Baru" : "Edit Portofolio"}
            </h2>
            <button onClick={closeForm} className="text-gray-400 hover:text-gray-700 transition-colors">
              <RiCloseLine size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Judul <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.judul}
                  onChange={(e) => updateForm("judul", e.target.value)}
                  placeholder="Nama proyek"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">URL Gambar</label>
                <input
                  type="url"
                  value={form.gambar}
                  onChange={(e) => updateForm("gambar", e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">URL Project (Live)</label>
                <input
                  type="url"
                  value={form.link_project}
                  onChange={(e) => updateForm("link_project", e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Tanggal Publish</label>
                <input
                  type="date"
                  value={form.tanggal_publish}
                  onChange={(e) => updateForm("tanggal_publish", e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Deskripsi</label>
              <textarea
                rows={3}
                value={form.deskripsi}
                onChange={(e) => updateForm("deskripsi", e.target.value)}
                placeholder="Deskripsi singkat tentang project ini..."
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
                {formLoading ? "Menyimpan..." : formMode === "add" ? "Tambah Portofolio" : "Simpan Perubahan"}
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
            <RiImageLine size={40} className="mb-3 opacity-40" />
            <p className="font-medium">Belum ada portofolio</p>
            <p className="text-sm mt-1">Klik &quot;Tambah Portofolio&quot; untuk mulai menambahkan</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 text-xs uppercase tracking-wider bg-gray-50 border-b border-gray-100">
                  <th className="px-5 py-3 font-semibold">Proyek</th>
                  <th className="px-5 py-3 font-semibold hidden sm:table-cell">Tanggal Publish</th>
                  <th className="px-5 py-3 font-semibold hidden sm:table-cell">Link</th>
                  <th className="px-5 py-3 font-semibold">Tampil</th>
                  <th className="px-5 py-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item) => (
                  <tr key={item.id_portofolio} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {item.gambar ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={item.gambar} alt={item.judul} className="w-10 h-10 rounded-lg object-cover bg-gray-100 flex-shrink-0" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <RiImageLine size={18} className="text-gray-400" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate">{item.judul}</p>
                          {item.deskripsi && (
                            <p className="text-xs text-gray-400 truncate max-w-xs">{item.deskripsi}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-500 text-xs whitespace-nowrap hidden sm:table-cell">{formatDate(item.tanggal_publish)}</td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      {item.link_project ? (
                        <a
                          href={item.link_project}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary-600 hover:underline"
                        >
                          Buka →
                        </a>
                      ) : (
                        <span className="text-gray-300 text-xs">-</span>
                      )}
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
                          onClick={() => handleDelete(item.id_portofolio, item.judul)}
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
