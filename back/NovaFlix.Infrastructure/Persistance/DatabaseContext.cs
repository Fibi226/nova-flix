using Microsoft.EntityFrameworkCore;
using NovaFlix.Domain.Entities;
using System.Reflection;

namespace NovaFlix.Infrastructure.Persistance
{
    public class DatabaseContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<Film> Films { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
