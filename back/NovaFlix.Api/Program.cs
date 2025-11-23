using Microsoft.AspNetCore.Http.Connections;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.OpenApi.Models;
using NovaFlix.Api.Extensions;
using NovaFlix.Api.Transformers;
using NovaFlix.Application.Common.Interfaces;
using NovaFlix.Application.Features.Films;
using NovaFlix.Application.Features.UserContext;
using NovaFlix.Infrastructure.Context;
using NovaFlix.Infrastructure.Helper;
using NovaFlix.Infrastructure.Options;
using NovaFlix.Infrastructure.Persistance;
using NovaFlix.Infrastructure.Services;

namespace NovaFlix.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddSwaggerGen();
            builder.Services.AddSwaggerGen(c =>
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "NovaFlix.API", Version = "v1" }));

            builder.Services.Configure<DatabaseConnection>(
                builder.Configuration.GetSection(DatabaseConnection.SectionName));
            builder.Services.Configure<TokenOptions>(
                builder.Configuration.GetSection(TokenOptions.SectionName));

            builder.Services.AddDbContext<DatabaseContext>(opts =>
                opts.UseNpgsql(
                    builder.Configuration.GetConnectionString("ApiDatabase")
                )
            );

            builder.Services.AddHttpContextAccessor();

            builder.Services.AddAuth(builder.Configuration);

            // DI Ijections
            builder.Services.AddScoped<IFilmsService, FilmsService>();
            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddScoped<IProfileService, ProfileService>();
            builder.Services.AddScoped<IUserContext, UserContext>();
            builder.Services.AddScoped<UpdateUser>();

            builder.Services.AddTransient<Encrypt>();
            builder.Services.AddTransient<ImageHelper>();
            builder.Services.AddTransient<TokenManipulation>();

            builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(CreateFilmCommand).Assembly));
            builder.Services.AddControllers();

            builder.Services.AddCors(o => o.AddPolicy("AllowAny", corsPolicyBuilder =>
            {
                corsPolicyBuilder
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowAnyOrigin();
            }));

            builder.Services.AddOpenApi();
            builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.Converters.Add(new TimeOnlyJsonConverter());
                });

            var app = builder.Build();


            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }
            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseCors("AllowAny");
            var contentPath = builder.Environment.ContentRootPath;
            var path = Path.Combine(contentPath, "Uploads");
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            app.UseStaticFiles(
                new StaticFileOptions
                {
                    FileProvider = new PhysicalFileProvider(
                        Path.Combine(builder.Environment.ContentRootPath,
                            "Uploads")),
                    RequestPath = "/Resources"
                });
            app.UseHttpsRedirection();


            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
