import { useState,useEffect } from "react";
import axios from 'axios';

function useFetchMovieGenres()
{
    const [uniqueGenres, setUniqueGenres] = useState([]);
    const [error, setError] = useState(null);  

    useEffect(() => {  
        const fetchMovieGenres = async () => {
          try {
            const response = await axios.get(`https://localhost:4000/MovieGenres`);  
            setUniqueGenres(response.data);
            setError("");
          } 
          
          catch (error) { 
            setError(error.message);    
          }
        }; 
        fetchMovieGenres();
      }, []);
    
      return {        
        uniqueGenres ,
        errorGenres: error     
    };
  
}
export default useFetchMovieGenres;