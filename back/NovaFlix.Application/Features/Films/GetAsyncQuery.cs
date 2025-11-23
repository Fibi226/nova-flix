using MediatR;
using NovaFlix.Application.Common.Interfaces;
using NovaFlix.Application.Features.Films.Dto;

namespace NovaFlix.Application.Features.Films 
{
    public record GetAsyncQuery : IRequest<IEnumerable<FilmDto>>;

    public class GetAsyncQueryHandler(IFilmsService filmsService) : IRequestHandler<GetAsyncQuery, IEnumerable<FilmDto>>
    {
        private readonly IFilmsService _filmsService = filmsService;
        public async Task<IEnumerable<FilmDto>> Handle(GetAsyncQuery request, CancellationToken cancellationToken)
        {
            return await _filmsService.GetAsync();
        }
    }
}
