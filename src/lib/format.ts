/** Price in the currency's home format, e.g. `$4.50` / `$11` (whole dollars drop the cents) / `Rp 38.000`. */
export function formatPrice(value: number, currency: 'IDR' | 'USD'): string {
  return new Intl.NumberFormat(currency === 'IDR' ? 'id-ID' : 'en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === 'IDR' || Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: currency === 'IDR' ? 0 : 2,
  }).format(value);
}
