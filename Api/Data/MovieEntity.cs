using System.ComponentModel.DataAnnotations;

public class MovieEntity {
    [Key]
    public int ID { get; set; }
    public string? Title { get; set; }
    public int Year { get; set; }
    public string? Cast { get; set; }
    public string? Genres { get; set; }
    public string? Href { get; set; }
    public string? Extract { get; set; }
    public string? Thumbnail { get; set; }
    public int ThumbnailWidth { get; set; }
    public int ThumbnailHeight { get; set; }
}