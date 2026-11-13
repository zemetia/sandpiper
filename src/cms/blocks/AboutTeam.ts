import type { Block } from 'payload';

import { link } from '../fields/link';

export const AboutTeam: Block = {
  slug: 'aboutTeam',
  interfaceName: 'AboutTeamBlock',
  labels: { singular: 'Team', plural: 'Teams' },
  admin: { group: 'About page' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Team',
          fields: [
            { name: 'eyebrow', type: 'text', admin: { placeholder: 'OUR TEAM' } },
            { name: 'heading', type: 'text' },
            { name: 'body', type: 'textarea' },
            {
              name: 'members',
              type: 'array',
              maxRows: 4,
              labels: { singular: 'Member', plural: 'Members' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'photo', type: 'upload', relationTo: 'media', admin: { width: '25%' } },
                    { name: 'name', type: 'text', required: true, admin: { width: '25%' } },
                    {
                      name: 'role',
                      type: 'text',
                      admin: { width: '25%', placeholder: 'HEAD BARISTA' },
                    },
                    {
                      name: 'tone',
                      type: 'select',
                      defaultValue: 'blue',
                      options: [
                        { label: 'Blue tag', value: 'blue' },
                        { label: 'Berry tag', value: 'berry' },
                      ],
                      admin: { width: '25%' },
                    },
                  ],
                },
                {
                  name: 'note',
                  type: 'text',
                  admin: {
                    description: 'Handwritten line under the name, e.g. "latte art on demand".',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Hiring card',
          fields: [
            {
              name: 'hiring',
              type: 'group',
              admin: {
                description: 'Ink card at the end of the row. Leave the heading empty to hide it.',
              },
              fields: [
                { name: 'heading', type: 'text' },
                { name: 'body', type: 'textarea' },
                { name: 'enableLink', type: 'checkbox', label: 'Show a button' },
                {
                  ...link({ appearances: false, required: false }),
                  admin: { condition: (_, s) => Boolean(s?.['enableLink']), hideGutter: true },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
