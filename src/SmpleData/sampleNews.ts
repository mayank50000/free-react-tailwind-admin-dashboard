// utils/sampleNews.ts

import { News } from "../api/newsService";

export const sampleNews: News[] = Array.from({ length: 40 }, (_, index) => {
  const isGlobal = index % 4 === 0;
  const category = !isGlobal ? {
    id: `cat-${index % 2}`,
    categoryName: index % 2 === 0 ? 'Technology' : 'Politics',
    isActive: true
  } : undefined;
  
  const subCategory = category ? {
    id: `sub-${index % 3}`,
    subCategoryName: `${category.categoryName} Sub ${index % 3 + 1}`,
    isActive: true,
    category: category
  } : undefined;

  return {
    id: String(index + 1),
    title: `Breaking News #${index + 1}`,
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. This is news item #${index + 1}.`,
    isGlobal,
    category,
    subCategory,
    createdAt: new Date(Date.now() - index * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - index * 12 * 60 * 60 * 1000),
    imageUrl: `https://picsum.photos/600/400?random=${index + 1}`,
    author: { name: index % 2 === 0 ? 'John Doe' : 'Jane Smith' }
  };
});