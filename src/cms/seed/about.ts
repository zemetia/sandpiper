// About page (Pencil frame "Sandpiper — About Page").
type Upload = (
  file: string,
  alt: string,
  focal?: { focalX: number; focalY: number },
) => Promise<number>;
type PageLink = {
  type: 'reference';
  reference: number;
  label: string;
  appearance?: 'primary' | 'outline' | 'link';
};

const mailto = (label: string) => ({
  type: 'custom' as const,
  url: 'mailto:hello@sandpiper.cafe?subject=Joining%20the%20Sandpiper%20team',
  label,
});

export async function aboutLayout(
  upload: Upload,
  links: { orderOnline: PageLink; menu: PageLink },
) {
  return [
    {
      blockType: 'aboutHero',
      eyebrow: 'About us · Rittenhouse Square, Philadelphia',
      heading: 'Welcome to\n*Sandpiper*\nCafe!',
      body: 'Sandpiper Cafe is a family-owned, fast-casual breakfast and coffee shop located in the heart of Philadelphia’s Rittenhouse Square neighborhood.',
      tags: ['Family-owned', 'Fast-casual', 'All-day breakfast'],
      polaroids: [
        {
          image: await upload('interior.webp', 'Sandpiper dining room and mural'),
          caption: 'pull up a seat ✶',
        },
        {
          image: await upload('neon-sign.webp', 'Sandpiper Cafe neon sign'),
          caption: 'hi from the bird',
        },
      ],
      stamp: { top: 'FAMILY', value: 'OWNED', bottom: '& OPERATED' },
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
      blockType: 'aboutBelief',
      eyebrow: 'Our belief',
      heading: 'Built on the belief that everyone deserves\n*something better.*',
      body: 'Built on the belief that everyone deserves something better, we take pride in serving delicious American-style breakfast and lunch, with all-day breakfast and brunch favorites made fresh to order and prepared just the way you like them.',
      note: 'just the way you like them ↓',
      plates: [
        {
          image: await upload('classic-breakfast.webp', 'Classic Breakfast'),
          name: 'Classic Breakfast',
          tag: 'BREAKFAST',
        },
        {
          image: await upload('buttermilk-pancakes.webp', 'Buttermilk Pancakes'),
          name: 'Buttermilk Pancakes',
          tag: 'ALL DAY',
        },
        { image: await upload('the-bec.webp', 'The BEC'), name: 'The BEC', tag: 'SANDWICH' },
        {
          image: await upload('veggie-hash.webp', 'Veggie hash with fried eggs'),
          name: 'Veggie Hash',
          tag: 'BRUNCH',
        },
      ],
    },
    {
      blockType: 'aboutKitchen',
      eyebrow: 'From the kitchen & the bar',
      heading: 'Prepared with care,\n*plate by plate.*',
      body: 'From our freshly made breakfast sandwiches and hearty breakfast platters to our freshly brewed Lavazza coffee and handcrafted espresso drinks, everything is prepared with care to make your experience a little more special.',
      pillars: [
        {
          title: 'Breakfast sandwiches',
          description: 'Freshly made, stacked high, wrapped warm.',
          icon: 'sandwich',
        },
        {
          title: 'Hearty platters',
          description: 'Eggs, home fries, pancakes — the works.',
          icon: 'utensils',
        },
        {
          title: 'Lavazza & espresso',
          description: 'Freshly brewed and handcrafted at the bar.',
          icon: 'coffee',
        },
      ],
      photos: {
        main: await upload('hot-coffee.webp', 'Hot Coffee'),
        round: await upload('hammisphere.webp', 'Hammisphere'),
        small: await upload('brown-sugar-latte.webp', 'Iced brown sugar latte in a Sandpiper cup'),
      },
      stamp: { top: 'PROUDLY', value: 'Lavazza', bottom: 'POURING' },
    },
    {
      blockType: 'aboutGallery',
      eyebrow: 'Gallery',
      heading: 'A little look inside.',
      note: 'snapshots from our corner ✶',
      photos: [
        {
          image: await upload('mural-closeup.webp', 'Close-up of the hand-drawn food mural', {
            focalX: 50,
            focalY: 45,
          }),
          caption: 'Mural close-up',
        },
        {
          image: await upload('lattes-window.webp', 'Two iced lattes by the South Street window'),
          caption: 'Lattes by the window',
        },
        { image: await upload('neon-sign.webp', 'Sandpiper Cafe neon sign'), caption: 'Neon sign' },
        {
          image: await upload('blueberry-matcha.webp', 'Blueberry matcha in a Sandpiper cup'),
          caption: 'Blueberry matcha',
        },
        {
          image: await upload('burrito-latte.webp', 'Breakfast burrito with a latte'),
          caption: 'Burrito & latte',
        },
        {
          image: await upload('takeout-bag.webp', 'Yellow Sandpiper takeout bag'),
          caption: 'Takeout bag',
        },
        {
          image: await upload('bagel-sandwich.webp', 'Egg and cheese bagel sandwich'),
          caption: 'Bagel sandwich',
        },
      ],
    },
    {
      blockType: 'aboutTeam',
      eyebrow: 'Our team',
      heading: 'The family behind the counter.',
      body: 'Family-owned means you’ll see familiar faces every morning — the people cooking your eggs, pulling your espresso, and remembering your order.',
      // Placeholder names until the team's own photos and names are added in the admin.
      members: [
        { name: 'Owner Name', role: 'Owner & Founder', tone: 'blue', note: 'the reason we exist' },
        {
          name: 'Owner Name',
          role: 'Co-owner · Kitchen',
          tone: 'berry',
          note: 'breakfast platter boss',
        },
        { name: 'Team Member', role: 'Head Barista', tone: 'blue', note: 'latte art on demand' },
        { name: 'Team Member', role: 'Front of House', tone: 'berry', note: 'knows your usual' },
      ],
      hiring: {
        heading: 'Want to join the family?',
        body: 'We’re always looking for warm, hardworking people who love good food & coffee.',
        enableLink: true,
        link: mailto('Apply now'),
      },
    },
    {
      blockType: 'aboutClosing',
      body: 'Whether you’re starting your morning, grabbing a quick bite, enjoying a relaxing brunch, or simply stopping by for a great cup of coffee, we’re here to make your day a little better.',
      heading: 'Good food, great coffee,\nand a warm welcome —\n*that’s Sandpiper Cafe.*',
      links: [{ link: links.orderOnline }, { link: links.menu }],
      note: 'see you on South St ✶',
    },
  ];
}
