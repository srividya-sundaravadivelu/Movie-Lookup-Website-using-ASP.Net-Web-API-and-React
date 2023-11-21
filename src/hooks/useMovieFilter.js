import { useState } from "react";
import {movieJsonLarge } from "../master_movies_large";

function useMovieFilter(startingShowDetails = false, startingYear="",startingSearchQuery="",startingMovieGenre=""){
    const data = movieJsonLarge;
    const [showDetails, setShowDetails] = useState(startingShowDetails);  
    const [movieYear, setMovieYear] = useState(startingYear);
    const [searchQuery, setSearchQuery] = useState(startingSearchQuery);
    const [movieGenre, setMovieGenre] = useState(startingMovieGenre);

    // Extract unique year values using a Set
    const uniqueYearSet = new Set(data.map((item) => item.year));
    const uniqueYears = [...uniqueYearSet].sort((a,b)=> b-a);   

    // Extract and combine all genres into a single array
    const combinedGenres = data.reduce((genres, movie) => {
    return [...genres, ...movie.genres];
  }, []);

    // Use a Set to remove duplicates
    const uniqueGenres = [...new Set(combinedGenres)].sort();
    return {
        showDetails,
        setShowDetails,
        uniqueYears,
        movieYear,
        setMovieYear,
        searchQuery,
        setSearchQuery,
        uniqueGenres,
        movieGenre,
        setMovieGenre
    };
}

export default useMovieFilter;

