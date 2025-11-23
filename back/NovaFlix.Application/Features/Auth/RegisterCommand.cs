using Mapster;
using MediatR;
using NovaFlix.Application.Common.Interfaces;
using NovaFlix.Application.Features.Auth.Dto;

namespace NovaFlix.Application.Features.Auth
{
    public record RegisterCommand(string Email, string Name, 
        string Password, string ConfirmPassword) : IRequest<TokenDto>;

    public class RegisterCommandHandler(IAuthService auth) : IRequestHandler<RegisterCommand, TokenDto>
    {
        private readonly IAuthService _auth = auth;
        public async Task<TokenDto> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            return await _auth.RegisterAsync(request.Adapt<RegisterDto>());
        }
    }
}
