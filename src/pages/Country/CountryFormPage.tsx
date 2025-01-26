// src/pages/CountryFormPage.tsx
import { useNavigate } from 'react-router-dom';
// import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
// import CountryForm from '../components/Country/CountryForm';
import { CountryService } from '../../api/countryService';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CountryForm from './CountryForm';

const CountryFormPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (countryData: { countryName: string; isActive: boolean }) => {
    try {
      // Replace with actual API call
      await CountryService.createCountry(countryData);
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
          <CountryForm onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default CountryFormPage;