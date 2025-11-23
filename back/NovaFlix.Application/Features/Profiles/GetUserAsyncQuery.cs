using MediatR;
using NovaFlix.Application.Common.Interfaces;
using NovaFlix.Application.Features.Profiles.Dto;

namespace NovaFlix.Application.Features.Profiles
{
    public record GetUserAsyncQuery : IRequest<UserDto>;

    public class GetUserAsyncQueryHandler(IProfileService profileService) : IRequestHandler<GetUserAsyncQuery, UserDto>
    {
        private readonly IProfileService _profileService = profileService;
        public async Task<UserDto> Handle(GetUserAsyncQuery request, CancellationToken cancellationToken)
        {
            return await _profileService.GetUserAsync();
        }
    }

}
