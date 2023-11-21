import Movie from "./Movie";
import React, { useContext,useState } from "react";
import { MovieFilterContext } from "./contexts/MovieFilterContext";
import {movieJsonLarge } from "./master_movies_large";

function MovieList() {

  const {searchQuery,movieYear,movieGenre} = useContext(MovieFilterContext);
  const data = movieJsonLarge;
  const itemsPerPage = 100; 
  const [currentPage, setCurrentPage] = useState(1);

  // Filter movies based on search query, year, and genre
  const filteredMovies = data
  .filter((movie) => {
    return (
      movie.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      // movie.extract?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.cast.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  })
  .filter((movie) => movie.year.toString().includes(movieYear))
  .filter((movie) => {
    return movie.genres.find((genre) => genre.includes(movieGenre));
  })
  .sort((a, b) => b.year - a.year);;

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

  // Function to handle page changes
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Function to generate an array of page numbers with dots
  const generatePaginationArray = () => {
  const pagesArray = [];
  const maxPagesToShow = 5; // Maximum number of pages to show in the pagination

  // Logic to decide which pages to display based on the current page
  if (totalPages <= maxPagesToShow) {
    // If total pages are less than or equal to the maximum, show all pages
    for (let i = 1; i <= totalPages; i++) {
      pagesArray.push(i);
    }
  } 
  else {
    // Show a portion of pages with dots in between
    const halfMax = Math.floor(maxPagesToShow / 2);

    if (currentPage <= halfMax + 1) {
      // Display pages 1 to maxPagesToShow - 1 with a "Next" link
      for (let i = 1; i < maxPagesToShow; i++) {
        pagesArray.push(i);
      }
      pagesArray.push('dots', totalPages);
    } 
    else if (currentPage >= totalPages - halfMax) {
      // Display the last maxPagesToShow - 1 pages with a "Prev" link
      pagesArray.push(1, 'dots');
      for (let i = totalPages - maxPagesToShow + 2; i <= totalPages; i++) {
        pagesArray.push(i);
      }
    } 
    else {
      // Display pages around the current page with dots on both sides
      pagesArray.push(1, 'dots');
      for (let i = currentPage - halfMax; i <= currentPage + halfMax; i++) {
        pagesArray.push(i);
      }
      pagesArray.push('dots', totalPages);
    }
  }
  return pagesArray;
  };

return (
<div className="container speakers-list">
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

  <div className="row">
    {filteredMovies
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      .map((m) => (
        <Movie key={m.id} movie={m} />
      ))}
  </div>
  
</div>
);
}

export default MovieList;
