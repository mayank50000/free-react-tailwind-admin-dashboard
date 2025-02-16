import { useState } from "react";
import SwitcherThree from "../../components/Switchers/SwitcherThree";
import { useApi } from '../../hooks/useApi';
import { CountryRequest } from "../../api/countryService";

// src/components/Country/CountryForm.tsx
interface CountryFormProps {
  onSubmit: (data: CountryRequest) => void;
  loading?: boolean;
  error?: string | null;
}

const CountryForm = ({ onSubmit, loading, error }: CountryFormProps) => {
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ countryName: name, isActive });
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Country Form
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="p-6.5">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Country Name <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter country name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              required
            />
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

          {error && <div className="mb-4 text-danger">{error}</div>}
          <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
            {loading ? 'Saving...' : 'Save Country'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CountryForm;