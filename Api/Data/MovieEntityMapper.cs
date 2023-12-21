namespace Api.Data
{
    public static class MovieEntityMapper
    {
        public static MovieEntity MapToMovieEntity(Movie movie)
        {
            return new MovieEntity
            {
                Title = movie.Title,
                Year = movie.Year,
                Cast = String.Join(",", movie.Cast ?? new List<string>()),
                Genres = String.Join(",", movie.Genres ?? new List<string>()),
                Href = movie.Href,
                Extract = movie.Extract,
                Thumbnail = movie.Thumbnail,
                ThumbnailWidth = movie.ThumbnailWidth,
                ThumbnailHeight = movie.ThumbnailHeight
            };
        }
    }
}
