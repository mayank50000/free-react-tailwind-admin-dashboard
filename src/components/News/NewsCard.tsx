// components/News/NewsCard.tsx
import { FC } from 'react';

interface NewsCardProps {
  title: string;
  content: string;
  category: string;
  date: string;
  imageUrl: string;
  author: string;
  onReadMore?: () => void;
}

const NewsCard: FC<NewsCardProps> = ({
  title,
  content,
  category,
  date,
  imageUrl,
  author,
  onReadMore
}) => {
  return (
    <div className="flex flex-col md:flex-row rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark hover:shadow-lg transition-shadow duration-200">
      {/* Image Section - Left Side */}
      <div className="md:w-1/3 relative overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover md:rounded-l-sm"
          loading="lazy"
        />
      </div>

      {/* Content Section - Right Side */}
      <div className="md:w-2/3 flex flex-col justify-between p-6">
        <div>
          {/* Category Badge */}
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
            {category}
          </span>

          {/* Title */}
          <h3 className="text-xl font-bold text-black dark:text-white mb-3 line-clamp-2">
            {title}
          </h3>

          {/* Content Preview */}
          <p className="text-body dark:text-bodydark mb-4 line-clamp-3">
            {content}
          </p>
        </div>

        {/* Footer */}
        <div className="border-t border-stroke dark:border-strokedark pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {author}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
            <button
              onClick={onReadMore}
              className="text-primary hover:text-primary-dark transition-colors font-medium flex items-center gap-1"
            >
              Read More
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;