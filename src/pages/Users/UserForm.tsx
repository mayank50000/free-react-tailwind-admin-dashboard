import { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { Role, RoleService } from '../../api/roleService';
import { UserRequest } from '../../api/userService';
import SwitcherThree from '../../components/Switchers/SwitcherThree';

interface UserFormProps {
  onSubmit: (data: UserRequest) => void;
  initialData?: UserRequest & { id?: string };
  loading?: boolean;
  error?: string | null;
}

const UserForm = ({ onSubmit, initialData, loading, error }: UserFormProps) => {
  // State for form fields
  const [name, setName] = useState(initialData?.name || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [password, setPassword] = useState('');
  const [roleId, setRoleId] = useState(initialData?.roleId || '');
  const [isActive, setIsActive] = useState(initialData?.isActive || true);

  // Fetch roles using useApi hook
  const { data: roles, execute: fetchRoles, loading: rolesLoading } = useApi<Role[]>();

  // Fetch roles on component mount
  useEffect(() => {
    fetchRoles(RoleService.getAllRoles);
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      email,
      roleId,
      password: initialData?.id ? undefined : password, // Password not required in edit mode
      isActive,
    });
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          {initialData?.id ? 'Edit User' : 'Create User'}
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="p-6.5">
          {/* Display error message if any */}
          {error && (
            <div className="mb-4.5 text-danger">
              {error}
            </div>
          )}

          {/* Name Field */}
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Full Name <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Email <span className="text-meta-1">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              required
            />
          </div>

          {/* Password Field (Only for new users) */}
          {!initialData?.id && (
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Password <span className="text-meta-1">*</span>
              </label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                required
              />
            </div>
          )}

          {/* Role Dropdown */}
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Role <span className="text-meta-1">*</span>
            </label>
            {rolesLoading ? (
              <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-10 rounded"></div>
            ) : (
              <select
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                required
              >
                <option value="">Select Role</option>
                {roles?.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.roleName}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Status Toggle */}
          <div className="mb-4.5 flex items-center justify-between">
            <label className="text-black dark:text-white">
              Active Status
            </label>
            <SwitcherThree 
              enabled={isActive} 
              setEnabled={setIsActive}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
          >
            {loading ? 'Saving...' : initialData?.id ? 'Update User' : 'Create User'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;