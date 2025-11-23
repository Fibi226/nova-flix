using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using NovaFlix.Infrastructure.Options;

namespace NovaFlix.Infrastructure.Persistance
{
    public class DatabaseConfig(IOptions<DatabaseConnection> options) : DbContext
    {
        private readonly IOptions<DatabaseConnection> _options = options;
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(_options.Value.ApiDatabase);
        }
    }
}
