// Menu page (Pencil frames "Sandpiper — Menu (CMS / Toast-style)" / "(Android, CMS)").
// Dishes come from the menu-items collection; this block only holds the page chrome.
export const menuLayout = () => [
  {
    blockType: 'menuBrowser',
    title: 'Menu',
    opensAt: '07:00',
    closesAt: '16:00',
    hoursLabel: '7:00 AM – 4:00 PM daily',
    address: '1640 South St, Philadelphia',
    metaShort: '7AM – 4PM · 1640 South St',
    searchPlaceholder: 'Search the menu',
    pickup: {
      link: {
        type: 'custom',
        url: 'https://www.toasttab.com/local/order/sandpiper-1640-south-street',
        label: 'PICKUP',
        newTab: true,
      },
    },
    // Custom path: the Order page is created after this one in the seed.
    delivery: { link: { type: 'custom', url: '/order', label: 'DELIVERY' } },
    categoriesLabel: 'CATEGORIES',
    showSoldOut: true,
  },
];
