// src/pages/RegionFormPage.tsx
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { RegionService } from '../../api/regionService';
import RegionForm from './RegionForm';

const RegionFormPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (regionData: { 
    regionName: string;
    isActive: boolean;
    countryId: string;
  }) => {
    try {
      await RegionService.createRegion(regionData);
      navigate('/regions');
    } catch (error) {
      console.error('Error saving region:', error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Region Management" />
      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <RegionForm onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default RegionFormPage;