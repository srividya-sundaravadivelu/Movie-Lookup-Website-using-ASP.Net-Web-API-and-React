using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class MovieRepository : IMovieRepository
    {
        private readonly MovieDBContext _context;

        public MovieRepository(MovieDBContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public MovieEntity GetMovieById(int id)
        {
            return _context.Movies.Where(m=>m.ID == id).FirstOrDefault();
        }

        public async Task<IEnumerable<string>> GetMovieGenresAsync()
        {
            var allGenres = await _context.Movies.Select(m => m.Genres).ToListAsync();
            var uniqueGenres = allGenres.SelectMany(g => g.Split(','))
                 .Select(g => g.Trim())
                 .Distinct()
                 .Where(g=>!string.IsNullOrWhiteSpace(g))
                 .OrderBy(g => g);
            return uniqueGenres;
        }

        public async Task<MoviesApiResponse> GetMoviesAsync([FromQuery] string? searchQuery,
            [FromQuery] int? movieYear,
            [FromQuery] string? movieGenre,
            int pageNumber,
            int pageSize)
        {
            // collection to start from
            var collection = _context.Movies as IQueryable<MovieEntity>;

            if (!string.IsNullOrWhiteSpace(searchQuery))
            {
                searchQuery = searchQuery.Trim();
                collection = collection.Where(m => m.Title != null && m.Title.Contains(searchQuery)
                    || (m.Cast != null && m.Cast.Contains(searchQuery)));
            }

            if (movieYear != null)
            {
                collection = collection.Where(m => m.Year == movieYear);
            }

            if (!string.IsNullOrWhiteSpace(movieGenre))
            {
                collection = collection.Where(m => m.Genres != null && m.Genres.Contains(movieGenre));
            }

            var totalItemCount = await collection.CountAsync();

            var paginationMetadata = new PaginationMetadata(
                totalItemCount, pageSize, pageNumber);

            var collectionToReturn = await collection
                .OrderByDescending(c => c.Year)
                .Skip(pageSize * (pageNumber - 1))
                .Take(pageSize)
                .ToListAsync();

            return new MoviesApiResponse
            {
                Movies = collectionToReturn.OrderBy(c => c.Title),
                Pagination = paginationMetadata
            };

        }

        public async Task<IEnumerable<int>> GetMovieYearsAsync()
        {
            return await _context.Movies.Select(m => m.Year)
                .Distinct()
                .OrderByDescending(year => year)
                .ToListAsync();
        }

        public void UpdateThumbnail(int movieId, string thumbnail)
        {
            try
            {
                var existingMovie = GetMovieById(movieId);

                if (existingMovie != null)
                {
                    existingMovie.Thumbnail = thumbnail;
                    _context.SaveChanges(); // Use async SaveChanges
                }
            }
            catch (DbUpdateConcurrencyException ex)
            {
                // Handle concurrency conflicts if necessary
                Console.WriteLine($"Concurrency error updating thumbnail: {ex.Message}");
                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating thumbnail: {ex.Message}");
                throw;
            }
        }
    }
}

