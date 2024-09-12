import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex list-none">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`mx-1 ${currentPage === number ? 'font-bold' : ''}`}
          >
            <button
              onClick={() => paginate(number)}
              className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
