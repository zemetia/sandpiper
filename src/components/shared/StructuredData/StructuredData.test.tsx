import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { faqSchema } from '@/lib/structured-data';

import { StructuredData } from './StructuredData';

describe('StructuredData', () => {
  it('escapes "<" so CMS content cannot close the script tag', () => {
    const { container } = render(
      <StructuredData
        id="faq"
        schema={faqSchema([{ question: '</script><script>alert(1)</script>', answer: 'a' }])}
      />,
    );
    const script = container.querySelector('script#ld-faq');
    expect(script?.innerHTML).not.toContain('</script>');
    expect(JSON.parse(script?.innerHTML ?? '{}').mainEntity[0].name).toBe(
      '</script><script>alert(1)</script>',
    );
  });
});
