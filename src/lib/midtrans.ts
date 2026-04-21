import midtransClient from 'midtrans-client'
import crypto from 'crypto'

let snapInstance: midtransClient.Snap | null = null

export function getSnapClient(): midtransClient.Snap {
  if (snapInstance) return snapInstance

  snapInstance = new midtransClient.Snap({
    isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
    serverKey: process.env.MIDTRANS_SERVER_KEY!,
    clientKey: process.env.MIDTRANS_CLIENT_KEY!,
  })

  return snapInstance
}

export interface SnapTransactionParam {
  orderId: string
  grossAmount: number
  customerName: string
  customerEmail: string
  customerPhone: string
  itemName: string
  itemPrice: number
}

export async function createSnapTransaction(params: SnapTransactionParam) {
  const snap = getSnapClient()

  const parameter = {
    transaction_details: {
      order_id: params.orderId,
      gross_amount: params.grossAmount,
    },
    customer_details: {
      first_name: params.customerName,
      email: params.customerEmail,
      phone: params.customerPhone,
    },
    item_details: [
      {
        id: params.orderId,
        price: params.itemPrice,
        quantity: 1,
        name: params.itemName,
      },
    ],
    callbacks: {
      finish: `${process.env.NEXT_PUBLIC_APP_URL}/pembayaran/berhasil`,
      error: `${process.env.NEXT_PUBLIC_APP_URL}/pembayaran/gagal`,
      pending: `${process.env.NEXT_PUBLIC_APP_URL}/pembayaran/berhasil`,
    },
  }

  return await snap.createTransaction(parameter)
}

export function verifyMidtransSignature(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  signatureKey: string
): boolean {
  const serverKey = process.env.MIDTRANS_SERVER_KEY!
  const payload = `${orderId}${statusCode}${grossAmount}${serverKey}`
  const expected = crypto.createHash('sha512').update(payload).digest('hex')
  return expected === signatureKey
}

export function mapMidtransStatus(
  transactionStatus: string,
  fraudStatus?: string
): 'pending' | 'paid' | 'failed' | 'expired' | 'cancelled' {
  if (transactionStatus === 'capture') {
    return fraudStatus === 'accept' ? 'paid' : 'failed'
  }
  if (transactionStatus === 'settlement') return 'paid'
  if (transactionStatus === 'cancel') return 'cancelled'
  if (transactionStatus === 'deny') return 'failed'
  if (transactionStatus === 'expire') return 'expired'
  return 'pending'
}
