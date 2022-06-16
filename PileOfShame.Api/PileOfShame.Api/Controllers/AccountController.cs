using Microsoft.AspNetCore.Mvc;
using PileOfShame.Api.Models;
using PileOfShame.Api.Repositories;

namespace PileOfShame.Api.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository accountRepository;

        public AccountController(IAccountRepository accountRepository)
        {
            this.accountRepository = accountRepository;
        }

        [HttpPost("register")]
        public IActionResult RegisterUser([FromBody] UserRegisterDto userDto)
        {
            accountRepository.RegisterUser(userDto);

            return Ok();
        }

        [HttpPost("login")]
        public IActionResult LoginUser([FromBody] UserLoginDto userDto)
        {
            var token = accountRepository.GenerateJwt(userDto);

            if (token == null)
            {
                return BadRequest("Wrong email and/or password.");
            }

            return Ok(token);
        }

        [HttpPost("isUsernameTaken")]
        public ActionResult<bool> CheckUsername([FromBody] CheckUsernameDto checkUsernameDto)
        {
            bool result = accountRepository.CheckUsername(checkUsernameDto.Username);

            return Ok(result);
        }
    }
}