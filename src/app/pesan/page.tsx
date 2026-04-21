"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

// ─── Types ────────────────────────────────────────────────────────────────────
type BenefitPaket = { id_benefit: number; deskripsi_benefit: string };
type ApiPaket = {
  id_paket: number;
  nama_paket: string;
  deskripsi: string | null;
  harga: number;
  estimasi_hari: number;
  tipe_paket: string;
  benefit_paket: BenefitPaket[];
};

type S1 = { namaLengkap: string; namaBrand: string; email: string; whatsapp: string; alamat: string };
type S2 = { namaProject: string; catatan: string };

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatHarga(harga: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(harga);
}

function formatEstimasi(hari: number, tipe: string): string {
  if (tipe === "creative") return "Kontrak Bulanan";
  return `${hari} Hari Kerja`;
}

// ─── Stepper ──────────────────────────────────────────────────────────────────
const STEP_LABELS = ["Data Diri", "Detail Pesanan", "Pembayaran"];

const Stepper = ({ currentStep }: { currentStep: number }) => (
  <div className="flex items-center justify-center py-10">
    {STEP_LABELS.map((label, idx) => {
      const n = idx + 1;
      const active = n <= currentStep;
      return (
        <div key={n} className="flex items-center">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 transition-colors duration-300 ${
                active ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-400"
              }`}
            >
              {n}
            </div>
            <span
              className={`font-medium text-sm whitespace-nowrap transition-colors duration-300 ${
                active ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {label}
            </span>
          </div>
          {idx < 2 && (
            <div
              className={`w-14 md:w-24 h-px mx-4 md:mx-6 transition-colors duration-300 ${
                n < currentStep ? "bg-gray-700" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      );
    })}
  </div>
);

// ─── Form primitives ──────────────────────────────────────────────────────────
const inputClass =
  "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:ring-2 focus:ring-primary-400 focus:border-primary-300 outline-none transition-colors";

const Label = ({ children, required }: { children: string; required?: boolean }) => (
  <label className="block text-sm text-gray-500 mb-1.5">
    {children}
    {required && <span className="text-red-400 ml-0.5">*</span>}
  </label>
);

// ─── Step 1: Data Diri ────────────────────────────────────────────────────────
const Step1Form = ({
  data,
  onChange,
  onNext,
}: {
  data: S1;
  onChange: (d: Partial<S1>) => void;
  onNext: () => void;
}) => {
  const valid = data.namaLengkap && data.namaBrand && data.email && data.whatsapp;

  return (
    <div className="bg-gray-100 rounded-2xl p-8 md:p-10">
      <h2 className="font-poppins text-2xl font-bold text-gray-900 mb-1">Informasi Data Diri</h2>
      <p className="text-gray-500 text-sm mb-8">
        Isi data diri anda agar kami dapat menghubungi anda terkait project.
      </p>

      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label required>Nama Lengkap</Label>
            <input
              className={inputClass}
              value={data.namaLengkap}
              onChange={(e) => onChange({ namaLengkap: e.target.value })}
              placeholder="Nama lengkap Anda"
            />
          </div>
          <div>
            <Label required>Nama Brand/Bisnis</Label>
            <input
              className={inputClass}
              value={data.namaBrand}
              onChange={(e) => onChange({ namaBrand: e.target.value })}
              placeholder="Nama bisnis Anda"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label required>Email</Label>
            <input
              className={inputClass}
              type="email"
              value={data.email}
              onChange={(e) => onChange({ email: e.target.value })}
              placeholder="email@bisnis.com"
            />
          </div>
          <div>
            <Label required>Nomor Whatsapp</Label>
            <input
              className={inputClass}
              value={data.whatsapp}
              onChange={(e) => onChange({ whatsapp: e.target.value })}
              placeholder="+62 812 xxxx xxxx"
            />
          </div>
        </div>

        <div>
          <Label>Alamat (Opsional)</Label>
          <input
            className={inputClass}
            value={data.alamat}
            onChange={(e) => onChange({ alamat: e.target.value })}
            placeholder="Kota/Kabupaten, Provinsi"
          />
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Button variant="primary" onClick={onNext} disabled={!valid}>
          Lanjutkan
        </Button>
      </div>
    </div>
  );
};

// ─── Step 2: Detail Pesanan ───────────────────────────────────────────────────
const Step2Form = ({
  data,
  onChange,
  onNext,
  onBack,
  selectedPkg,
}: {
  data: S2;
  onChange: (d: Partial<S2>) => void;
  onNext: () => void;
  onBack: () => void;
  selectedPkg: ApiPaket;
}) => {
  const valid = data.namaProject.trim().length > 0;

  return (
    <div className="bg-gray-100 rounded-2xl p-8 md:p-10">
      <h2 className="font-poppins text-2xl font-bold text-gray-900 mb-1">Detail Pesanan Anda</h2>
      <p className="text-gray-500 text-sm mb-8">
        Konfirmasi paket yang dipilih dan tambahkan detail project anda.
      </p>

      <div className="space-y-5">
        <div>
          <Label>Paket yang Dipilih</Label>
          <div className="bg-white rounded-xl px-5 py-4 border border-gray-200 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="font-poppins font-bold text-gray-900 text-sm">{selectedPkg.nama_paket}</div>
              <div className="text-gray-400 text-xs mt-0.5 truncate">{selectedPkg.deskripsi ?? ""}</div>
            </div>
            <div className="font-bold text-gray-800 text-sm whitespace-nowrap">
              {formatHarga(selectedPkg.harga)}
            </div>
          </div>
        </div>

        <div>
          <Label required>Nama Project</Label>
          <input
            className={inputClass}
            value={data.namaProject}
            onChange={(e) => onChange({ namaProject: e.target.value })}
            placeholder="Contoh: Website Toko Baju Online"
          />
        </div>

        <div>
          <Label>Catatan Tambahan (Opsional)</Label>
          <textarea
            className={`${inputClass} resize-none`}
            rows={5}
            value={data.catatan}
            onChange={(e) => onChange({ catatan: e.target.value })}
            placeholder="Tuliskan catatan atau keinginan spesifik Anda..."
          />
          <p className="text-xs text-gray-400 mt-1.5">
            Contoh: Referensi Website, Fitur Khusus, Warna Brand, dll.
          </p>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack} size="md">
          Kembali
        </Button>
        <Button variant="primary" onClick={onNext} disabled={!valid}>
          Lanjutkan
        </Button>
      </div>
    </div>
  );
};

// ─── Step 3: Ringkasan & Pembayaran ──────────────────────────────────────────
const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-baseline gap-4 py-1">
    <span className="text-sm font-semibold text-gray-800 flex-shrink-0">{label}</span>
    <span className="text-sm text-gray-600 text-right">{value}</span>
  </div>
);

const Step3Form = ({
  s1,
  s2,
  selectedPkg,
  onBack,
  onSubmit,
  isLoading,
}: {
  s1: S1;
  s2: S2;
  selectedPkg: ApiPaket;
  onBack: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="bg-gray-100 rounded-2xl p-8 md:p-10">
      <h2 className="font-poppins text-2xl font-bold text-gray-900 mb-1">Ringkasan Pesanan</h2>
      <p className="text-gray-500 text-sm mb-8">
        Periksa kembali data anda sebelum melanjutkan ke pembayaran.
      </p>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3">Data Pelanggan</h3>
          <SummaryRow label="Nama" value={s1.namaLengkap} />
          <SummaryRow label="Brand" value={s1.namaBrand} />
          <SummaryRow label="Email" value={s1.email} />
          <SummaryRow label="Whatsapp" value={s1.whatsapp} />
        </div>

        <div className="h-px bg-gray-300" />

        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3">Detail Pesanan</h3>
          <SummaryRow label="Paket" value={selectedPkg.nama_paket} />
          <SummaryRow label="Nama Project" value={s2.namaProject} />
          <SummaryRow
            label="Estimasi Pengerjaan"
            value={formatEstimasi(selectedPkg.estimasi_hari, selectedPkg.tipe_paket)}
          />
          {s2.catatan && <SummaryRow label="Catatan" value={s2.catatan} />}
        </div>

        <div className="h-px bg-gray-300" />

        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-900">Total Pembayaran</span>
          <span className="font-bold text-gray-900 text-lg">{formatHarga(selectedPkg.harga)}</span>
        </div>

        <div className={`flex items-start gap-3 pt-1 rounded-xl p-3 transition-colors ${!agreed ? "bg-amber-50 border border-amber-200" : "bg-green-50 border border-green-200"}`}>
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 w-4 h-4 flex-shrink-0 accent-primary-600 cursor-pointer"
          />
          <label htmlFor="agree" className="text-xs text-gray-600 cursor-pointer leading-relaxed">
            Saya telah membaca dan menyetujui syarat & ketentuan yang berlaku serta memahami bahwa
            pembayaran bersifat non-refundable.
          </label>
        </div>

        {!agreed && (
          <p className="text-xs text-amber-700 flex items-center gap-1.5">
            <span>⚠</span>
            Centang persetujuan di atas untuk melanjutkan pembayaran.
          </p>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack} size="md">
          Kembali
        </Button>
        <Button variant="primary" onClick={onSubmit} disabled={!agreed || isLoading}>
          {isLoading ? "Memproses..." : `Bayar Sekarang – ${formatHarga(selectedPkg.harga)}`}
        </Button>
      </div>
    </div>
  );
};

// ─── Main content ──────────────────────────────────────────────────────────────
const PesanContent = () => {
  const searchParams = useSearchParams();
  const paketIdParam = parseInt(searchParams.get("paket") ?? "1");

  const [pakets, setPakets] = useState<ApiPaket[]>([]);
  const [isLoadingPaket, setIsLoadingPaket] = useState(true);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [s1, setS1] = useState<S1>({
    namaLengkap: "",
    namaBrand: "",
    email: "",
    whatsapp: "",
    alamat: "",
  });
  const [s2, setS2] = useState<S2>({ namaProject: "", catatan: "" });

  useEffect(() => {
    fetch("/api/paket")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setPakets(json.data);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoadingPaket(false));
  }, []);

  const selectedPkg = pakets.find((p) => p.id_paket === paketIdParam) ?? pakets[0];

  const handleSubmit = async () => {
    if (!selectedPkg) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_paket: selectedPkg.id_paket,
          nama: s1.namaLengkap,
          nama_brand: s1.namaBrand,
          email: s1.email,
          no_telepon: s1.whatsapp,
          alamat: s1.alamat,
          nama_proyek: s2.namaProject,
          catatan_tambahan: s2.catatan,
        }),
      });
      const data = await res.json();
      if (data.data?.redirect_url) {
        window.location.href = data.data.redirect_url;
      } else {
        console.error("Order error:", data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingPaket) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        Memuat data paket...
      </div>
    );
  }

  if (!selectedPkg) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        Paket tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* ─── Header ─── */}
      <section className="bg-gray-50 pt-12 pb-16 border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <p className="text-gray-400 text-sm mb-3">Pemesanan Jasa</p>
          <h1 className="font-poppins text-4xl font-bold text-gray-900 mb-5">
            Pesan Paket Website Anda
          </h1>
          <p className="text-gray-600 text-base leading-relaxed border-l-4 border-primary-500 pl-5 max-w-xl">
            Lengkapi data di bawah ini untuk memulai project website anda bersama UPGRID DIGITAL.
          </p>
        </div>
      </section>

      {/* ─── Form ─── */}
      <section className="flex-grow bg-white pb-20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <Stepper currentStep={step} />

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.22 }}
              >
                <Step1Form
                  data={s1}
                  onChange={(d) => setS1((p) => ({ ...p, ...d }))}
                  onNext={() => setStep(2)}
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.22 }}
              >
                <Step2Form
                  data={s2}
                  onChange={(d) => setS2((p) => ({ ...p, ...d }))}
                  onNext={() => setStep(3)}
                  onBack={() => setStep(1)}
                  selectedPkg={selectedPkg}
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.22 }}
              >
                <Step3Form
                  s1={s1}
                  s2={s2}
                  selectedPkg={selectedPkg}
                  onBack={() => setStep(2)}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

// ─── Page export ──────────────────────────────────────────────────────────────
export default function Pesan() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen text-gray-400">
          Memuat...
        </div>
      }
    >
      <PesanContent />
    </Suspense>
  );
}
