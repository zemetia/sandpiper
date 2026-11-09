import { serializeSchema } from '@/lib/structured-data';

type Schema = Parameters<typeof serializeSchema>[0];

export interface StructuredDataProps {
  id: string;
  schema: Schema;
}

/** JSON-LD for GEO. Safe for CMS content — `serializeSchema` escapes `<`. */
export function StructuredData({ id, schema }: StructuredDataProps) {
  return (
    <script
      id={`ld-${id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeSchema(schema) }}
    />
  );
}

StructuredData.displayName = 'StructuredData';
