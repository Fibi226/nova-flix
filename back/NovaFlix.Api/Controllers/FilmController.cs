using MediatR;
using Microsoft.AspNetCore.Mvc;
using NovaFlix.Application.Features.Films;
using NovaFlix.Application.Features.Films.Dto;
using NovaFlix.Domain.Entities;

namespace NovaFlix.Api.Controllers
{
    public class FilmController(IMediator mediator) : ApiController
    {
        private readonly IMediator _mediator = mediator;

        [HttpPost]
        public async Task<IActionResult> CreateFilmAsync([FromBody] CreateFilmCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FilmDto>>> GetAsync()
        {
            var result = await _mediator.Send(new GetAsyncQuery());
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Film>> GetByIdAsync(Guid id)
        {
            var result = await _mediator.Send(new GetByIdAsyncQuery(id));
            return Ok(result);
        }
    }
}
