namespace Api.Data
{
    public record MovieDto(int ID, string? Title,int Year, string? Cast, string? Genres, string? Href,string? Extract,
        string? Thumbnail,int ThumbnailWidth,int ThumbnailHeight);
}
