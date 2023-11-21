import { useContext } from "react";
import { MovieFilterContext } from "./contexts/MovieFilterContext";



function Movie({ movie }) {
    const {showDetails} = useContext(MovieFilterContext);
    const { title, year, href, extract,thumbnail,cast,genres } = movie;
    const wikipediaBaseUrl= "https://en.wikipedia.org/wiki/";
    const noImageThumbnail = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
    const castnames = `Stars: ${cast.join(', ')}`;
    return (
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-sm-12 col-xs-12">
        <div className="card card-height p-4 mt-4">
          <a href={`${wikipediaBaseUrl}${href}`}>  
            <img
            className="contain-fit"
            src={thumbnail != null ? thumbnail : noImageThumbnail}            
            width="300"
            alt={title}
            />
          </a>
          <div className="speaker-info">
            <div className="d-flex justify-content-between">
              <h3 title={`${title} (${year})`} className="text-truncate">
              {`${title} (${year})`}
              </h3>
            </div>
        
            <p class="text-muted text-small  mb-3">         
              
              <span>
                {genres.join(', ')}          
              </span>
            </p>         
          </div>      
        </div>

        {showDetails &&
          <div  className="sessionBox card h-250">
            <p title={castnames} class="text-muted text-small mb-3 text-truncate">            
              {castnames}
            </p>  
            
            <p title={extract} className="text-muted text-small card-description">{extract}</p> 
            
          </div>
        }
    </div>
    );
  }
  
  export default Movie;