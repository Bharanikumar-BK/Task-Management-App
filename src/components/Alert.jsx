import { XMarkIcon } from '@heroicons/react/24/solid';

const Alert = ({ type, message, onClose }) => {
  const alertClasses = {
    success: 'bg-success-100 border-success-400 text-success-700',
    error: 'bg-danger-100 border-danger-400 text-danger-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
  };

  return (
    <div
      className={`${alertClasses[type]} border px-4 py-3 rounded relative mb-4`}
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <button onClick={onClose}>
          <XMarkIcon className="h-5 w-5" />
        </button>
      </span>
    </div>
  );
};

export default Alert;