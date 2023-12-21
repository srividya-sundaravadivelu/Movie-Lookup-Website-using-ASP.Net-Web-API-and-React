using Newtonsoft.Json;

namespace Api.Data
{

    public class SeedData
    {
        public static void Seed(MovieDBContext context)
        {
            try
            {
                // Check if the database has already been seeded
                if (context.Movies.Any())
                {
                    // Database has already been seeded
                    return;
                }

                // Your existing code to read JSON data
                string fileName = "master_movies_large.js";
                IEnumerable<Movie> movies = ReadMoviesFromJsonFile(fileName);

                // Your existing code to seed the database
                foreach (var movie in movies)
                {
                    // Map and add movies to the context
                    MovieEntity movieEntity = MovieEntityMapper.MapToMovieEntity(movie);
                    context.Movies.Add(movieEntity);
                }

                // Save changes to the database
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error seeding database: {ex.Message}");
            }
        }

        public static IEnumerable<Movie> ReadMoviesFromJsonFile(string fileName)
        {
            try
            {
                // Get the current directory of the application
                string currentDirectory = Directory.GetCurrentDirectory();

                // Combine the current directory with the relative path to the JSON file
                string filePath = Path.Combine(currentDirectory, fileName);


                // Read the JSON file
                string jsonContent = File.ReadAllText(filePath);

                // Deserialize the JSON content into a List<Movie>
                IEnumerable<Movie> movies = JsonConvert.DeserializeObject<IEnumerable<Movie>>(jsonContent);

                return movies;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error reading JSON file: {ex.Message}");
                return new List<Movie>();
            }
        }
    }   

    public class Movie
    {
        public string? Title { get; set; }
        public int Year { get; set; }
        public List<string>? Cast { get; set; }
        public List<string>? Genres { get; set; }
        public string? Href { get; set; }
        public string? Extract { get; set; }
        public string? Thumbnail { get; set; }
        public int ThumbnailWidth { get; set; }
        public int ThumbnailHeight { get; set; }
    }
}
