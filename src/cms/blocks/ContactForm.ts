import type { Block } from 'payload';

import { link } from '../fields/link';
import { accentHeading, storyIconField } from './storyIcons';

export const ContactForm: Block = {
  slug: 'contactForm',
  interfaceName: 'ContactFormBlock',
  labels: { singular: 'Contact form', plural: 'Contact forms' },
  admin: { group: 'Contact page' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Form',
          description: 'Messages land in Site → Contact messages.',
          fields: [
            { name: 'eyebrow', type: 'text', admin: { placeholder: 'DROP US A LINE' } },
            accentHeading('Send a note,\n*we’ll write back.*'),
            {
              name: 'topics',
              type: 'text',
              hasMany: true,
              admin: { description: 'Chips for "What’s it about?". The first is preselected.' },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'submitLabel',
                  type: 'text',
                  admin: { width: '50%', placeholder: 'SEND MESSAGE' },
                },
                {
                  name: 'note',
                  type: 'text',
                  admin: { width: '50%', description: 'Handwritten note beside the button.' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'successHeading', type: 'text', admin: { width: '50%' } },
                { name: 'successBody', type: 'text', admin: { width: '50%' } },
              ],
            },
          ],
        },
        {
          label: 'Details',
          fields: [
            {
              name: 'detailsHeading',
              type: 'text',
              admin: { placeholder: 'OR REACH US DIRECTLY' },
            },
            {
              name: 'details',
              type: 'array',
              maxRows: 5,
              labels: { singular: 'Detail', plural: 'Details' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    storyIconField({ admin: { width: '25%' } }),
                    {
                      name: 'label',
                      type: 'text',
                      admin: { width: '25%', placeholder: 'CALL THE SHOP' },
                    },
                    { name: 'value', type: 'text', required: true, admin: { width: '50%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'description', type: 'text', admin: { width: '50%' } },
                    {
                      name: 'url',
                      type: 'text',
                      admin: {
                        width: '50%',
                        description: 'Optional: tel:, mailto: or https:// link.',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'callout',
              type: 'group',
              admin: {
                description: 'Ink card under the details. Leave the text empty to hide it.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'eyebrow', type: 'text', admin: { width: '40%' } },
                    { name: 'text', type: 'text', admin: { width: '60%' } },
                  ],
                },
                link({ appearances: false, required: false }),
              ],
            },
          ],
        },
      ],
    },
  ],
};
