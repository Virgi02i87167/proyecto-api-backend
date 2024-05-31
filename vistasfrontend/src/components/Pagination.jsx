import React from 'react';

export const Pagination = ({ moviesPerPage, totalMovies, currentPage, setCurrentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
        pageNumbers.push(i);
    }

    const onPreviousPage = (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const onNextPage = (e) => {
        e.preventDefault();
        if (currentPage < pageNumbers.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const onSpecificPage = (e, n) => {
        e.preventDefault();
        setCurrentPage(n);
    };

    return (
        <nav 
            className="pagination is-centered mb-6" 
            role="navigation" 
            aria-label="pagination"
        >
            <a 
                href="#"
                className={`pagination-previous ${currentPage === 1 ? 'is-disabled' : ''}`} 
                onClick={onPreviousPage}
            >
                Anterior
            </a>
            <a 
                href="#"
                className={`pagination-next ${currentPage >= pageNumbers.length ? 'is-disabled' : ''}`} 
                onClick={onNextPage}
            >
                Siguiente
            </a>
            <ul className="pagination-list">
                {pageNumbers.map(noPage => (
                    <li key={noPage}>
                        <a 
                            href="#"
                            className={`pagination-link ${noPage === currentPage ? 'is-current' : ''}`}
                            onClick={(e) => onSpecificPage(e, noPage)}
                        >
                            {noPage}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
