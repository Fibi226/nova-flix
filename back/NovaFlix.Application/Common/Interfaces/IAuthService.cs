using NovaFlix.Application.Features.Auth.Dto;

namespace NovaFlix.Application.Common.Interfaces
{
    public interface IAuthService
    {
        Task<TokenDto> LoginAsync(LoginDto dto);

        Task<TokenDto> RegisterAsync(RegisterDto dto);
    }
}
