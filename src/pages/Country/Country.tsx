import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface ICountryProps {
  country: {
    name: string;
    isActive: boolean;
  };
}

const Country = ({ country }: ICountryProps) => {
  const [name, setName] = useState(country.name);
  const [isActive, setIsActive] = useState(country.isActive || false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Updating country:', { name, isActive });
    // TODO: Implement actual update logic
  };

  return (
    <section className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Country Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Country Name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="isActive" className="block text-sm font-medium text-gray-700">
              Active
            </label>
            <input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="mt-1"
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Update Country
            </button>
            <a href="/countries" className="text-sm text-blue-500 hover:text-blue-600">
              Cancel
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Country;