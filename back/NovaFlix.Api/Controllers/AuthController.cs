using MediatR;
using Microsoft.AspNetCore.Mvc;
using NovaFlix.Application.Features.Auth;
using NovaFlix.Application.Features.Auth.Dto;

namespace NovaFlix.Api.Controllers
{
    public class AuthController(IMediator mediator) : ApiController
    {
        private readonly IMediator _mediator= mediator;

        [HttpPost("login")]
        public async Task<ActionResult<TokenDto>> LoginAsync([FromBody] LoginCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpPost("register")]
        public async Task<ActionResult<TokenDto>> RegisterAsync([FromBody] RegisterCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }

    }
}
