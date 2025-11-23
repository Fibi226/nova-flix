namespace NovaFlix.Application.Features.Films.Dto
{
    public class CreateFilmDto
    {
        public string Title { get; set; }

        public string OriginalTitle { get; set; }

        public string ImageUrl { get; set; }

        public string Release { get; set; }

        public TimeOnly Duration { get; set; }

        public double Rating { get; set; }

        public List<string> Genres { get; set; } = new List<string>();

        public string Producer { get; set; }

        public string Franchise { get; set; }

        public string Studio { get; set; }

        public int View { get; set; }

        public string FilmDescription { get; set; }

        public string LinkToTheOriginal { get; set; }

        public string LinkToTheUkrainianversion { get; set; }
    }
}
