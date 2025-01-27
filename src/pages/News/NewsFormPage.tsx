// src/pages/NewsFormPage.tsx
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { NewsService } from '../../api/newsService';
import NewsForm from './NewsForm';

const NewsFormPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (newsData: { 
    title: string;
    content: string;
    isGlobal: boolean;
    categoryId?: string;
    subCategoryId?: string;
  }) => {
    try {
      await NewsService.createNews(newsData);
      navigate('/news'); // Redirect to list after success
    } catch (error) {
      console.error('Error saving news:', error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="News Management" />
      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <NewsForm onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default NewsFormPage;