// Generate kode_pemesanan: UPG-YYYYMMDD-XXXXX
// Format: UPG-20250418-A1B2C
export function generateKodePemesanan(): string {
  const date = new Date()
  const ymd = date.toISOString().slice(0, 10).replace(/-/g, '')
  const random = Math.random().toString(36).toUpperCase().slice(2, 7)
  return `UPG-${ymd}-${random}`
}

// Generate midtrans order_id (must be unique per transaction)
export function generateMidtransOrderId(kodePemesanan: string): string {
  const timestamp = Date.now()
  return `${kodePemesanan}-${timestamp}`
}
