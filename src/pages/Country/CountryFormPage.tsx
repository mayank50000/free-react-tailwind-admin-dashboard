// src/pages/CountryFormPage.tsx
import { useNavigate } from 'react-router-dom';
// import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
// import CountryForm from '../components/Country/CountryForm';
import { Country, CountryRequest, CountryService } from '../../api/countryService';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CountryForm from './CountryForm';
import { useApi } from '../../hooks/useApi';

const CountryFormPage = () => {
  const navigate = useNavigate();
  const { execute: submitCountry, loading, error } = useApi<Country>();

  const handleSubmit = async (countryData: CountryRequest) => {
    try {
      // Replace with actual API call
      await submitCountry(() => CountryService.createCountry(countryData));
      navigate('/countries'); // Redirect to list after success
    } catch (error) {
      console.error('Error saving country:', error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Country Management" />
      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <CountryForm 
            onSubmit={handleSubmit}
            loading={loading}
            error={error} />
        </div>
      </div>
    </>
  );
};

export default CountryFormPage;