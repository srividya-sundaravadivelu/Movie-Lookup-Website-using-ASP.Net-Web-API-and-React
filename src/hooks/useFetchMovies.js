import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { MovieFilterContext } from '../contexts/MovieFilterContext';


function useFetchMovies()
{   
    // const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 50;
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const {searchQuery,movieYear,movieGenre,currentPage, setCurrentPage} = useContext(MovieFilterContext);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {  
        const fetchMovies = async () => {
          try {
            const response = await axios.get(`https://localhost:4000/movies/${currentPage}/${pageSize}`, {
            params: {
              searchQuery: searchQuery || null,
              movieYear: movieYear || null,
              movieGenre: movieGenre || null,
            },
          });     
            setError("");
            setMovies(response.data.movies);              
            setTotalPages(response.data.pagination.totalPageCount);
            setLoading(false);            
          } 
          
          catch (error) {
            setError(error.message);
            setLoading(false);
          }
        };
    
        fetchMovies(currentPage);
      }, [searchQuery, movieYear, movieGenre, currentPage]);


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

    return {
        movies,        
        error,
        loading,
        currentPage,
        totalPages,
        handlePageChange,
        generatePaginationArray 
    }
}
export default useFetchMovies;