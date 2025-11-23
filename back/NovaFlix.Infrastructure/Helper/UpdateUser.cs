using NovaFlix.Application.Features.Profiles.Dto;
using NovaFlix.Domain.Entities;

namespace NovaFlix.Infrastructure.Helper
{
    public class UpdateUser(Encrypt encrypt)
    {
        private readonly Encrypt _encrypt = encrypt;

        public async Task<User> Update(User user, UpdateDto dto)
        {
            if (!string.IsNullOrEmpty(dto.Name)) user.Name = dto.Name;
            if (!string.IsNullOrEmpty(dto.ImageUrl)) user.ImageUrl = dto.ImageUrl;
            if (!string.IsNullOrEmpty(dto.Email)) user.Email = dto.Email;
            if (!string.IsNullOrEmpty(dto.Password)) user.Password = _encrypt.EncryptPassword(dto.Password);

            return user;
        }
    }
}
