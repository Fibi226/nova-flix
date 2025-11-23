using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NovaFlix.Application.Features.Profiles;
using NovaFlix.Application.Features.Profiles.Dto;

namespace NovaFlix.Api.Controllers
{
    [Authorize]
    public class ProfileController(IMediator mediator) : ApiController
    {
        private readonly IMediator _mediator = mediator;

        [HttpGet]
        public async Task<ActionResult<UserDto>> GetUsetAsync()
        {
            var result = await _mediator.Send(new GetUserAsyncQuery());
            return Ok(result);
        }

        [HttpPost("avatar")]
        public async Task<ActionResult<UrlDto>> UploadAvatarAsync([FromForm] UploadAvatarAsyncCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProfileAsync([FromBody] UpdateUserAsyncCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }

    }
}
