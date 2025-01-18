import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface INewsProps {
  news: {
    id: number;
    title: string;
    content: string;
    author_name: string;
    is_global: boolean;
  };
}

const News: React.FC<INewsProps> = ({ news }) => {
  const [title, setTitle] = useState(news.title);
  const [content, setContent] = useState(news.content);
  const [isGlobal, setIsGlobal] = useState(news.is_global);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Updating news:', { title, content, isGlobal });
    // TODO: Implement actual update logic
  };

  const handleIsGlobalChange = () => {
    setIsGlobal(!isGlobal);
  };

  useEffect(() => {
    // Fetch news data here
    // For now, we'll use a static object
    const fetchedNews = [
      { id: 1, title: "Breaking News", content: "This is breaking news...", author_name: "John Doe", is_global: true },
      { id: 2, title: "Weather Update", content: "It's sunny today!", author_name: "Jane Smith", is_global: false },
      // Add more news as needed
    ];
    // Set initial state with fetched data
    setTitle(fetchedNews.find(n => n.id === news.id)?.title || '');
    setContent(fetchedNews.find(n => n.id === news.id)?.content || '');
    setIsGlobal(fetchedNews.find(n => n.id === news.id)?.is_global || false);
  }, []);

  return (
    <section className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">News Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter news title"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="isGlobal" className="block text-sm font-medium text-gray-700">
              Global News
            </label>
            <div className="mt-1 flex items-center space-x-3">
              <input
                id="isGlobal"
                type="checkbox"
                checked={isGlobal}
                onChange={handleIsGlobalChange}
                className="h-4 w-4 border border-gray-300 text-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              />
              <span className="sr-only">Enable global news</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Link to="/news" className="text-sm text-blue-500 hover:text-blue-600">
              Back to News List
            </Link>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Update News
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default News;