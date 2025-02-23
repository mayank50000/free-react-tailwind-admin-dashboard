// pages/PublicNewsFormPage.tsx
import { useEffect, useState, useCallback } from 'react';
import { News, NewsService } from '../../api/newsService';
import { useApi } from '../../hooks/useApi';
import NewsCard from '../../components/News/NewsCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { sampleNews } from '../../SmpleData/sampleNews';


const PublicNewsFormPage = () => {
  const [visibleNewsCount, setVisibleNewsCount] = useState(20);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  // const { data: newsItems, loading, error } = useApi<News[]>(
  //    NewsService.getSamplePublicNews
  // );

  // Initialize useApi without passing the API function upfront
  const { data: newsItems, loading, error, execute } = useApi<News[]>();

  // Fetch data on mount
  useEffect(() => {
    // Execute the API call
    execute(NewsService.getSamplePublicNews);
  }, [execute]);


  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 200;

    if (
      isNearBottom &&
      !isLoadingMore &&
      newsItems &&
      visibleNewsCount < newsItems.length
    ) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setVisibleNewsCount((prev) => prev + 20);
        setIsLoadingMore(false);
      }, 1000);
    }
  }, [isLoadingMore, newsItems, visibleNewsCount]);

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Handle "Read More" click
  const handleReadMore = (newsId: string) => {
    console.log('Read more clicked for news ID:', newsId);
  };

  console.log('News Items:', newsItems);
  console.log('Loading:', loading);
  console.log('Error:', error);

  return (
    <div className="container mx-auto p-6">
      {/* News Grid */}
      <div className="grid grid-cols-1 gap-6">
        <NewsCard
          title="Test News"
          content="This is a test news item."
          isGlobal={false}
          category={{ categoryName: 'Test' }}
          subCategory={{
            subCategoryName: 'Test Sub',
          }}
          createdAt={new Date()}
          updatedAt={new Date()}
          imageUrl="https://picsum.photos/600/400"
          author="Test Author"
          onReadMore={() => console.log('Read more clicked')}
        />

        {/* {(sampleNews || [])
          .slice(0, visibleNewsCount)
          .map((news) => (
            <NewsCard
              key={news.id}
              title={news.title}
              content={news.content}
              isGlobal={news.isGlobal}
              category={news.category}
              subCategory={news.subCategory}
              createdAt={news.createdAt}
              updatedAt={news.updatedAt}
              imageUrl={news.imageUrl}
              author={news.author.name}
              onReadMore={() => handleReadMore(news.id)}
            />
          ))} */}

        {(newsItems || [])
          .slice(0, visibleNewsCount)
          .map((news) => (
            <NewsCard
              key={news.id}
              title={news.title}
              content={news.content}
              isGlobal={news.isGlobal}
              category={news.category}
              subCategory={news.subCategory}
              createdAt={news.createdAt}
              updatedAt={news.updatedAt}
              imageUrl={news.imageUrl}
              author={news.author.name}
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