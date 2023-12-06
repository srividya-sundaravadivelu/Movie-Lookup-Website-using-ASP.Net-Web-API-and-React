import Movie from "./Movie";
import React, { useContext } from "react";
import { MovieFilterContext } from "./contexts/MovieFilterContext";
import {movieJsonLarge } from "./master_movies_large";
import { Pagination } from "./Pagination";
import { usePagination } from "./hooks/usePagination";

function MovieList() {

  const {searchQuery,movieYear,movieGenre} = useContext(MovieFilterContext);
  const data = movieJsonLarge;
  const itemsPerPage = 100; 
  
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
  .sort((a, b) => b.year - a.year);

  const {        
    currentPage,
    totalPages,
    handlePageChange,
    generatePaginationArray} = usePagination(filteredMovies.length,itemsPerPage);

  return (
    <div className="container speakers-list">  
      <Pagination handlePageChange={handlePageChange} currentPage={currentPage} 
      generatePaginationArray={generatePaginationArray} totalPages={totalPages} />
      
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
