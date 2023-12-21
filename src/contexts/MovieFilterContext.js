import React, {createContext} from "react";
import useMovieFilter from "../hooks/useMovieFilter";

const MovieFilterContext = createContext();

function MovieFilterProvider({children,startingShowDetails = false}){
    const {showDetails,
        setShowDetails,
        uniqueYears,
        movieYear,
        setMovieYear,
        searchQuery,
        setSearchQuery,
        uniqueGenres,
        movieGenre,
        setMovieGenre,
        currentPage,
        setCurrentPage} = useMovieFilter(startingShowDetails);  
    
    return (
        <MovieFilterContext.Provider value={{ showDetails,
            setShowDetails,
            uniqueYears,
            movieYear,
            setMovieYear,
            searchQuery,
            setSearchQuery,
            uniqueGenres,
            movieGenre,
            setMovieGenre,
            currentPage,
            setCurrentPage}}>
          {children}
        </MovieFilterContext.Provider>
      );
}

export { MovieFilterProvider, MovieFilterContext };





