import type { Block } from 'payload';

import { link, linkGroup } from '../fields/link';

export const HomeHero: Block = {
  slug: 'homeHero',
  interfaceName: 'HomeHeroBlock',
  labels: { singular: 'Home hero (slider)', plural: 'Home heroes' },
  admin: { group: 'Landing page' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Headline slide',
          description:
            'Slide 1. Three giant lines with a photo pill between line 2 and the accent word. Line 3 repeats until it runs off the edge.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'line1',
                  type: 'text',
                  localized: true,
                  admin: { width: '25%', placeholder: 'BREAKFAST,' },
                },
                {
                  name: 'line2',
                  type: 'text',
                  localized: true,
                  admin: { width: '25%', placeholder: 'LUNCH' },
                },
                {
                  name: 'accent',
                  type: 'text',
                  localized: true,
                  admin: { width: '20%', placeholder: '&', description: 'Shown in blue.' },
                },
                {
                  name: 'line3',
                  type: 'text',
                  localized: true,
                  admin: { width: '30%', placeholder: 'COFFEE.' },
                },
              ],
            },
            {
              name: 'pillImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Small photo set into line 2 (pill shape).' },
            },
            { name: 'body', type: 'textarea', localized: true },
            linkGroup('links', 2),
          ],
        },
        {
          label: 'Polaroid & stamp',
          fields: [
            {
              name: 'polaroid',
              type: 'group',
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media' },
                {
                  name: 'caption',
                  type: 'text',
                  localized: true,
                  admin: { description: 'Handwritten caption under the photo.' },
                },
              ],
            },
            {
              name: 'stamp',
              type: 'group',
              admin: { description: 'Round blue stamp beside the polaroid.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      localized: true,
                      admin: { width: '50%', placeholder: 'OPEN DAILY' },
                    },
                    {
                      name: 'value',
                      type: 'text',
                      localized: true,
                      admin: { width: '50%', placeholder: '7–4' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Featured dishes',
          description:
            'Slides 2–4. Each shows one dish — giant name, one-line pitch, price and an order button.',
          fields: [
            {
              name: 'slides',
              type: 'array',
              maxRows: 3,
              labels: { singular: 'Dish slide', plural: 'Dish slides' },
              admin: { components: { RowLabel: '/cms/admin/RowLabel#DishRowLabel' } },
              fields: [
                {
                  name: 'menuItem',
                  type: 'relationship',
                  relationTo: 'menu-items',
                  required: true,
                },
                {
                  name: 'pitch',
                  type: 'textarea',
                  localized: true,
                  admin: { description: 'One line. Falls back to the item description.' },
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { description: 'Optional — overrides the menu item photo.' },
                },
              ],
            },
            {
              ...link({ name: 'orderLink', appearances: false, required: false }),
              label: 'Order button on dish slides',
            },
            {
              name: 'autoplay',
              type: 'number',
              defaultValue: 7,
              min: 0,
              max: 30,
              admin: { step: 1, description: 'Seconds per slide. 0 turns autoplay off.' },
            },
          ],
        },
      ],
    },
  ],
};
