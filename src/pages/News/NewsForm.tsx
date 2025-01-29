// src/components/News/NewsForm.tsx
import { useState, useEffect } from 'react';
import { Category, CategoryService } from '../../api/categoryService';
import { SubCategory, SubCategoryService } from '../../api/subCategoryService';
import { useApi } from '../../hooks/useApi';
import SwitcherThree from '../../components/Switchers/SwitcherThree';

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
  // const [categories, setCategories] = useState<Category[]>([]);
  // const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  const { data: categories, execute: fetchCategories } = useApi<Category[]>();
  const { data: subCategories, execute: fetchSubCategories } = useApi<SubCategory[]>();

  useEffect(() => {
    fetchCategories(CategoryService.getAllCategories);
  }, [fetchCategories]);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await CategoryService.getAllCategories();
  //       setCategories(response.data);
  //     } catch (error) {
  //       console.error('Error fetching categories:', error);
  //     }
  //   };
  //   fetchCategories();
  // }, []);

  useEffect(() => {
    if (categoryId) {
      fetchSubCategories(SubCategoryService.getSubCategoriesByCategory, categoryId);
    }
  }, [categoryId, fetchSubCategories]);

  // useEffect(() => {
  //   const fetchSubCategories = async () => {
  //     if (categoryId) {
  //       try {
  //         const response = await SubCategoryService.getAllSubCategories();
  //         setSubCategories(response.data.filter(sc => sc.category.id === categoryId));
  //       } catch (error) {
  //         console.error('Error fetching subcategories:', error);
  //       }
  //     } else {
  //       setSubCategories([]);
  //     }
  //   };
  //   fetchSubCategories();
  // }, [categoryId]);

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
          {/* Title Field */}
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Title <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter news title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              required
            />
          </div>
          {/* Content Field */}
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Content <span className="text-meta-1">*</span>
            </label>
            <textarea
              rows={6}
              placeholder="Enter news content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              required
            />
          </div>
          {/* Global Toggle */}
          <div className="mb-4.5 flex items-center justify-between">
            <label className="text-black dark:text-white">
              Global News
            </label>
            <SwitcherThree 
              enabled={isGlobal} 
              setEnabled={setIsGlobal}
            />
          </div>
          {/* Category Dropdown (Hidden if Global) */}
          {!isGlobal && (
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Category <span className="text-meta-1">*</span>
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                required={!isGlobal}
                disabled={isGlobal}
              >
                <option value="">Select Category</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
          )}
          {/* Submit Button */}
          <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
            Save News
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsForm;