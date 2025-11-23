using Mapster;
using MediatR;
using NovaFlix.Application.Common.Interfaces;
using NovaFlix.Application.Features.Auth.Dto;

namespace NovaFlix.Application.Features.Auth
{
    public record LoginCommand(string Email, string Password) : IRequest<TokenDto>;

    public class LoginCommandHandler(IAuthService auth) : IRequestHandler<LoginCommand, TokenDto>
    {
        private readonly IAuthService _auth = auth;
        public async Task<TokenDto> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            return await _auth.LoginAsync(request.Adapt<LoginDto>());
        }
    }
}
