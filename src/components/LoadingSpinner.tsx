// components/LoadingSpinner.tsx
const LoadingSpinner = ({ text = 'Loading...' }) => (
    <div className="flex items-center justify-center space-x-2">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <span className="text-gray-500 dark:text-gray-400">{text}</span>
    </div>
  );
  
  export default LoadingSpinner;