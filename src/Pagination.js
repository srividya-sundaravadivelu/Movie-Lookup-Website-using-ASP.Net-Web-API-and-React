import React from "react";
   
 export default function Pagination({handlePageChange,currentPage,generatePaginationArray,totalPages}){
    return (
        <div className="pagination right">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Prev
            </button>
            {generatePaginationArray().map((page, index) => (
            <React.Fragment key={index}>
                {page === 'dots' ? (
                <span className="dots">...</span>
                ) : (
                <button
                    onClick={() => handlePageChange(page)}
                    className={page === currentPage ? 'active' : ''}
                >
                    {page}
                </button>
                )}
            </React.Fragment>
            ))}
            <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            >
            Next
            </button>
        </div>
    )
}