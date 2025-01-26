import { useState } from "react";
import SwitcherThree from "../../components/Switchers/SwitcherThree";

// src/components/Country/CountryForm.tsx
interface CountryFormProps {
  onSubmit: (data: { countryName: string; isActive: boolean }) => void;
}

const CountryForm = ({ onSubmit }: CountryFormProps) => {
  const [isActive, setIsActive] = useState(true);
  const [countryName, setCountryName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      countryName,
      isActive
    });
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
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
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

          <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
            Save Country
          </button>
        </div>
      </form>
    </div>
  );
};

export default CountryForm;