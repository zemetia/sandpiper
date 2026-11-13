/** Locale-aware price, e.g. `Rp 38.000` / `$4.50` / `$11` (whole dollars drop the cents). */
export function formatPrice(value: number, currency: 'IDR' | 'USD', locale: string): string {
  const region = currency === 'IDR' ? 'ID' : 'US';
  return new Intl.NumberFormat(`${locale}-${region}`, {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === 'IDR' || Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: currency === 'IDR' ? 0 : 2,
  }).format(value);
}
