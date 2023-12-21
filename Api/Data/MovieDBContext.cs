using Api.Data;
using Microsoft.EntityFrameworkCore;
public class MovieDBContext : DbContext
{
 
    public MovieDBContext(DbContextOptions<MovieDBContext> options) : base(options)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<MovieEntity>().HasIndex(m => m.Year);
        // Call the base class implementation
        base.OnModelCreating(modelBuilder);        
    }

    public static void Initialize(MovieDBContext context)
    {
        context.Database.EnsureCreated();

        if (context.Movies.Any())
        {
            // Database has already been seeded
            return;
        }

        // Load movies from JSON file
        var movies = SeedData.ReadMoviesFromJsonFile("master_movies_large.js");
        List<MovieEntity> entities = new List<MovieEntity>();
        foreach (var movie in movies)
        {
            entities.Add(MovieEntityMapper.MapToMovieEntity(movie));
        }

        // Add movies to the context and save changes
        context.Movies.AddRange(entities);
        context.SaveChanges();
    }

    public DbSet<MovieEntity> Movies { get; set; }
}