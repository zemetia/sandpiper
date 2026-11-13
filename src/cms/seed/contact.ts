// Contact page (Pencil frame "Sandpiper — Contact Page").
type Upload = (file: string, alt: string) => Promise<number>;
type PageLink = { type: 'reference'; reference: number; label: string };

const custom = (url: string, label: string, newTab = false) => ({
  type: 'custom' as const,
  url,
  label,
  newTab,
});

export async function contactLayout(upload: Upload, links: { catering: PageLink }) {
  return [
    {
      blockType: 'contactHero',
      eyebrow: 'Contact us · 1640 South St',
      heading: 'Say hi to\n*the bird.*',
      body: 'Questions about the menu, a catering order or a gift card? Call the shop, send us a note, or just stop by — we’re open every day from 7 to 4.',
      showCall: true,
      links: [
        {
          link: custom(
            'https://www.google.com/maps/search/?api=1&query=1640+South+St+Philadelphia+PA',
            'Get directions',
            true,
          ),
        },
      ],
      hours: {
        eyebrow: 'Open every day',
        value: '7am – 4pm',
        rows: [
          { label: 'Breakfast', value: 'all day' },
          { label: 'Lunch', value: 'from 11am' },
          { label: 'Order ahead', value: 'online, anytime' },
        ],
      },
      photo: await upload('lattes-window.webp', 'Two iced lattes by the South Street window'),
      caption: 'come sit by the window',
      stamp: { top: 'WE REPLY', value: 'FAST', bottom: 'WITHIN A DAY' },
    },
    {
      blockType: 'cateringRibbon',
      words: [
        'Made fresh to order',
        'All-day breakfast',
        'Lavazza coffee',
        'Brunch favorites',
        'Family-owned',
      ],
    },
    {
      blockType: 'contactForm',
      eyebrow: 'Drop us a line',
      heading: 'Send a note,\n*we’ll write back.*',
      topics: ['Just saying hi', 'Catering', 'Feedback', 'Jobs', 'Something else'],
      submitLabel: 'Send message',
      note: 'usually back to you within a day ✶',
      successHeading: 'Message sent!',
      successBody: 'Thanks for reaching out — we’ll get back to you within a day.',
      detailsHeading: 'Or reach us directly',
      details: [
        {
          icon: 'phone',
          label: 'Call the shop',
          value: '(267) 858-6183',
          description: 'Fastest for same-day questions',
          url: 'tel:+12678586183',
        },
        {
          icon: 'mail',
          label: 'Email',
          value: 'hello@sandpiper.cafe',
          description: 'For catering, events & press',
          url: 'mailto:hello@sandpiper.cafe',
        },
        {
          icon: 'pin',
          label: 'Visit',
          value: '1640 South St',
          description: 'Philadelphia, PA 19146',
          url: 'https://www.google.com/maps/search/?api=1&query=1640+South+St+Philadelphia+PA',
        },
        {
          icon: 'instagram',
          label: 'Follow along',
          value: '@sandpiper.philly',
          description: 'Daily specials & mural sightings',
          url: 'https://www.instagram.com/sandpiper.philly/',
        },
      ],
      callout: {
        eyebrow: 'Feeding a crowd?',
        text: 'Trays of breakfast sandwiches, bagels and coffee boxes for 10+.',
        link: links.catering,
      },
    },
    {
      blockType: 'contactFind',
      eyebrow: 'Find us',
      heading: 'Right on\n*South Street.*',
      body: 'Look for the yellow sign and the neon bird in the window, between 16th and 17th. Easy to reach on foot, by bike or by bus — and the coffee’s worth the trip.',
      facts: [
        { icon: 'pin', title: '1640 South St', detail: 'Philadelphia, PA 19146' },
        { icon: 'sunrise', title: 'Open daily', detail: '7:00am – 4:00pm' },
        { icon: 'bike', title: 'Grab & go', detail: 'Order ahead online, pick up at the counter' },
      ],
      useMapUrl: true,
      link: { type: 'custom' as const, label: 'Open in Google Maps' },
      mainPhoto: await upload('interior.webp', 'Sandpiper dining room and mural'),
      sidePhoto: await upload('takeout-bag.webp', 'Yellow Sandpiper takeout bag'),
      stamp: { top: 'SEE YOU', value: '7–4', bottom: 'EVERY DAY' },
    },
  ];
}
