// utils/sampleNews.ts
export const sampleNews = Array.from({ length: 40 }, (_, index) => ({
    id: String(index + 1),
    title: `Breaking News #${index + 1}`,
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. This is news item #${index + 1}.`,
    category: { name: index % 2 === 0 ? 'Global' : 'Local' },
    createdAt: new Date(
      Date.now() - index * 24 * 60 * 60 * 1000
    ).toISOString(), // Stagger dates by 1 day
    imageUrl: `https://picsum.photos/600/400?random=${index + 1}`, // Random images
    author: { name: index % 2 === 0 ? 'John Doe' : 'Jane Smith' },
  }));