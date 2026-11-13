'use client';

import { useEffect, useState } from 'react';
import { TicketPercent } from 'lucide-react';
import { toast } from 'sonner';

import { copy } from '@/config/copy';

/** Promo code chip; the whole chip copies the code. Sits above the row's stretched link. */
export function PromoCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success(copy.order.copiedToast(code));
    } catch {
      toast.error(copy.order.copyFailed);
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copy.order.copyCode(code)}
      className="bg-sunny-soft border-ink text-ink hover:bg-sunny relative z-10 mt-1 inline-flex items-center gap-2 self-start rounded-lg border-[1.5px] px-2.5 py-1 transition-colors lg:px-3 lg:py-1.5"
    >
      <TicketPercent aria-hidden strokeWidth={2.25} className="size-4" />
      <span className="font-ui text-[13px] font-extrabold tracking-[0.07em] lg:text-sm">
        {code}
      </span>
      <span aria-live="polite" className="text-blue text-xs font-semibold">
        {copied ? copy.order.copied : copy.order.copy}
      </span>
    </button>
  );
}
