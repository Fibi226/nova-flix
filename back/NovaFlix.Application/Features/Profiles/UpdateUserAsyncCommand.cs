using Mapster;
using MediatR;
using NovaFlix.Application.Common.Interfaces;
using NovaFlix.Application.Features.Profiles.Dto;

namespace NovaFlix.Application.Features.Profiles
{
    public record UpdateUserAsyncCommand(string Email,
        string Name,
        string Password,
        string ImageUrl) : IRequest;

    public class UpdateUserAsyncCommandHandler(IProfileService profileService) : IRequestHandler<UpdateUserAsyncCommand>
    {
        private readonly IProfileService _profileService = profileService;
        public async Task Handle(UpdateUserAsyncCommand request, CancellationToken cancellationToken)
        {
            await _profileService.UpdateUserAsync(request.Adapt<UpdateDto>());
        }
    }

}
