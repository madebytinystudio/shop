export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-KZ', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price) + ' ₸'
}

export function buildWhatsAppUrl(productName: string, price: number, productUrl: string): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '77717011151'
  const text = `Здравствуйте! Хочу оформить заказ.\n\nТовар: ${productName}\nЦена: ${formatPrice(price)}\nСсылка: ${productUrl}\n\nПодскажите, пожалуйста, по наличию и условиям доставки.`
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}

export function buildWhatsAppGeneralUrl(): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '77717011151'
  const text = 'Здравствуйте! Хочу узнать подробнее о ваших товарах.'
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}
