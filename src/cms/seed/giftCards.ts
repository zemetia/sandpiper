// Gift Cards page (Pencil frames "Sandpiper — Gift Cards (Desktop)" / "(Android)").
// Cards are sold and redeemed through Toast, so every CTA links out to it.
const toast = {
  buy: 'https://order.toasttab.com/egiftcards/sandpiper-1640-south-street',
  balance: 'https://www.toasttab.com/sandpiper-1640-south-street/findcard',
};

const toastLink = (url: string, label: string) => ({
  type: 'custom' as const,
  url,
  label,
  newTab: true,
});

export const giftCardLayout = [
  {
    blockType: 'giftCardHero',
    eyebrow: 'SANDPIPER eGIFT CARDS',
    line1: 'GIVE THEM',
    line2: 'BREAKFAST.',
    body: 'Pancakes, pork roll and a Lavazza latte on us. Send a Sandpiper eGift Card by email in a minute, good at 1640 South St.',
    amounts: [
      { value: '$25' },
      { value: '$50', selected: true },
      { value: '$75' },
      { value: '$100' },
    ],
    anyAmount: 'or any amount',
    buyLink: toastLink(toast.buy, 'BUY AN eGIFT CARD'),
    balanceLink: toastLink(toast.balance, 'CHECK BALANCE'),
    card: { label: 'eGIFT CARD', address: '1640 SOUTH ST', backAmount: '$100' },
    tag: { label: 'DELIVERED BY', value: 'email, instantly' },
  },
  {
    blockType: 'giftCardSteps',
    eyebrow: 'HOW IT WORKS',
    heading: 'Easy as a\nshort stack.',
    note: 'takes about a minute ✶',
    steps: [
      {
        icon: 'card',
        title: 'Pick an amount',
        description: 'Choose $25, $50, $100 or type your own, then pay securely through Toast.',
      },
      {
        icon: 'mail',
        title: 'Send it by email',
        description:
          'It goes straight to their inbox with your note. Send it to yourself to print it out.',
      },
      {
        icon: 'coffee',
        title: 'Redeem at Sandpiper',
        description: 'Show the card at the counter on South St, or use it when you order online.',
      },
    ],
  },
  {
    blockType: 'giftCardPanels',
    panels: [
      {
        tone: 'sunny',
        icon: 'gift',
        eyebrow: 'FOR SOMEONE ELSE',
        heading: 'Buy an eGift Card',
        body: 'Pick an amount, add a note and send it. Perfect for birthdays, thank-yous and the coworker who covers your shift.',
        link: toastLink(toast.buy, 'BUY ON TOAST'),
        note: 'Opens Toast in a new tab',
      },
      {
        tone: 'paper',
        icon: 'search',
        eyebrow: 'ALREADY HAVE ONE?',
        heading: 'Check your balance',
        body: "Pop in your card number to see what's left before your next breakfast run.",
        link: toastLink(toast.balance, 'CHECK BALANCE'),
        note: 'Opens Toast in a new tab',
      },
    ],
  },
  {
    blockType: 'giftCardFaq',
    heading: 'Good\nto know.',
    items: [
      {
        question: 'Where can I use it?',
        answer: 'At Sandpiper Cafe, 1640 South St, at the counter or when you order online.',
      },
      {
        question: "Didn't get the email?",
        answer:
          "Check your spam folder first, then call us at 267-858-6183 and we'll help track it down.",
      },
      {
        question: 'Who handles payments?',
        answer: 'Gift cards are sold and managed securely by Toast, our ordering partner.',
      },
    ],
  },
];
