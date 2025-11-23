using Mapster;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using NovaFlix.Application.Common.Interfaces;
using NovaFlix.Application.Features.Profiles.Dto;
using NovaFlix.Application.Features.UserContext;
using NovaFlix.Infrastructure.Helper;
using NovaFlix.Infrastructure.Persistance;

namespace NovaFlix.Infrastructure.Services
{
    public class ProfileService(DatabaseContext db, IUserContext context,
        UpdateUser updateUser, ImageHelper imageHelper) : IProfileService
    {
        private readonly ImageHelper _imageHelper = imageHelper;
        private readonly UpdateUser _updateUser = updateUser;
        private readonly IUserContext _context = context;
        private readonly DatabaseContext _db = db;

        public async Task<UserDto> GetUserAsync()
        {
            var user = await _db.Users.FirstOrDefaultAsync(x => x.Id == _context.Id);

            return user.Adapt<UserDto>();
        }

        public async Task UpdateUserAsync(UpdateDto dto)
        {
            var user = _db.Users.FirstOrDefault(x => x.Id == _context.Id);

            var newUser = await _updateUser.Update(user, dto);

            _db.Users.Update(newUser);
            await _db.SaveChangesAsync();
        }

        public async Task<UrlDto> UploadAvatarAsync(IFormFile formFile)
        {
            var ImageUrl = new UrlDto() { ImageUrl = await _imageHelper.SaveFile(formFile) };
            return ImageUrl;
        }
    }
}
