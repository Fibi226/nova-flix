using NovaFlix.Application.Features.Films.Dto;
using NovaFlix.Domain.Entities;

namespace NovaFlix.Application.Common.Interfaces
{
    public interface IFilmsService
    {
        Task CreateFilmAsync(CreateFilmDto dto);
        Task<IEnumerable<FilmDto>> GetAsync();
        Task<Film> GetByIdAsync(Guid id);
    }
}
