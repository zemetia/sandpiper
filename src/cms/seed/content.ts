type LexicalText = {
  type: 'text';
  text: string;
  format: number;
  version: 1;
  detail: 0;
  mode: 'normal';
  style: '';
};

const text = (value: string, bold = false): LexicalText => ({
  type: 'text',
  text: value,
  format: bold ? 1 : 0,
  version: 1,
  detail: 0,
  mode: 'normal',
  style: '',
});

const block = (type: 'paragraph' | 'heading', children: LexicalText[], tag?: 'h2' | 'h3') => ({
  type,
  ...(tag ? { tag } : {}),
  children,
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  version: 1,
  textFormat: 0,
});

/** Minimal Lexical document — `## ` prefix makes a heading. */
export const richText = (...lines: string[]) => ({
  root: {
    type: 'root',
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
    children: lines.map((line) =>
      line.startsWith('## ')
        ? block('heading', [text(line.slice(3))], 'h2')
        : block('paragraph', [text(line)]),
    ),
  },
});

/** Mirrors the Toast online-ordering menu (toasttab.com/local/order/sandpiper-1640-south-street). */
export const categories = [
  {
    slug: 'breakfast',
    name: 'Breakfast',
    id: 'Sarapan',
    description: 'Eggs, omelettes, hashes and griddle favorites, from 7am.',
    image: 'buttermilk-pancakes.webp',
  },
  {
    slug: 'breakfast-sandwiches',
    name: 'Breakfast Sandwiches & Burritos',
    id: 'Sandwich & burrito sarapan',
    description: 'Egg sandwiches, bagels, croissants and burritos.',
    image: 'the-bec.webp',
  },
  {
    slug: 'sandwiches',
    name: 'Paninis & Sandwiches',
    id: 'Panini & sandwich',
    description: 'Pressed paninis and lunch stackers.',
    image: 'turkey-shorty.webp',
  },
  {
    slug: 'wraps',
    name: 'Wraps & Quesadillas',
    id: 'Wrap & quesadilla',
    description: 'Grilled chicken, rolled up or pressed.',
  },
  { slug: 'salads', name: 'Salads', id: 'Salad', description: 'Build your own bowl.' },
  { slug: 'sides', name: 'Sides', id: 'Lauk tambahan', description: 'Round out the plate.' },
  {
    slug: 'coffee',
    name: 'Coffee & Tea',
    id: 'Kopi & teh',
    description: 'Proudly pouring Lavazza.',
    image: 'cold-brew.webp',
  },
  {
    slug: 'specialty',
    name: 'Specialty Drinks',
    id: 'Minuman spesial',
    description: 'Lattes with a little something extra.',
  },
  { slug: 'matcha', name: 'Matcha', id: 'Matcha', description: 'Whisked matcha, hot or iced.' },
  {
    slug: 'refreshers',
    name: 'Refreshing Sips',
    id: 'Minuman segar',
    description: 'Iced tea, juices and lemonades.',
  },
  {
    slug: 'smoothies',
    name: 'Smoothies',
    id: 'Smoothie',
    description: '24 oz, blended to order with real fruit.',
    image: 'very-berry.webp',
  },
  {
    slug: 'bottles',
    name: 'Bottles & Cans',
    id: 'Botol & kaleng',
    description: 'Grab and go.',
  },
  { slug: 'merch', name: 'Merch', id: 'Merchandise', description: 'Take a little Sandpiper home.' },
] as const;

type SeedCategory = (typeof categories)[number];

export type SeedItem = {
  category: SeedCategory['slug'];
  name: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  variants?: { label: string; price: number }[];
  tags?: string[];
  featured?: boolean;
  /** Pink label next to the price on the menu page. */
  badge?: string;
  availability?: 'available' | 'soldOut' | 'seasonal';
  /** File name in ./images */
  image?: string;
};

export const menuItems: SeedItem[] = [
  {
    category: 'breakfast',
    name: 'Classic Breakfast',
    badge: 'FAVE',
    description: 'Two eggs your way with choice of meat and side',
    price: 13,
    tags: ['signature'],
    image: 'classic-breakfast.webp',
  },
  {
    category: 'breakfast',
    name: 'Grilled Salmon',
    description: 'Grilled salmon served with two eggs and homefries',
    price: 17,
  },
  {
    category: 'breakfast',
    name: 'Classic Omelette',
    description:
      'Build your own omelette with three eggs and choice of toppings. Served with homefries',
    price: 13,
  },
  {
    category: 'breakfast',
    name: 'Western Omelette',
    description: 'Smoked ham, bell pepper, onion, cheddar jack cheese. Served with homefries',
    price: 16,
  },
  {
    category: 'breakfast',
    name: 'Spinach & Mushroom Omelette',
    description:
      'Spinach, mushroom, onions, bell pepper, tomato, avocado, cheddar jack cheese. Served with homefries',
    price: 16,
  },
  {
    category: 'breakfast',
    name: 'Cheesesteak Omelette',
    description:
      'Sliced ribeye, mushroom, bell pepper, onion, tomato, cheddar jack cheese. Served with homefries',
    price: 17,
  },
  {
    category: 'breakfast',
    name: 'Bacon Hash',
    description:
      'Homefries, bacon, spinach, onion, bell pepper, cheese, avocado, two eggs, chipotle mayo',
    price: 15,
  },
  {
    category: 'breakfast',
    name: 'Veggie Hash',
    description:
      'Homefries, spinach, mushroom, bell pepper, onion, avocado, two eggs, arugula, spicy mayo',
    price: 15,
    tags: ['vegetarian'],
  },
  {
    category: 'breakfast',
    name: 'Truffle Avocado Toast',
    description:
      'Seasoned smashed avocado, squeeze lemon juice, truffle oil, cherry tomatoes, red chili pepper flakes, feta cheese, egg on toasted sourdough',
    price: 13,
    tags: ['vegetarian'],
  },
  {
    category: 'breakfast',
    name: 'Oatmeal',
    description:
      'Freshly made by order. Oatmeal with milk and banana topped with almond and fresh berries',
    price: 10,
    tags: ['vegetarian', 'nuts'],
    image: 'oatmeal.webp',
  },
  {
    category: 'breakfast',
    name: 'Yogurt Parfait',
    description:
      'Freshly made by order. Build your own parfait with vanilla yogurt and choice of toppings',
    price: 8,
    tags: ['vegetarian'],
  },
  {
    category: 'breakfast',
    name: 'Overnight Oats',
    description: 'Rolled oats, chia seeds, oat milk, with choice of toppings',
    price: 8,
    tags: ['vegan'],
  },
  {
    category: 'breakfast',
    name: 'Grilled Muffin with Butter',
    price: 6,
    image: 'grilled-muffin-with-butter.webp',
  },
  {
    category: 'breakfast',
    name: 'Creamed Chipped Beef on Waffles',
    badge: 'LOCAL',
    description:
      'a savory comfort breakfast pairing salty dried beef in a creamy white gravy with crispy waffles',
    price: 14,
    image: 'creamed-chipped-beef-on-waffles.webp',
  },
  {
    category: 'breakfast',
    name: 'Waffle',
    description: 'waffle lightly dusted with powdered sugar. served with butter and syrup',
    price: 8,
    tags: ['vegetarian'],
    image: 'waffle.webp',
  },
  {
    category: 'breakfast',
    name: 'Buttermilk Pancakes',
    description:
      'Two Buttermilk pancake served with butter, lightly dusted with powdered sugar, and pancake syrup',
    price: 8,
    tags: ['vegetarian'],
    featured: true,
    image: 'buttermilk-pancakes.webp',
  },
  {
    category: 'breakfast-sandwiches',
    name: 'Eggs & Cheese Sandwich',
    description: 'Build your own breakfast sandwich with two eggs and cheese',
    price: 8,
    tags: ['vegetarian'],
    image: 'eggs-and-cheese-sandwich.webp',
  },
  {
    category: 'breakfast-sandwiches',
    name: 'Meat Eggs & Cheese',
    description: 'Build your own breakfast sandwich with two eggs, choice of meat and cheese',
    price: 11,
    image: 'meat-eggs-and-cheese.webp',
  },
  {
    category: 'breakfast-sandwiches',
    name: 'Cheesesteak Burrito',
    description: 'Sliced ribeye, scrambled eggs, mushroom, bell pepper, onion, cheese',
    price: 15,
  },
  {
    category: 'breakfast-sandwiches',
    name: 'Breakfast Burrito',
    description:
      'Scramble eggs, choice of meat, avocado, black bean, hash brown, cheese, chipotle mayo',
    price: 14,
  },
  {
    category: 'breakfast-sandwiches',
    name: 'Veggie Burrito',
    description:
      'Sauteed tomato, onion, mushroom, spinach, avocado, scrambled eggs, hashbrown, spicy mayo, cheese',
    price: 14,
    tags: ['vegetarian'],
  },
  {
    category: 'breakfast-sandwiches',
    name: 'Waikiki Delight',
    description:
      'Fried egg, spam, pork bacon, grilled pineapple, jalapeno, american cheese, spicy mayo',
    price: 11,
    tags: ['spicy'],
  },
  {
    category: 'breakfast-sandwiches',
    name: 'The Verde',
    description: 'Basil pesto, scrambled eggs, fresh mozzarella, arugula',
    price: 11,
  },
  {
    category: 'breakfast-sandwiches',
    name: 'The BEC',
    badge: 'FAVE',
    description: 'Bacon, two fried eggs, hash brown, chipotle gouda cheese, chipotle mayo',
    price: 11,
    featured: true,
    image: 'the-bec.webp',
  },
  {
    category: 'breakfast-sandwiches',
    name: 'The Diablo',
    description: 'Two fried eggs, chorizo sausage, Hash brown, pepper jack cheese, jalapeno aioli',
    price: 11,
    tags: ['spicy'],
  },
  {
    category: 'breakfast-sandwiches',
    name: 'Jersey Roll',
    description:
      'Fried egg, pork roll, american cheese, grilled onion and bell pepper on kaiser roll',
    price: 11,
    image: 'jersey-roll.webp',
  },
  {
    category: 'breakfast-sandwiches',
    name: 'Breakfast BLT',
    description: 'Two fried eggs, bacon, lettuce, tomato, avocado, spicy mayo',
    price: 11,
  },
  {
    category: 'breakfast-sandwiches',
    name: 'Hammisphere',
    description: 'Smoke ham, cheddar cheese, scrambled eggs on croissant',
    price: 11,
    image: 'hammisphere.webp',
  },
  {
    category: 'breakfast-sandwiches',
    name: 'Milano Sunrise',
    badge: 'NEW',
    description:
      'Breakfast panini with prosciutto, two fried eggs, avocado, fresh mozzarella, basil pesto, arugula',
    price: 13,
    image: 'milano-sunrise.webp',
  },
  {
    category: 'breakfast-sandwiches',
    name: 'Pastrami Egg & Cheese',
    description: 'Pastrami, scrambled eggs, american cheese',
    price: 14,
    image: 'pastrami-egg-and-cheese.webp',
  },
  {
    category: 'breakfast-sandwiches',
    name: 'Lox Bagel',
    description:
      'Nova lox, cream cheese, tomato, red onion, capers, served on choice of toasted bagel',
    price: 14,
    featured: true,
    image: 'lox-bagel.webp',
  },
  {
    category: 'sandwiches',
    name: 'Cali BLT',
    description: 'Bacon, lettuce, tomato, avocado, mayo',
    price: 11,
  },
  {
    category: 'sandwiches',
    name: 'The Thanksgiving',
    badge: 'FAVE',
    description: 'Roasted turkey, mayo, cranberry sauce, arugula, provolone, fuji apple',
    price: 12,
    image: 'the-thanksgiving.webp',
  },
  {
    category: 'sandwiches',
    name: 'Chipotle Chicken',
    description:
      'Grilled chicken, chipotle gouda cheese, avocado, red onion, bell peppers, chipotle mayo',
    price: 12,
  },
  {
    category: 'sandwiches',
    name: 'Turkey Shorty',
    description: 'Roasted turkey, bacon, lettuce, tomato, creamy pesto',
    price: 12,
    featured: true,
    image: 'turkey-shorty.webp',
  },
  {
    category: 'sandwiches',
    name: 'Tuna Melt',
    description: 'Tuna salad, tomato, american cheese, avocado',
    price: 12,
  },
  {
    category: 'sandwiches',
    name: 'Classic Chicken',
    description: 'Grilled chicken, bacon, romaine, tomato, avocado, honey mustard',
    price: 12,
  },
  {
    category: 'sandwiches',
    name: 'Chicken Pesto',
    description: 'Grilled chicken, fresh mozzarella, roasted pepper, basil pesto',
    price: 12,
  },
  {
    category: 'sandwiches',
    name: 'Blazing Chicken',
    badge: 'HOT',
    description:
      'Spicy blackened chicken sandwich with grilled blackened chicken, bacon, cheddar cheese, avocado, spinach, spicy chipotle mayo',
    price: 12,
    tags: ['spicy'],
    image: 'blazing-chicken.webp',
  },
  {
    category: 'wraps',
    name: 'Chipotle Chicken Wrap',
    description: 'Grilled chicken, bacon, romaine, tomato, avocado, chipotle mayo',
    price: 13,
  },
  {
    category: 'wraps',
    name: 'Chicken Caesar Wrap',
    description: 'Grilled chicken, crouton, romaine, parmesan cheese, creamy caesar dressing',
    price: 13,
    image: 'chicken-caesar-wrap.webp',
  },
  {
    category: 'wraps',
    name: 'Chicken Quesadilla',
    description: 'Grilled chicken, bell peppers, onion, cheese',
    price: 15,
    image: 'chicken-quesadilla.webp',
  },
  { category: 'salads', name: 'Build Your Own Salad', price: 12 },
  { category: 'sides', name: 'Breads & Bagels', price: 2.5, image: 'breads-and-bagels.webp' },
  {
    category: 'sides',
    name: 'Hash Brown',
    description: 'Two pieces of hash brown',
    price: 5,
    image: 'hash-brown.webp',
  },
  { category: 'sides', name: 'Home Fries', price: 5, image: 'home-fries.webp' },
  { category: 'sides', name: 'Two Eggs', price: 5, image: 'two-eggs.webp' },
  { category: 'sides', name: 'Side of Meat', price: 5 },
  { category: 'sides', name: 'French Fries', price: 5, image: 'french-fries.webp' },
  { category: 'sides', name: 'Side Salad', price: 5 },
  { category: 'sides', name: 'Watermelon', price: 5, image: 'watermelon.webp' },
  { category: 'sides', name: 'Side Sauce', price: 2 },
  {
    category: 'merch',
    name: 'Sandpiper Tote Bag',
    price: 5,
    badge: 'NEW',
    image: 'sandpiper-tote-bag.webp',
  },
  { category: 'coffee', name: 'Hot Tea', price: 3 },
  {
    category: 'coffee',
    name: 'Hot Coffee',
    description: 'Freshly brewed Lavazza Coffee',
    price: 3.5,
    image: 'hot-coffee.webp',
  },
  { category: 'coffee', name: 'Cold Brew', price: 4.5, featured: true, image: 'cold-brew.webp' },
  {
    category: 'coffee',
    name: 'Vietnamese Iced Coffee',
    price: 5.5,
    image: 'vietnamese-iced-coffee.webp',
  },
  { category: 'coffee', name: 'Americano', price: 3.75 },
  { category: 'coffee', name: 'Red Eye', price: 4.75 },
  { category: 'coffee', name: 'Double Espresso', price: 3 },
  {
    category: 'coffee',
    name: 'Cortado',
    description: 'Equal parts espresso and steamed milk',
    price: 4,
  },
  { category: 'coffee', name: 'Latte', price: 5 },
  { category: 'coffee', name: 'Cappuccino', price: 4.75 },
  { category: 'specialty', name: 'Pumpkin Spice Latte', price: 5.5, availability: 'seasonal' },
  { category: 'specialty', name: 'Brown Sugar Espresso Latte', price: 5.5 },
  { category: 'specialty', name: 'Caramel Macchiato', price: 5.5 },
  { category: 'specialty', name: 'Nutella Latte', price: 5.5, tags: ['nuts'] },
  {
    category: 'specialty',
    name: 'Skippy Latte',
    description: 'Latte with creamy peanut butter & hazelnut syrup',
    price: 5.5,
    tags: ['nuts'],
  },
  {
    category: 'specialty',
    name: 'Biscoff Latte',
    description: 'Latte with cookie butter',
    price: 6,
  },
  { category: 'specialty', name: 'Mocha', price: 5.5 },
  { category: 'specialty', name: 'Pistachio Latte', price: 5.5, tags: ['nuts'] },
  { category: 'specialty', name: 'Dulce De Leche', price: 5.5 },
  { category: 'specialty', name: 'Dirty Chai Latte', price: 6 },
  { category: 'specialty', name: 'Chai Latte', price: 5 },
  { category: 'specialty', name: 'Hot Chocolate', price: 5 },
  { category: 'matcha', name: 'Matcha Latte', price: 5.5 },
  {
    category: 'matcha',
    name: 'Matcha Brown Sugar',
    description: 'Matcha latte with brown sugar syrup',
    price: 6,
  },
  { category: 'matcha', name: 'Blueberry Matcha', price: 6.5 },
  { category: 'matcha', name: 'Strawberry Matcha', price: 6.5 },
  { category: 'matcha', name: 'Mango Matcha', price: 6.5 },
  {
    category: 'refreshers',
    name: 'Iced Tea',
    description: 'Fresh brewed iced tea',
    price: 4,
    image: 'iced-tea.webp',
  },
  { category: 'refreshers', name: 'Mango Juice', price: 4, image: 'mango-juice.webp' },
  { category: 'refreshers', name: 'Lemonade', price: 4, image: 'lemonade.webp' },
  { category: 'refreshers', name: 'Arnold Palmer', price: 4 },
  { category: 'refreshers', name: 'Mango Lemonade', price: 5 },
  { category: 'refreshers', name: 'Strawberry Lemonade', price: 5 },
  {
    category: 'refreshers',
    name: 'Lavender Lemonade',
    description: 'Lemonade with lavender syrup',
    price: 5,
  },
  { category: 'refreshers', name: 'Watermelon Lemonade', price: 5 },
  { category: 'refreshers', name: 'Blueberry Lemonade', price: 5 },
  {
    category: 'smoothies',
    name: 'CYO Smoothie',
    badge: 'DIY',
    description: 'Create your own smoothie',
    price: 9,
    image: 'cyo-smoothie.webp',
  },
  {
    category: 'smoothies',
    name: 'Go Birds',
    badge: 'FAVE',
    description: 'Spinach, apple, pineapple, cucumber, banana, lemon, coconut',
    price: 9.5,
    tags: ['vegan'],
    image: 'go-birds.webp',
  },
  {
    category: 'smoothies',
    name: 'Tropical Blast',
    description: 'Strawberry, mango, pineapple, orange juice',
    price: 9.5,
    tags: ['vegan'],
    image: 'tropical-blast.webp',
  },
  {
    category: 'smoothies',
    name: 'Chai Chiller',
    description: 'Chai, ginger, dates, banana, rolled oat, almond milk',
    price: 10,
    tags: ['vegan', 'nuts'],
    image: 'chai-chiller.webp',
  },
  {
    category: 'smoothies',
    name: 'Chunky Monkey',
    description: 'Rolled oat, salt, honey, cocoa powder, banana, peanut butter, oat milk',
    price: 10,
    tags: ['nuts'],
    image: 'chunky-monkey.webp',
  },
  {
    category: 'smoothies',
    name: 'Very Berry',
    description: 'Blueberry, strawberry, banana, honey',
    price: 9.5,
    featured: true,
    image: 'very-berry.webp',
  },
  {
    category: 'smoothies',
    name: 'Strawberry Banana',
    description: 'Strawberry, banana, vanilla yogurt, whole milk',
    price: 9,
    image: 'strawberry-banana.webp',
  },
  {
    category: 'smoothies',
    name: 'Green Day',
    description: 'Banana, spinach, avocado, almond milk, coconut, chia seeds',
    price: 10,
    tags: ['vegan', 'nuts'],
    featured: true,
    image: 'green-day.webp',
  },
  {
    category: 'smoothies',
    name: 'Berry Bliss',
    description: 'Blueberry, rolled oat, banana, honey, chia seeds, oat milk',
    price: 10,
    image: 'berry-bliss.webp',
  },
  {
    category: 'smoothies',
    name: 'Tropi Colada',
    description: 'Pineapple, banana, dates, vanilla yogurt, coconut milk',
    price: 10,
    image: 'tropi-colada.webp',
  },
  {
    category: 'bottles',
    name: "Natalie's Fresh Orange Juice",
    price: 4.5,
    image: 'natalies-orange-juice.webp',
  },
  { category: 'bottles', name: 'Spring Water', price: 2 },
  { category: 'bottles', name: 'San Pellegrino Sparkling Water', price: 3 },
  { category: 'bottles', name: 'Canned Soda', price: 2 },
];

/** Site photos for the media library; the landing page seed references them by key. */
export const sitePhotos = {
  polaroid: { file: 'cafe-mural-cups.webp', alt: 'Sandpiper cups in front of the food mural' },
  mural: {
    file: 'mural.webp',
    alt: 'Hand-drawn food mural inside Sandpiper',
    focalX: 57,
    focalY: 61,
  },
  pancakeGuy: { file: 'mural-pancake-guy.webp', alt: 'Mural detail: the pancake guy' },
  lavazzaCups: { file: 'mural-lavazza-cups.webp', alt: 'Mural detail: a Lavazza cup' },
  neonBird: { file: 'neon-bird.webp', alt: 'Blue neon sandpiper bird sign' },
  interior: { file: 'interior.webp', alt: 'Sandpiper dining room and mural' },
  neonSign: { file: 'neon-sign.webp', alt: 'Sandpiper Cafe neon sign' },
  lattes: { file: 'lattes-window.webp', alt: 'Two iced lattes by the South Street window' },
  takeout: { file: 'takeout-bag.webp', alt: 'Yellow Sandpiper takeout bag' },
  burrito: { file: 'burrito-latte.webp', alt: 'Breakfast burrito with a latte' },
} as const;

export type SitePhoto = keyof typeof sitePhotos;
