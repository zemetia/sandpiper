// Order page (Pencil frames "Sandpiper — Order Now" / "(Android)").
// Pickup is ordered on Toast; delivery goes through the three apps' own store pages.
const toastPickup = 'https://www.toasttab.com/local/order/sandpiper-1640-south-street';

export const orderLayout = (menu: { type: 'reference'; reference: number; label: string }) => [
  {
    blockType: 'orderHero',
    eyebrow: 'ORDER NOW · 1640 SOUTH STREET, PHILADELPHIA',
    eyebrowShort: 'ORDER NOW · 1640 SOUTH ST',
    line1: 'Hungry?',
    line2: 'Pick your way.',
    body: 'Grab it yourself fresh off the griddle, or have breakfast brought right to your door. Same food, same love.',
    toggle: { pickup: 'PICKUP', delivery: 'DELIVERY' },
    menuLink: menu,
  },
  {
    blockType: 'orderChoices',
    pickup: {
      title: 'Pickup',
      tag: 'READY IN ~15 MIN',
      body: 'Order ahead on Toast, skip the line, and grab your bag at the counter. Pay online, earn rewards.',
      steps: [
        { text: 'Build your order on Toast' },
        { text: 'Choose a pickup time' },
        { text: 'Swing by 1640 South St' },
      ],
      link: { type: 'custom', url: toastPickup, label: 'Order pickup on Toast', newTab: true },
      note: 'Opens Toast in a new tab',
    },
    delivery: {
      title: 'Delivery',
      tag: "WE'RE ON 3 APPS",
      body: "Stay in your pajamas. Pick your favorite app and we'll get breakfast on the road to you.",
      apps: [
        {
          app: 'doordash',
          name: 'DoorDash',
          description: 'Check out Sandpiper Cafe on DoorDash',
          url: 'https://www.doordash.com/store/46323691?utm_source=mx_share',
        },
        {
          app: 'ubereats',
          name: 'Uber Eats',
          description:
            'Try Sandpiper on Uber Eats. Use our code for a discount on your first order.',
          promoCode: 'eats-hn17lnqm',
          url: 'https://www.ubereats.com/store-browse-uuid/613f10bc-db73-54dc-859b-f98c474c3031',
        },
        {
          app: 'grubhub',
          name: 'Grubhub',
          description: "We think you'll like Sandpiper Cafe on Grubhub",
          url: 'https://www.grubhub.com/restaurant/sandpiper-cafe-1640-south-st-philadelphia/14958800',
        },
      ],
      note: 'Delivery fees, menu prices and hours set by each app may vary.',
    },
  },
];
