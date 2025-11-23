using Microsoft.AspNetCore.Http;
using NovaFlix.Application.Features.Profiles.Dto;

namespace NovaFlix.Application.Common.Interfaces
{
    public interface IProfileService
    {
        Task<UserDto> GetUserAsync();
        Task UpdateUserAsync(UpdateDto dto);
        Task<UrlDto> UploadAvatarAsync(IFormFile formFile);
    }
}
