using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using NovaFlix.Application.Features.Auth.Dto;
using NovaFlix.Infrastructure.Options;

namespace NovaFlix.Infrastructure.Helper
{
    public class TokenManipulation(IOptions<TokenOptions> options)
    {
        private readonly IOptions<TokenOptions> _options = options;
        public TokenDto CreateToken(UserTokenDto dto)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.Value.Token));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: GetClaims(dto),
                expires: DateTime.UtcNow.AddMonths(5),
                signingCredentials: cred
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return new TokenDto() { AcesToken = jwt };
        }
        public List<Claim> GetClaims(UserTokenDto dto)
        {
            var claims = new List<Claim>
            {
                new Claim("Name", dto.Name),
                new Claim("Id", dto.Id.ToString()),
                new Claim("Role", dto.Role.ToString())
            };
            return claims;
        }
    }
}
