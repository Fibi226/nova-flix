using MediatR;
using NovaFlix.Application.Common.Interfaces;
using NovaFlix.Domain.Entities;

namespace NovaFlix.Application.Features.Films
{
    public record GetByIdAsyncQuery(Guid Id) : IRequest<Film>;

    public class GetByIdAsyncQueryHandler(IFilmsService filmsService) : IRequestHandler<GetByIdAsyncQuery, Film>
    {
        private readonly IFilmsService _filmsService = filmsService;
        public async Task<Film> Handle(GetByIdAsyncQuery request, CancellationToken cancellationToken)
        {
            return await _filmsService.GetByIdAsync(request.Id);
        }
    }
}
