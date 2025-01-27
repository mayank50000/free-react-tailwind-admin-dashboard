// src/pages/SubCategoryFormPage.tsx
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { SubCategoryService } from '../../api/subCategoryService';
import SubCategoryForm from './SubCategoryForm';

const SubCategoryFormPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (subCategoryData: { 
    subCategoryName: string;
    isActive: boolean;
    categoryId: string;
  }) => {
    try {
      await SubCategoryService.createSubCategory(subCategoryData);
      navigate('/sub-categories'); // Redirect to list after success
    } catch (error) {
      console.error('Error saving subcategory:', error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="SubCategory Management" />
      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <SubCategoryForm onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default SubCategoryFormPage;