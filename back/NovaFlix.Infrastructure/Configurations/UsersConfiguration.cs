using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NovaFlix.Domain.Entities;
using NovaFlix.Domain.Enums;

namespace NovaFlix.Infrastructure.Configurations
{
    public class UsersConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(user => user.Id);

            builder
                .HasIndex(user => user.Email)
                .IsUnique();

            builder
                .HasIndex(user => user.Name)
                .IsUnique();

            builder
                .Property(user => user.Role)
                .HasConversion(new EnumToStringConverter<UserRole>());
        }
    }
}
