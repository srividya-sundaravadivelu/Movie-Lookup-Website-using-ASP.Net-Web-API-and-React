import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import { MovieFilterContext } from "./contexts/MovieFilterContext";


function MoviesToolbar() {
   const {theme,setTheme} = useContext(ThemeContext);
   const {showDetails,
    setShowDetails,
    uniqueYears,
    movieYear,
    setMovieYear,
    // searchQuery,
    setSearchQuery,
    uniqueGenres,
    movieGenre,
    setMovieGenre} = useContext(MovieFilterContext);
  




  
  /*const onSearchButtonClick = (e) =>{
    e.preventDefault();
    // handleSearch(searchQuery);
  }*/

   
    return (
      <section className="toolbar dark-theme-header">
        <div>
          {/* <div className="justify-content-between"> */}
            <ul className="toolrow d-flex flex-column flex-lg-row">
            <li className="d-flex flex-column flex-md-row ml-sm-5 ml-0">
                <strong>Genre</strong>
                <label className="dropdown">
                  <select className="form-control genre" value={movieGenre} onChange={(e)=>setMovieGenre(e.target.value)}>
                  <option value="">All</option>
                  {uniqueGenres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>))}
                  </select>
                </label>
              </li>
              <li className="d-flex flex-column flex-md-row ml-sm-5 ml-0">
                <strong>Year</strong>
                <label className="dropdown">
                  <select className="form-control year" value={movieYear} onChange={(e)=>setMovieYear(e.target.value)}>
                  <option value="">All</option>
                  {uniqueYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>))}
                  </select>
                </label>
              </li>
              <li className="d-flex flex-column flex-md-row">
                <b>Show Details&nbsp;&nbsp;</b>
                <label className="fav">
                  <input type="checkbox" checked={showDetails} onChange={(e)=>setShowDetails(e.target.checked)} />
                  <span className="switch"></span>
                </label>
              </li>              
              <li className="d-flex flex-column flex-md-row ml-sm-5 ml-0">
                {/* <form onSubmit={onSearchButtonClick}>   */}
                  <div className="input-group">                                  
                      <input type="text" className="form-control" placeholder="Search by title/cast" onChange={(e)=>setSearchQuery(e.target.value)}>                    
                      </input>
                      <div className="input-group-append">
                        <button className="btn btn-secondary" type="button">
                          <i className="fa fa-search"></i>
                        </button>
                      </div>                 
                  </div>
                {/* </form> */}
              </li>
              <li className="d-flex flex-column flex-md-row ml-sm-5 ml-0">
                <strong>Theme</strong>
                <label className="dropdown">
                  <select className="form-control theme" value={theme} onChange={(e)=>setTheme(e.target.value)}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </label>
              </li>
            </ul>
          {/* </div> */}
        </div>
      </section>
    );
  }
  
  export default MoviesToolbar;
  