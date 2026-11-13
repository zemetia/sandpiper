/** Locale-aware price, e.g. `Rp 38.000` (id) / `Rp 38,000` (en) / `$4.50`. */
export function formatPrice(value: number, currency: 'IDR' | 'USD', locale: string): string {
  const region = currency === 'IDR' ? 'ID' : 'US';
  return new Intl.NumberFormat(`${locale}-${region}`, {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'IDR' ? 0 : 2,
  }).format(value);
}
