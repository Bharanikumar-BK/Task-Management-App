const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-gray-700">
        Showing page <span className="font-medium">{currentPage}</span> of{' '}
        <span className="font-medium">{totalPages}</span>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md ${
            currentPage === 1
              ? 'bg-gray-200 cursor-not-allowed'
              : 'bg-primary-500 text-white hover:bg-primary-600'
          }`}
        >
          Previous
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-3 py-1 rounded-md ${
              currentPage === number
                ? 'bg-primary-600 text-white'
                : 'bg-primary-500 text-white hover:bg-primary-600'
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages
              ? 'bg-gray-200 cursor-not-allowed'
              : 'bg-primary-500 text-white hover:bg-primary-600'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;