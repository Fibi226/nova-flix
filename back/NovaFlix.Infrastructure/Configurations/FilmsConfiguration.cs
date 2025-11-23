using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NovaFlix.Domain.Entities;

namespace NovaFlix.Infrastructure.Configurations
{
    public class FilmsConfiguration : IEntityTypeConfiguration<Film>
    {
        public void Configure(EntityTypeBuilder<Film> builder)
        {
            builder.HasKey(film => film.Id);

            builder
                .HasIndex(film => film.Title)
                .IsUnique();

            builder
                .HasIndex(film => film.OriginalTitle)
                .IsUnique();
        }
    }
}
