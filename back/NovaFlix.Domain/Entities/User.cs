using NovaFlix.Domain.Enums;

namespace NovaFlix.Domain.Entities
{
    public class User
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; } 

        public string Password { get; set; }

        public string? ImageUrl { get; set; }

        public UserRole Role = UserRole.User;
    }
}