using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using NovaFlix.Infrastructure.Options;

namespace NovaFlix.Api.Extensions
{
    public static class JwtExtensions
    {
        public static IServiceCollection AddAuth(this IServiceCollection serviceCollection,
            IConfiguration configuration)
        {
            var tokenOptions = configuration.GetSection("Secret-Token").Get<TokenOptions>();

            serviceCollection.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(o =>
                {
                    o.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(tokenOptions.Token)
                        ),

                        RoleClaimType = "role"
                    };
                });

            serviceCollection.AddAuthorization();

            return serviceCollection;
        }
    }
}