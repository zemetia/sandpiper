import type { Field, GroupField } from 'payload';

type LinkOptions = {
  name?: string;
  appearances?: boolean;
  required?: boolean;
};

export const link = ({
  name = 'link',
  appearances = true,
  required = true,
}: LinkOptions = {}): GroupField => {
  const fields: Field[] = [
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'radio',
          defaultValue: 'reference',
          options: [
            { label: 'Internal page', value: 'reference' },
            { label: 'Custom URL', value: 'custom' },
          ],
          admin: { layout: 'horizontal', width: '50%' },
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in new tab',
          admin: { width: '50%', style: { alignSelf: 'flex-end' } },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'reference',
          type: 'relationship',
          relationTo: 'pages',
          required,
          admin: { condition: (_, s) => s?.['type'] === 'reference', width: '50%' },
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required,
          admin: { condition: (_, s) => s?.['type'] === 'custom', width: '50%' },
        },
        {
          name: 'label',
          type: 'text',
          localized: true,
          required,
          admin: { width: '50%' },
        },
      ],
    },
  ];

  if (appearances) {
    fields.push({
      name: 'appearance',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Outline', value: 'outline' },
        { label: 'Text link', value: 'link' },
      ],
    });
  }

  return { name, type: 'group', admin: { hideGutter: true }, fields };
};

export const linkGroup = (name = 'links', maxRows = 2): Field => ({
  name,
  type: 'array',
  maxRows,
  admin: { initCollapsed: true, components: { RowLabel: '/cms/admin/RowLabel#LinkRowLabel' } },
  fields: [link()],
});
