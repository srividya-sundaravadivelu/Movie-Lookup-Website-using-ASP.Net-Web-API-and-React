// Modal.js
import React from 'react';


const MovieModal = ({ showModal, handleCloseModal, movie }) => {
//   const { title, year, href, extract,thumbnail,cast,genres } = movie;
const noImageThumbnail = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
const wikipediaBaseUrl= "https://en.wikipedia.org/wiki/";

  return (
    <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">            
            <div className="modal-body">
              <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
              </button>
              <div className='row'>
                <div className='col-md-6'>
                  <img className="contain-fit" src={movie.thumbnail != null ? movie.thumbnail : noImageThumbnail}            
                    width="300" alt={movie.title} />
                </div>
                <div className='col-md-6'>                  
                  <h5 className="modal-title">{movie.title}</h5>   
                  <div>
                    <label className='label'>{`Year: ${movie.year}`}</label>
                  </div> 
                  <div>
                    <label className='label'>{`Cast: ${movie.cast}`}</label>
                  </div> 
                  <div>
                    <label className='label'>{`Genre: ${movie.genres}`}</label>
                  </div>  
                  <div>
                    <label className='label'>{`Extract: ${movie.extract}`}</label>
                  </div> 
                  <div>
                  <a href={`${wikipediaBaseUrl}${movie.href}`} target="_blank" rel="noopener noreferrer">See Full Details</a>
                  </div>         
                </div>
              </div>
              
            </div>           
          </div>
        </div>
      </div>
  );
};

export default MovieModal;
