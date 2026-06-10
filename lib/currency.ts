export type Currency = 'USD' | 'EUR' | 'GBP' | 'INR'

export const currencies = {
  USD: { symbol: '$', rate: 1, label: 'USD' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP' },
  INR: { symbol: '₹', rate: 83.5, label: 'INR' },
}

export function formatPrice(
  priceInUSD: number,
  currency: Currency
): string {
  const { symbol, rate } = currencies[currency]
  const converted = priceInUSD * rate

  // INR shows no decimals
  if (currency === 'INR') {
    return `${symbol}${Math.round(converted).toLocaleString('en-IN')}`
  }

  return `${symbol}${converted.toFixed(2)}`
}