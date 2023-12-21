namespace Api.Data
{
    public class MoviesApiResponse
    {
        public IEnumerable<MovieEntity> Movies { get; set; }
        public PaginationMetadata Pagination { get; set; }
    }
}
