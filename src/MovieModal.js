// Modal.js
import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const MovieModal = ({ showModal, handleCloseModal, movie, imageUrl, setImageUrl }) => {
//   const { title, year, href, extract,thumbnail,cast,genres } = movie;
const noImageThumbnail = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
const wikipediaBaseUrl= "https://en.wikipedia.org/wiki/";
//const [imageUrl,setImageUrl] = useState(movie.thumbnail);
const [response,setResponse] = useState("");

const OnEditClick = () => {  
  //  axios.put(`https://localhost:4000/movies/updateThumbnail/${movie.id}/${imageUrl}`
  //  //, { thumbnail: imageUrl }
  //  )
  //axios.put(`https://localhost:4000/movies/updateThumbnail/${movie.id}/${encodeURIComponent(imageUrl)}`)
  axios.put(`https://localhost:4000/movies/updateThumbnail/${movie.id}?thumbnail=${imageUrl}`)
    .then(response => {
      console.log('Thumbnail updated successfully');
      setResponse("Thumbnail updated successfully");
    })
    .catch(error => {
      console.error('Error updating thumbnail', error);
      setResponse("Error updating thumbnail");
    });
};

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
                  <img className="contain-fit" src={imageUrl != null ? imageUrl : noImageThumbnail}                                   
                     alt={movie.title} onError={(e) => {
                      e.target.src = noImageThumbnail; 
                    }}/>
                  {/* <div className="input-group input-group-sm">                                  
                      <input type="text" className="form-control"  value={imageUrl}
                      onChange={(e)=>setImageUrl(e.target.value)} placeholder='Upload Image'> 
                      </input>
                      <div className="input-group-append">
                        <button className="btn btn-secondary" type="button" onClick={OnEditClick}>
                          <i className="fa fa-edit" data-toggle="tooltip"
                            data-placement="top" title="Update Thumbnail" ></i>
                        </button>
                      </div>                 
                  </div>
                  <div><span>{response}</span></div>*/}
                  <div>
                    <a  href={`${wikipediaBaseUrl}${movie.href}`} target="_blank" rel="noopener noreferrer">See Full Details</a>
                  </div> 
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
                  <div className='extract-div'>
                    <label className='label'>{`Extract: ${movie.extract}`}</label>
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
