using Mapster;
using Microsoft.EntityFrameworkCore;
using NovaFlix.Application.Common.Interfaces;
using NovaFlix.Application.Features.Auth.Dto;
using NovaFlix.Domain.Entities;
using NovaFlix.Infrastructure.Helper;
using NovaFlix.Infrastructure.Persistance;

namespace NovaFlix.Infrastructure.Services
{
    public class AuthService(DatabaseContext db,
        Encrypt encrypt, TokenManipulation token) : IAuthService
    {
        private readonly Encrypt _hash = encrypt;
        private readonly TokenManipulation _token = token;
        private readonly DatabaseContext _db = db;
        public async Task<TokenDto> LoginAsync(LoginDto dto)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email.ToLower().Equals(dto.Email.ToLower()));
            if (user.Password != _hash.EncryptPassword(dto.Password))
            {
                throw new Exception("User with this email or password not found");
            }

            var userDto = user.Adapt<UserTokenDto>();

            return _token.CreateToken(userDto);
        }

        public async Task<TokenDto> RegisterAsync(RegisterDto dto)
        {
            if (dto.Password != dto.ConfirmPassword)
            {
                throw new Exception("Password and Confirm Password do not match");
            }
            dto.Password = _hash.EncryptPassword(dto.Password);
            var user = dto.Adapt<User>();

            await _db.Users.AddAsync(user);
            await _db.SaveChangesAsync();

            var userDto = user.Adapt<UserTokenDto>();

            return _token.CreateToken(userDto);
        }
    }
}
