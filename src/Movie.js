import { useContext,useRef,useEffect,useState} from "react";
import { MovieFilterContext } from "./contexts/MovieFilterContext";
import MovieModal from "./MovieModal";


function Movie({ movie }) {
    const {showDetails} = useContext(MovieFilterContext);
    const { title, year, extract,thumbnail,cast,genres } = movie;    
    const noImageThumbnail = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
    const castnames = `Stars: ${cast.join(', ')}`;
    const imgRef = useRef();
    const [inView,setInView] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };

    function scrollHandler(){
      setInView(isInView());
    }

    function isInView(){
      const rect = imgRef.current.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= window.innerHeight;
    } 

    useEffect(()=>{
      setInView(isInView());
      window.addEventListener("scroll",scrollHandler);

      return () =>{
        window.removeEventListener("scroll",scrollHandler);
      }
    },[]);

    const grayscale = inView ? "grayscale(0%)" : "grayscale(100%)";
    return (
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-sm-12 col-xs-12">
        <div className="card card-height p-4 mt-4">          
          <a href="#" onClick={handleOpenModal}>
            <div class="image-container">
              <img
              className="contain-fit"
              src={thumbnail != null ? thumbnail : noImageThumbnail}            
              width="300" ref={imgRef} style={{filter: `${grayscale}`}}
              alt={title} onMouseOver={()=>{
                imgRef.current.style.filter = "drop-shadow(2px 4px 6px black)";
              }} onMouseOut={()=>{imgRef.current.style.filter = "none";}}
              />
              <div class="image-overlay">Quick View</div>
            </div>
          </a>
          <div className="speaker-info">
            <div className="d-flex justify-content-between">
              <h3 title={`${title} (${year})`} className="text-truncate">
              {`${title} (${year})`}
              </h3>
              <MovieModal showModal={showModal} handleCloseModal={handleCloseModal} movie={movie} />
              {showModal && <div className="modal-backdrop show" onClick={handleCloseModal}></div>}
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
            <a>
              <p title={extract} className="text-muted text-small card-description">{extract}</p> 
            </a>
            
            
          </div>
        }
         
    </div>
    );
  }
  
  export default Movie;