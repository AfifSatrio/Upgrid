export type StatusPemesanan = 'menunggu_pembayaran' | 'diproses' | 'selesai' | 'dibatalkan'
export type StatusPembayaran = 'pending' | 'paid' | 'failed' | 'expired' | 'cancelled'
export type StatusProgress = 'brief' | 'desain' | 'development' | 'revisi' | 'selesai'

export interface Paket {
  id_paket: number
  nama_paket: string
  slug: string
  deskripsi: string | null
  harga: number
  estimasi_hari: number
  tipe_paket: string
  status_aktif: boolean
  created_at: string
  updated_at: string
}

export interface BenefitPaket {
  id_benefit: number
  id_paket: number
  deskripsi_benefit: string
}

export interface Portofolio {
  id_portofolio: number
  judul: string
  deskripsi: string | null
  gambar: string | null
  link_project: string | null
  tanggal_publish: string | null
  status_tampil: boolean
  created_at: string
  updated_at: string
}

export interface Admin {
  id_admin: number
  nama: string
  email: string
  password: string
  role: string
  status_aktif: boolean
  created_at: string
  updated_at: string
}

export interface Pelanggan {
  id_pelanggan: number
  nama: string
  email: string
  no_telepon: string
  nama_brand: string | null
  alamat: string | null
  created_at: string
  updated_at: string
}

export interface Pemesanan {
  id_pemesanan: number
  id_pelanggan: number
  id_paket: number
  kode_pemesanan: string
  tanggal_pesan: string
  nama_proyek: string
  total_harga: number
  status_pemesanan: StatusPemesanan
  catatan_tambahan: string | null
  tanggal_mulai: string | null
  tanggal_selesai: string | null
  created_at: string
  updated_at: string
}

export interface Pembayaran {
  id_pembayaran: number
  id_pemesanan: number
  midtrans_order_id: string | null
  midtrans_transaction_id: string | null
  snap_token: string | null
  redirect_url: string | null
  payment_type: string | null
  status_pembayaran: StatusPembayaran
  fraud_status: string | null
  gross_amount: number | null
  transaction_time: string | null
  settlement_time: string | null
  expiry_time: string | null
  created_at: string
  updated_at: string
}

export interface ProgressPemesanan {
  id_progress: number
  id_pemesanan: number
  id_admin: number
  judul_update: string
  deskripsi_progress: string | null
  persentase: number
  status_progress: StatusProgress
  tanggal_update: string
  created_at: string
}

export interface Testimoni {
  id_testimoni: number
  id_admin: number
  nama_tampil: string
  nama_brand: string | null
  rating: number
  komentar: string
  status_tampil: boolean
  created_at: string
  updated_at: string
}

// Join types for API responses
export interface PemesananWithRelations extends Pemesanan {
  pelanggan: Pelanggan
  paket: Paket
  pembayaran: Pembayaran | null
  progress_pemesanan: ProgressPemesanan[]
}

export interface PaketWithBenefit extends Paket {
  benefit_paket: BenefitPaket[]
}
