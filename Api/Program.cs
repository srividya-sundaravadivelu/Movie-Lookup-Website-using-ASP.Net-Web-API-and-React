using Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Web.Http;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
//builder.Services.AddDbContext<MovieDbContext>(options=> options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddDbContext<MovieDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IMovieRepository,MovieRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(p => p.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod());

app.UseHttpsRedirection();

// Call your DbContext's Initialize method to seed the database
using (var serviceScope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope())
{
    var dbContext = serviceScope.ServiceProvider.GetRequiredService<MovieDBContext>();
    MovieDBContext.Initialize(dbContext);
}

app.MapGet("/movies/{pageNumber}/{pageSize}", 
    (IMovieRepository repo, int pageNumber, int pageSize, string? searchQuery, int? movieYear, string? movieGenre) =>
    repo.GetMoviesAsync(searchQuery, movieYear, movieGenre, pageNumber, pageSize));
app.MapGet("/MovieGenres", (IMovieRepository repo) => repo.GetMovieGenresAsync());
app.MapGet("/MovieYears", (IMovieRepository repo) => repo.GetMovieYearsAsync());

app.MapPut("/movies/updateThumbnail/{movieId}", (IMovieRepository repo, int movieId, [FromQuery]string thumbnail) =>
{ 
    repo.UpdateThumbnail(movieId,thumbnail);
    return Results.Ok("Thumbnail updated successfully");
});



app.Run();


