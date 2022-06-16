using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PileOfShame.Api.Models;
using PileOfShame.Api.Repositories;
using System.Security.Claims;

namespace PileOfShame.Api.Controllers
{
    [Route("api/games")]
    [ApiController]
    [Authorize]
    public class GamesController : ControllerBase
    {
        private readonly IGamesRepository gamesRepository;
        private readonly IMapper mapper;

        public GamesController(IGamesRepository gamesRepository, IMapper mapper)
        {
            this.gamesRepository = gamesRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<int>>> GetGames()
        {
            var nameIdentifier = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var userId = Guid.Parse(nameIdentifier);

            var games = await gamesRepository.GetGamesAsync(userId);

            return Ok(mapper.Map<List<int>>(games));
        }

        [HttpPost]
        public IActionResult AddGame([FromBody] AddDeleteGameDto gameDto)
        {
            var nameIdentifier = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var userId = Guid.Parse(nameIdentifier);

            bool result = gamesRepository.AddGame(userId, gameDto.GameId);

            if (result == false)
            {
                return BadRequest($"Game with id:{gameDto.GameId} is already added for this user.");
            }

            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteGame([FromBody] AddDeleteGameDto gameDto)
        {
            var nameIdentifier = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var userId = Guid.Parse(nameIdentifier);

            bool result = gamesRepository.DeleteGame(userId, gameDto.GameId);

            if (result == false)
            {
                return BadRequest($"Game with id:{gameDto.GameId} do not exist for this user.");
            }

            return Ok();
        }
    }
}