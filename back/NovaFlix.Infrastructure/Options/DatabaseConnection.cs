namespace NovaFlix.Infrastructure.Options
{
    public class DatabaseConnection
    {
        public const string SectionName = "ConnectionStrings";
        public string ApiDatabase { get; set; } = null!;
    }
}
