// src/pages/CategoryFormPage.tsx
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { CategoryService } from '../../api/categoryService';
import CategoryForm from './CategoryForm';

const CategoryFormPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (categoryData: { 
    categoryName: string;
    isActive: boolean;
  }) => {
    try {
      await CategoryService.createCategory(categoryData);
      navigate('/categories'); // Redirect to list after success
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Category Management" />
      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <CategoryForm onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default CategoryFormPage;