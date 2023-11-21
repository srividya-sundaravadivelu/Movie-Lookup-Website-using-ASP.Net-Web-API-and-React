import MoviesList  from "./MovieList";
import MoviesToolbar from "./MoviesToolbar";
import { MovieFilterProvider } from "./contexts/MovieFilterContext";

function Movies() {
  return (
    <MovieFilterProvider startingShowDetails={false}>
        <MoviesToolbar  /> 
        <MoviesList  />
      </MovieFilterProvider>
  );
}

export default Movies;
