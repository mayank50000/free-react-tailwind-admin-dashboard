import { useEffect, useState, useCallback } from 'react';
import { News, NewsService } from '../../api/newsService';
import { useApi } from '../../hooks/useApi';
import NewsCard from '../../components/News/NewsCard';
import LoadingSpinner from '../../components/LoadingSpinner';


const PublicNewsFormPage = () => {
  const [visibleNewsCount, setVisibleNewsCount] = useState(20); // Initial number of news items to show
  const [isLoadingMore, setIsLoadingMore] = useState(false); // Loading state for infinite scroll
  const { data: newsItems, loading, error } = useApi<News[]>(
    NewsService.getPublicNews
  );

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 200; // Trigger 200px before bottom

    if (
      isNearBottom &&
      !isLoadingMore &&
      newsItems &&
      visibleNewsCount < newsItems.length
    ) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setVisibleNewsCount((prev) => prev + 20); // Load 20 more items
        setIsLoadingMore(false);
      }, 1000); // Simulate network delay (remove in production)
    }
  }, [isLoadingMore, newsItems, visibleNewsCount]);

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Handle "Read More" click
  const handleReadMore = (newsId: string) => {
    // Navigate to the news detail page
    console.log('Read more clicked for news ID:', newsId);
  };

  return (
    <div className="container mx-auto p-6">
      {/* News Grid */}
      <div className="grid grid-cols-1 gap-6">
        {(newsItems || [])
          .slice(0, visibleNewsCount) // Show only visible news items
          .map((news) => (
            <NewsCard
              key={news.id}
              title={news.title}
              content={news.content}
              category={news.category?.name || 'General'}
              date={news.createdAt}
              imageUrl={news.imageUrl}
              author={news.author?.name || 'Anonymous'}
              onReadMore={() => handleReadMore(news.id)}
            />
          ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <LoadingSpinner />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="col-span-full text-center py-8 text-danger">
          Error loading news: {error}
        </div>
      )}

      {/* Loading More State */}
      {isLoadingMore && (
        <div className="text-center py-8">
          <LoadingSpinner text="Loading more news..." />
        </div>
      )}

      {/* End of Content */}
      {newsItems && visibleNewsCount >= newsItems.length && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No more news to load
        </div>
      )}
    </div>
  );
};

export default PublicNewsFormPage;