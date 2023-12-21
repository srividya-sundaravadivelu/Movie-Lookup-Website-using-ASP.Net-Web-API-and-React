import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import { MovieFilterContext } from "./contexts/MovieFilterContext";
import useFetchMovieGenres from "./hooks/useFetchMovieGenres";
import useFetchMovieYears from "./hooks/useFetchMovieYears";


function MoviesToolbar() {   
  
   const {theme,setTheme} = useContext(ThemeContext);
   const {showDetails,
    setShowDetails,
    movieYear,
    setMovieYear,
    setSearchQuery,
    movieGenre,
    setMovieGenre,
    setCurrentPage} = useContext(MovieFilterContext);

    const {uniqueGenres, errorGenres} = useFetchMovieGenres();
    const {uniqueYears, errorYears}= useFetchMovieYears();

    if (errorGenres) {
      return <div>Error Loading Movie Genres: {errorGenres}</div>;
    } 

    if (errorYears) {
      return <div>Error Loading Movie Years: {errorYears}</div>;
    } 

    function OnMovieGenreChange(e)
    {
        setMovieGenre(e.target.value);
        setCurrentPage(1);
    }

    function OnMovieYearChange(e)
    {
        setMovieYear(e.target.value);
        setCurrentPage(1);
    }

    function OnSearchQueryChange(e)
    {
      setSearchQuery(e.target.value);
      setCurrentPage(1);
    }
   
    return (
      <section className="toolbar dark-theme-header">
        <div>
          {/* <div className="justify-content-between"> */}
            <ul className="toolrow d-flex flex-column flex-lg-row">
            <li className="d-flex flex-column flex-md-row ml-sm-5 ml-0">
                <strong>Genre</strong>
                <label className="dropdown">
                  <select className="form-control genre" value={movieGenre} onChange={(e)=>OnMovieGenreChange(e)}>
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
                  <select className="form-control year" value={movieYear} onChange={(e)=>OnMovieYearChange(e)}>
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
                      <input type="text" className="form-control" placeholder="Search by title/cast" onChange={(e)=>OnSearchQueryChange(e)}>                    
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
  