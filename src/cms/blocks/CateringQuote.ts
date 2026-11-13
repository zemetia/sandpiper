import type { Block } from 'payload';

export const CateringQuote: Block = {
  slug: 'cateringQuote',
  interfaceName: 'CateringQuoteBlock',
  labels: { singular: 'Catering quote form', plural: 'Catering quote forms' },
  admin: { group: 'Catering page' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Intro & contact',
          fields: [
            {
              name: 'eyebrow',
              type: 'text',
              localized: true,
              admin: { placeholder: "LET'S PLAN IT" },
            },
            {
              name: 'heading',
              type: 'textarea',
              localized: true,
              admin: { description: 'Each line break starts a new line.' },
            },
            { name: 'body', type: 'textarea', localized: true },
            {
              type: 'row',
              fields: [
                {
                  name: 'callLabel',
                  type: 'text',
                  localized: true,
                  admin: { width: '33%', placeholder: 'Call or text' },
                },
                {
                  name: 'phone',
                  type: 'text',
                  admin: { width: '33%', description: 'Falls back to Site settings → phone.' },
                },
                {
                  name: 'callPrompt',
                  type: 'text',
                  localized: true,
                  admin: {
                    width: '33%',
                    placeholder: 'Rather talk?',
                    description: 'Phone call strip.',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'pickupLabel',
                  type: 'text',
                  localized: true,
                  admin: { width: '50%', placeholder: 'Pickup at' },
                },
                {
                  name: 'pickupAddress',
                  type: 'text',
                  localized: true,
                  admin: { width: '50%', description: 'Falls back to Site settings → address.' },
                },
              ],
            },
          ],
        },
        {
          label: 'Form',
          description: 'Requests land in Catering requests. Field labels are fixed UI text.',
          fields: [
            {
              name: 'formTitle',
              type: 'text',
              localized: true,
              admin: { placeholder: 'Catering request' },
            },
            {
              name: 'occasions',
              type: 'text',
              hasMany: true,
              localized: true,
              admin: { description: 'Occasion chips. The first one starts selected.' },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'submitLabel',
                  type: 'text',
                  localized: true,
                  admin: { width: '50%', placeholder: 'SEND MY REQUEST' },
                },
                {
                  name: 'finePrint',
                  type: 'text',
                  localized: true,
                  admin: { width: '50%', placeholder: 'We reply within a few hours…' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'successHeading',
                  type: 'text',
                  localized: true,
                  admin: { width: '40%', placeholder: 'Got it!' },
                },
                {
                  name: 'successBody',
                  type: 'text',
                  localized: true,
                  admin: { width: '60%', description: 'Shown after a request is sent.' },
                },
              ],
            },
          ],
        },
        {
          label: 'Good to know',
          fields: [
            {
              name: 'faqHeading',
              type: 'text',
              localized: true,
              admin: { placeholder: 'Good to know' },
            },
            {
              name: 'faqs',
              type: 'array',
              labels: { singular: 'Question', plural: 'Questions' },
              admin: { description: 'The first answer starts open.' },
              fields: [
                { name: 'question', type: 'text', localized: true },
                { name: 'answer', type: 'textarea', localized: true },
              ],
            },
          ],
        },
      ],
    },
  ],
};
