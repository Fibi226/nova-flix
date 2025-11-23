using Mapster;
using MediatR;
using NovaFlix.Application.Common.Interfaces;
using NovaFlix.Application.Features.Films.Dto;

namespace NovaFlix.Application.Features.Films
{
    public record CreateFilmCommand(
        string Title,
        string OriginalTitle,
        string ImageUrl,
        string Release,
        TimeOnly Duration,
        double Rating,
        List<string> Genres,
        string Producer,
        string Franchise,
        string Studio,
        int View,
        string FilmDescription,
        string LinkToTheOriginal,
        string LinkToTheUkrainianversion) : IRequest;


    public class CreateFilmCommandHandler(IFilmsService film) : IRequestHandler<CreateFilmCommand>
    {
        private readonly IFilmsService _film = film;
        public async Task Handle(CreateFilmCommand request, CancellationToken cancellationToken)
        {

            await film.CreateFilmAsync(request.Adapt<CreateFilmDto>());
        }
    }
}
