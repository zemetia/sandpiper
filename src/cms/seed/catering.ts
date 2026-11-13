/** Starter layout for /catering, matching the "Sandpiper — Catering" Pencil frames. */
export async function cateringLayout(upload: (file: string, alt: string) => Promise<number>) {
  const anchor = (id: string, label: string, appearance: 'primary' | 'outline') => ({
    link: { type: 'custom' as const, url: `#${id}`, label, newTab: false, appearance },
  });

  return [
    {
      blockType: 'cateringHero',
      eyebrow: 'CATERING · SOUTH PHILLY',
      heading: 'FEED THE\nWHOLE CREW.',
      body: 'Breakfast meetings, office lunches and weekend parties. We box up the sandwiches, stack the pancakes and pour the Lavazza, so you just show up hungry.',
      links: [
        anchor('quote', 'Request a quote', 'primary'),
        anchor('menu', 'See catering menu', 'outline'),
      ],
      facts: [
        { icon: 'timer', value: '48 HRS', label: 'notice' },
        { icon: 'users', value: '10+', label: 'people minimum' },
        { icon: 'truck', value: 'PICKUP', label: 'or local delivery' },
      ],
      photos: {
        main: await upload(
          'classic-breakfast.webp',
          'Classic breakfast: bacon, home fries and eggs',
        ),
        side: await upload('the-bec.webp', 'The BEC sandwich'),
        small: await upload('hot-coffee.webp', 'Hot Lavazza coffee'),
      },
      stamp: { label: 'TRAYS SERVE', value: '10+' },
      note: 'boxed up by 8am',
    },
    {
      blockType: 'cateringRibbon',
      words: [
        'BREAKFAST TRAYS',
        'SANDWICH PLATTERS',
        'BAGEL SPREADS',
        'LAVAZZA BOXES',
        'SMOOTHIE CUPS',
      ],
    },
    {
      blockType: 'cateringMenu',
      blockName: 'Menu',
      eyebrow: 'THE CATERING MENU',
      heading: 'PICK YOUR SPREAD',
      intro:
        "Trays serve about 10. Mix and match, and we'll tailor it to your headcount and budget.",
      categories: [
        {
          title: 'Breakfast Trays',
          shortLabel: 'Breakfast',
          image: await upload('the-bec.webp', 'The BEC sandwich'),
          items: [
            {
              name: 'The BEC Tray',
              price: '$120',
              description: '10 bacon, egg & cheese sandwiches',
            },
            {
              name: 'Jersey Roll Tray',
              price: '$120',
              description: 'pork roll, egg & cheese on kaiser, 10',
            },
            { name: 'Pancake Tray', price: '$60', description: 'buttermilk stack, butter & maple' },
            { name: 'Home Fries Tray', price: '$40', description: 'crispy, seasoned, serves 10' },
            {
              name: 'Classic Breakfast Box',
              price: '$14 pp',
              description: 'eggs, bacon, home fries, toast',
            },
          ],
        },
        {
          title: 'Lunch Platters',
          shortLabel: 'Lunch',
          image: await upload('hammisphere.webp', 'Hammisphere croissant sandwich'),
          items: [
            {
              name: 'Sandwich Platter',
              price: '$140',
              description: 'Turkey Shorty, The Thanksgiving, Chipotle Chicken, 10',
            },
            {
              name: 'Wrap Platter',
              price: '$130',
              description: 'chicken caesar & chipotle chicken wraps, 10',
            },
            {
              name: 'Quesadilla Tray',
              price: '$110',
              description: 'chicken quesadillas, salsa & sour cream',
            },
            { name: 'Boxed Lunch', price: '$15 pp', description: 'sandwich, chips & a cookie' },
          ],
        },
        {
          title: 'Bagels & Bakery',
          image: await upload('breads-and-bagels.webp', 'A pile of fresh bagels'),
          items: [
            { name: 'Bagel Tray', price: '$55', description: '12 bagels + 2 schmears' },
            {
              name: 'Lox Platter',
              price: '$95',
              description: 'bagels, lox, capers, onion, schmear',
            },
            {
              name: 'Muffin & Pastry Tray',
              price: '$45',
              description: 'grilled muffins & pastries, serves 10',
            },
          ],
        },
        {
          title: 'Coffee & Drinks',
          shortLabel: 'Drinks',
          image: await upload('hot-coffee.webp', 'Hot Lavazza coffee'),
          items: [
            {
              name: 'Lavazza Coffee Box',
              price: '$40',
              description: '96 oz, cups & fixings, serves 8–10',
            },
            { name: 'Cold Brew Box', price: '$45', description: '96 oz, ice & cups included' },
            { name: "Natalie's OJ", price: '$25', description: 'fresh-squeezed, half gallon' },
            { name: 'Smoothie Cups', price: '$75', description: '10 × 16 oz, mix your flavors' },
          ],
        },
      ],
      note: 'Vegetarian & gluten-free swaps available on most trays. Prices before tax & delivery.',
    },
    {
      blockType: 'cateringUseCases',
      headingBold: 'MADE FOR',
      headingLight: 'the whole neighborhood.',
      script: 'from Bella Vista\nto Center City ✶',
      cases: [
        {
          icon: 'briefcase',
          title: 'Office Breakfasts',
          body: 'Bagels, BECs and a box of Lavazza waiting before the 9am standup.',
        },
        {
          icon: 'users',
          title: 'Team Lunches',
          body: 'Sandwich platters and boxed lunches, labeled and ready to grab.',
        },
        {
          icon: 'party',
          title: 'Parties & Showers',
          body: 'Birthdays, showers and game days. Pancake trays are always a hit.',
        },
        {
          icon: 'graduation',
          title: 'Campus & Community',
          body: 'Student orgs, school events and block parties around South Philly.',
        },
      ],
    },
    {
      blockType: 'cateringSteps',
      eyebrow: 'HOW IT WORKS',
      heading: 'Three steps to a full table.',
      steps: [
        {
          title: 'Tell us the plan',
          body: 'Date, headcount and what your crew likes. Give us 48 hours notice for 10 people or more.',
        },
        {
          title: 'We build your menu',
          body: 'We send back a custom spread and quote that fits your budget, usually within a few hours.',
        },
        {
          title: 'Pickup or delivery',
          body: 'Grab it at 1640 South St or we bring it to you, hot, fresh and ready to serve.',
        },
      ],
    },
    {
      blockType: 'cateringQuote',
      blockName: 'Quote',
      eyebrow: "LET'S PLAN IT",
      heading: 'GET A\nCATERING QUOTE',
      body: "Tell us a little about your event and we'll get back to you with a menu and price, usually the same day.",
      callLabel: 'Call or text',
      phone: '267-858-6183',
      callPrompt: 'Rather talk?',
      pickupLabel: 'Pickup at',
      pickupAddress: '1640 South St',
      formTitle: 'Catering request',
      occasions: ['Office breakfast', 'Team lunch', 'Party', 'Other'],
      submitLabel: 'Send my request',
      finePrint: 'We reply within a few hours, 7am – 4pm daily.',
      successHeading: 'Request received!',
      successBody: "Thanks — we'll get back to you with a menu and quote within a few hours.",
      faqHeading: 'Good to know',
      faqs: [
        {
          question: 'How much notice do you need?',
          answer: '48 hours for most orders. Big events (50+), give us a week.',
        },
        {
          question: 'Is there a minimum?',
          answer: 'Trays start at 10 people. Smaller group? Call us and we will make it work.',
        },
        {
          question: 'Do you deliver?',
          answer:
            'Yes, around South Philly and Center City for a small fee. Pickup at 1640 South St is always free.',
        },
        {
          question: 'Dietary needs?',
          answer:
            'Vegetarian and gluten-free swaps are available on most trays. Tell us about allergies in the form.',
        },
      ],
    },
  ];
}
