// src/components/SubCategory/SubCategoryForm.tsx
import { useState, useEffect } from 'react';
import { Category, CategoryService } from '../../api/categoryService';
import SwitcherThree from '../../components/Switchers/SwitcherThree';

interface SubCategoryFormProps {
  onSubmit: (data: { 
    subCategoryName: string;
    isActive: boolean;
    categoryId: string;
  }) => void;
  initialData?: {
    subCategoryName: string;
    isActive: boolean;
    categoryId: string;
  };
}

const SubCategoryForm = ({ onSubmit, initialData }: SubCategoryFormProps) => {
  const [isActive, setIsActive] = useState(initialData?.isActive || true);
  const [subCategoryName, setSubCategoryName] = useState(initialData?.subCategoryName || '');
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || '');
  const [categories, setCategories] = useState<Category[]>([]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      subCategoryName,
      isActive,
      categoryId,
    });
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          SubCategory Form
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="p-6.5">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              SubCategory Name <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter subcategory name"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              required
            />
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Category <span className="text-meta-1">*</span>
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4.5 flex items-center justify-between">
            <label className="text-black dark:text-white">
              Status
            </label>
            <SwitcherThree 
              enabled={isActive} 
              setEnabled={setIsActive}
            />
          </div>

          <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
            Save SubCategory
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubCategoryForm;