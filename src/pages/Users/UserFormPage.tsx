// src/pages/UserFormPage.tsx
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { UserService } from '../../api/userService';
import UserForm from './UserForm';

const UserFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const handleSubmit = async (userData: {
    name: string;
    email: string;
    role: 'ADMIN' | 'EDITOR' | 'USER';
    password?: string;
    isActive: boolean;
  }) => {
    try {
      if (isEditMode && id) {
        await UserService.updateUser(id, userData);
      } else {
        await UserService.createUser(userData);
      }
      navigate('/users');
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <>
      <Breadcrumb pageName={isEditMode ? 'Edit User' : 'Create User'} />
      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <UserForm 
            onSubmit={handleSubmit}
            isEditMode={isEditMode}
          />
        </div>
      </div>
    </>
  );
};

export default UserFormPage;