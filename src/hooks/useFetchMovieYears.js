import { useState,useEffect } from "react";
import axios from 'axios';

function useFetchMovieYears()
{
    const [uniqueYears, setUniqueYears] = useState([]);  
    const [error, setError] = useState(null);   

    useEffect(() => {  
        const fetchMovieYears = async () => {
            try {
              const response = await axios.get(`https://localhost:4000/MovieYears`); 
              setUniqueYears(response.data);
              setError("");
            } 
            
            catch (error) { 
              setError(error.message);      
            }
          };
        fetchMovieYears();
      }, []);
    
      return {        
        uniqueYears,
        errorYears: error
    };
  
}
export default useFetchMovieYears;