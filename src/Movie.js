import { useContext,useRef,useEffect,useState} from "react";
import { MovieFilterContext } from "./contexts/MovieFilterContext";
import MovieModal from "./MovieModal";


function Movie({ movie }) {
    const {showDetails} = useContext(MovieFilterContext);
    const { title, year, extract,cast,genres } = movie;    
    const noImageThumbnail = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
    const castnames = `Stars: ${cast}`;
    const imgRef = useRef();
    const [inView,setInView] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [imageUrl,setImageUrl] = useState(movie.thumbnail);

    const handleOpenModal = () => {      
      // Store the current scroll position
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      document.body.style.overflow = 'hidden'; // Prevent scrolling on the body
      setShowModal(true);
      document.body.style.top = `-${scrollPosition}px`; // Save the scroll position
    };
  
    const handleCloseModal = () => {
      const scrollPosition = parseInt(document.body.style.top || '0', 10);
      document.body.style.overflow = ''; // Allow scrolling on the body
      setShowModal(false);
      window.scrollTo(0, -scrollPosition); // Restore the scroll position
      document.body.style.top = ''; // Clear the saved scroll position
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
              src={imageUrl != null ? imageUrl : noImageThumbnail} 
              height={imageUrl == null && '310px'}           
              ref={imgRef} style={{filter: `${grayscale}`}}
              alt={title} onMouseOver={()=>{
                imgRef.current.style.filter = "drop-shadow(2px 4px 6px black)";
              }} onMouseOut={()=>{imgRef.current.style.filter = "none";}} onError={(e) => {
                e.target.src = noImageThumbnail; e.target.style.height = `310px`;
              }}
              />
              <div class="image-overlay">Quick View</div>
            </div>
          </a>
          <div className="speaker-info">
            <div className="d-flex justify-content-between">
              <h3 title={`${title} (${year})`} className="text-truncate">
              {`${title} (${year})`}
              </h3>
              <MovieModal showModal={showModal} handleCloseModal={handleCloseModal} 
              movie={movie} imageUrl={imageUrl} setImageUrl={setImageUrl} />
              {showModal && <div className="modal-backdrop show" onClick={handleCloseModal}></div>}
            </div>
        
            <p class="text-muted text-small  mb-3">         
              
              <span>
                {genres}          
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