// ============================================================
// Request Bodies
// ============================================================

export interface CreateOrderRequest {
  // Data pelanggan
  nama: string
  email: string
  no_telepon: string
  nama_brand?: string
  alamat?: string

  // Data pemesanan
  id_paket: number
  nama_proyek: string
  catatan_tambahan?: string
}

export interface AdminLoginRequest {
  email: string
  password: string
}

export interface CreatePaketRequest {
  nama_paket: string
  slug: string
  deskripsi?: string
  harga: number
  estimasi_hari: number
  tipe_paket: string
  status_aktif?: boolean
  benefit: string[]
}

export interface UpdatePaketRequest extends Partial<CreatePaketRequest> {}

export interface CreateProgressRequest {
  id_pemesanan: number
  judul_update: string
  deskripsi_progress?: string
  persentase: number
  status_progress: 'brief' | 'desain' | 'development' | 'revisi' | 'selesai'
  lampiran_urls?: string[]
}

export interface UpdateProgressRequest extends Partial<Omit<CreateProgressRequest, 'id_pemesanan'>> {}

export interface CreatePortofolioRequest {
  judul: string
  deskripsi?: string
  gambar?: string
  link_project?: string
  tanggal_publish?: string
  status_tampil?: boolean
}

export interface UpdatePortofolioRequest extends Partial<CreatePortofolioRequest> {}

export interface CreateTestimoniRequest {
  nama_tampil: string
  nama_brand?: string
  rating: number
  komentar: string
  status_tampil?: boolean
}

export interface UpdateTestimoniRequest extends Partial<CreateTestimoniRequest> {}

export interface UpdateStatusPemesananRequest {
  status_pemesanan: 'menunggu_pembayaran' | 'diproses' | 'review' | 'selesai' | 'dibatalkan'
  tanggal_mulai?: string
  tanggal_selesai?: string
}

// ============================================================
// Midtrans Webhook Payload
// ============================================================
export interface MidtransNotification {
  transaction_time: string
  transaction_status: string
  transaction_id: string
  status_message: string
  status_code: string
  signature_key: string
  settlement_time?: string
  payment_type: string
  order_id: string
  merchant_id: string
  gross_amount: string
  fraud_status?: string
  currency: string
  expiry_time?: string
}

// ============================================================
// API Response wrapper
// ============================================================
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: string
}
