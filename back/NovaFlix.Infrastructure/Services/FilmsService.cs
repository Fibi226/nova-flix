using Mapster;
using Microsoft.EntityFrameworkCore;
using NovaFlix.Application.Common.Interfaces;
using NovaFlix.Application.Features.Films.Dto;
using NovaFlix.Domain.Entities;
using NovaFlix.Infrastructure.Persistance;

namespace NovaFlix.Infrastructure.Services
{
    public class FilmsService(DatabaseContext db) : IFilmsService
    {
        private readonly DatabaseContext _db = db;
        public async Task CreateFilmAsync(CreateFilmDto dto)
        {
            await _db.Films.AddAsync(dto.Adapt<Film>());
            await _db.SaveChangesAsync();
        }

        public async Task<IEnumerable<FilmDto>> GetAsync()
        {
            return await _db.Films.ProjectToType<FilmDto>().ToListAsync();

        }

        public async Task<Film> GetByIdAsync(Guid id)
        {
            var film = await _db.Films.FirstOrDefaultAsync(film => film.Id == id);
            return film;
        }
    }
}
