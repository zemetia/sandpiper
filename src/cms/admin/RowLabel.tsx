'use client';

import { useRowLabel } from '@payloadcms/ui';

type Fallback = { fallback: string };

function Label({ text, fallback }: { text: string | undefined } & Fallback) {
  const { rowNumber } = useRowLabel();
  return (
    <span>{text?.trim() || `${fallback} ${String((rowNumber ?? 0) + 1).padStart(2, '0')}`}</span>
  );
}

export function LinkRowLabel() {
  const { data } = useRowLabel<{ link?: { label?: string } }>();
  return <Label text={data?.link?.label} fallback="Link" />;
}

export function FaqRowLabel() {
  const { data } = useRowLabel<{ question?: string }>();
  return <Label text={data?.question} fallback="Question" />;
}

export function QuoteRowLabel() {
  const { data } = useRowLabel<{ author?: string }>();
  return <Label text={data?.author} fallback="Quote" />;
}

export function HoursRowLabel() {
  const { data } = useRowLabel<{ days?: string; time?: string }>();
  return (
    <Label
      text={data?.days && data.time ? `${data.days} · ${data.time}` : data?.days}
      fallback="Hours"
    />
  );
}

export function VariantRowLabel() {
  const { data } = useRowLabel<{ label?: string; price?: number }>();
  const text = data?.label
    ? `${data.label}${data.price != null ? ` — ${data.price.toLocaleString()}` : ''}`
    : undefined;
  return <Label text={text} fallback="Variant" />;
}
