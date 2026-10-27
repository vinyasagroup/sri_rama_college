import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 border-t bg-gray-50 px-5 py-5">
      {/* Previous */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-lg font-semibold text-gray-500 shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        «
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            type="button"
            key={page}
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
            className={`flex h-9 w-9 items-center justify-center rounded-xl border text-base font-semibold shadow-sm transition ${
              currentPage === page
                ? "border-yellow-400 bg-yellow-400 text-black"
                : "border-gray-300 bg-white text-gray-800 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-300 bg-white text-lg font-semibold text-gray-800 shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        »
      </button>
    </div>
  );
};

export default Pagination;