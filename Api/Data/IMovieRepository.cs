using System.Web.Http;

namespace Api.Data
{
    public interface IMovieRepository
    {
        Task<MoviesApiResponse> GetMoviesAsync(
           string? searchQuery, int? movieYear, string? movieGenre, int pageNumber, int pageSize);

        Task<IEnumerable<int>> GetMovieYearsAsync();

        Task<IEnumerable<String>> GetMovieGenresAsync();

        MovieEntity GetMovieById(int id);

        void UpdateThumbnail(int movieId, string thumbnail);

    }
}
