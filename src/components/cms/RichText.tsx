import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react';

import { cn } from '@/lib/cn';

export interface RichTextProps {
  /** Any Lexical field value from `@/payload-types` */
  data: { root: object } | null | undefined;
  className?: string;
}

export function RichText({ data, className }: RichTextProps) {
  if (!data) return null;
  return (
    <LexicalRichText data={data as SerializedEditorState} className={cn('prose-cms', className)} />
  );
}

RichText.displayName = 'RichText';
