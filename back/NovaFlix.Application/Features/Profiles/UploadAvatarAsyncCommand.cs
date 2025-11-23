using MediatR;
using Microsoft.AspNetCore.Http;
using NovaFlix.Application.Common.Interfaces;
using NovaFlix.Application.Features.Profiles.Dto;

namespace NovaFlix.Application.Features.Profiles
{
    public record UploadAvatarAsyncCommand(IFormFile ImageUrl) : IRequest<UrlDto>;

    public class UploadAvatarAsyncCommandHandler(IProfileService profileService) : IRequestHandler<UploadAvatarAsyncCommand, UrlDto>
    {
        private readonly IProfileService _profileService = profileService;
        public async Task<UrlDto> Handle(UploadAvatarAsyncCommand request, CancellationToken cancellationToken)
        {
            return await _profileService.UploadAvatarAsync(request.ImageUrl);
        }
    }

}
