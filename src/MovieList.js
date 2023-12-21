import React from 'react';
import Movie from "./Movie";
import Pagination from './Pagination';
import useFetchMovies from './hooks/useFetchMovies';


const MovieList = () => {     

  const { 
    movies,    
    error,
    loading,
    currentPage,
    totalPages,
    handlePageChange,
    generatePaginationArray } = useFetchMovies();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error Loading Movies: {error}</div>;
  } 
  
  return (
    <div className="container speakers-list">  
      <Pagination handlePageChange={handlePageChange} currentPage={currentPage} 
      generatePaginationArray={generatePaginationArray} totalPages={totalPages} />
      <div className="row">
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />           
        ))}
      </div>  
    </div>
  );
};

export default MovieList;



