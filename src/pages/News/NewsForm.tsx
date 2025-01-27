// src/components/News/NewsForm.tsx
import { useState, useEffect } from 'react';
import { Category, CategoryService } from '../../api/categoryService';
import { SubCategory, SubCategoryService } from '../../api/subCategoryService';

interface NewsFormProps {
  onSubmit: (data: { 
    title: string;
    content: string;
    isGlobal: boolean;
    categoryId?: string;
    subCategoryId?: string;
  }) => void;
  initialData?: {
    title: string;
    content: string;
    isGlobal: boolean;
    categoryId?: string;
    subCategoryId?: string;
  };
}

const NewsForm = ({ onSubmit, initialData }: NewsFormProps) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [isGlobal, setIsGlobal] = useState(initialData?.isGlobal || false);
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || '');
  const [subCategoryId, setSubCategoryId] = useState(initialData?.subCategoryId || '');
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getAllCategories();
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (categoryId) {
        try {
          const response = await SubCategoryService.getAllSubCategories();
          setSubCategories(response.data.data.filter(sc => sc.category.id === categoryId));
        } catch (error) {
          console.error('Error fetching subcategories:', error);
        }
      } else {
        setSubCategories([]);
      }
    };
    fetchSubCategories();
  }, [categoryId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      content,
      isGlobal,
      categoryId: isGlobal ? undefined : categoryId,
      subCategoryId: isGlobal ? undefined : subCategoryId,
    });
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          News Form
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="p-6.5">
          {/* Title, Content, Global Toggle, Category, and SubCategory fields */}
          {/* (Refer to the previous NewsForm.tsx implementation) */}
        </div>
      </form>
    </div>
  );
};

export default NewsForm;