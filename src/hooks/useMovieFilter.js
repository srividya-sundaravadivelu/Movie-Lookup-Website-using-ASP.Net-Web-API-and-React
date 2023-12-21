import { useState } from "react";

function useMovieFilter(startingShowDetails = false, startingYear=null,startingSearchQuery=null,startingMovieGenre=null){
    const [showDetails, setShowDetails] = useState(startingShowDetails);  
    const [movieYear, setMovieYear] = useState(startingYear);
    const [searchQuery, setSearchQuery] = useState(startingSearchQuery);
    const [movieGenre, setMovieGenre] = useState(startingMovieGenre);
    const [currentPage,setCurrentPage] = useState(1);

    return {
        showDetails,
        setShowDetails,        
        movieYear,
        setMovieYear,
        searchQuery,
        setSearchQuery,
        movieGenre,
        setMovieGenre,
        currentPage,
        setCurrentPage
    };
}

export default useMovieFilter;

