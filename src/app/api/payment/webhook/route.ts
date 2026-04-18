import { NextRequest } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { verifyMidtransSignature, mapMidtransStatus } from '@/lib/midtrans'
import { MidtransNotification } from '@/types/api'
import { ok, badRequest, serverError } from '@/lib/response'

export async function POST(req: NextRequest) {
  try {
    const notification: MidtransNotification = await req.json()

    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      transaction_id,
      payment_type,
      fraud_status,
      transaction_time,
      settlement_time,
      expiry_time,
    } = notification

    // --- Verifikasi signature Midtrans ---
    const isValid = verifyMidtransSignature(order_id, status_code, gross_amount, signature_key)
    if (!isValid) {
      return badRequest('Invalid signature')
    }

    const supabase = createServerClient()

    // --- Cari pembayaran berdasarkan midtrans_order_id ---
    const { data: pembayaran, error: findError } = await supabase
      .from('pembayaran')
      .select('id_pembayaran, id_pemesanan, status_pembayaran')
      .eq('midtrans_order_id', order_id)
      .single()

    if (findError || !pembayaran) {
      console.error('Pembayaran tidak ditemukan untuk order_id:', order_id)
      return badRequest('Pembayaran tidak ditemukan')
    }

    // Skip jika sudah final (idempotency)
    if (['paid', 'cancelled', 'expired', 'failed'].includes(pembayaran.status_pembayaran)) {
      return ok({ message: 'Already processed' })
    }

    const newStatus = mapMidtransStatus(transaction_status, fraud_status)

    // --- Update pembayaran ---
    const { error: updatePembayaranError } = await supabase
      .from('pembayaran')
      .update({
        midtrans_transaction_id: transaction_id,
        payment_type,
        status_pembayaran: newStatus,
        fraud_status: fraud_status ?? null,
        gross_amount: parseFloat(gross_amount),
        transaction_time: transaction_time ? new Date(transaction_time).toISOString() : null,
        settlement_time: settlement_time ? new Date(settlement_time).toISOString() : null,
        expiry_time: expiry_time ? new Date(expiry_time).toISOString() : null,
      })
      .eq('id_pembayaran', pembayaran.id_pembayaran)

    if (updatePembayaranError) {
      console.error('Error update pembayaran:', updatePembayaranError)
      return serverError('Gagal update status pembayaran')
    }

    // --- Update status pemesanan jika pembayaran berhasil ---
    if (newStatus === 'paid') {
      const { error: updatePemesananError } = await supabase
        .from('pemesanan')
        .update({ status_pemesanan: 'diproses' })
        .eq('id_pemesanan', pembayaran.id_pemesanan)

      if (updatePemesananError) {
        console.error('Error update status pemesanan:', updatePemesananError)
        return serverError('Gagal update status pemesanan')
      }
    }

    // Jika gagal/expired/cancelled, update status pemesanan ke menunggu_pembayaran
    // agar bisa retry pembayaran
    if (['failed', 'expired', 'cancelled'].includes(newStatus)) {
      await supabase
        .from('pemesanan')
        .update({ status_pemesanan: 'menunggu_pembayaran' })
        .eq('id_pemesanan', pembayaran.id_pemesanan)
    }

    return ok({ status: newStatus }, 'Webhook diproses')
  } catch (err) {
    console.error('Error POST /api/payment/webhook:', err)
    return serverError('Terjadi kesalahan pada server')
  }
}
