using Microsoft.EntityFrameworkCore;
using PileOfShame.Api.DAL;
using PileOfShame.Api.Entities;

namespace PileOfShame.Api.Repositories
{
    public interface IGamesRepository
    {
        Task<IEnumerable<Game>> GetGamesAsync(Guid userId);

        bool AddGame(Guid userId, int gameId);

        bool DeleteGame(Guid userId, int gameId);
    }

    public class GamesRepository : IGamesRepository
    {
        private readonly AppDbContext dbContext;

        public GamesRepository(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public bool AddGame(Guid userId, int gameId)
        {
            var game = dbContext.Games.Where(g => g.UserId == userId && g.GameId == gameId).FirstOrDefault();

            if (game != null)
            {
                return false;
            }

            var newGame = new Game
            {
                Id = Guid.NewGuid(),
                GameId = gameId,
                UserId = userId
            };

            dbContext.Games.Add(newGame);

            dbContext.SaveChanges();

            return true;
        }

        public bool DeleteGame(Guid userId, int gameId)
        {
            var game = dbContext.Games.Where(g => g.UserId == userId && g.GameId == gameId).FirstOrDefault();

            if (game == null)
            {
                return false;
            }

            dbContext.Games.Remove(game);
            dbContext.SaveChanges();

            return true;
        }

        public async Task<IEnumerable<Game>> GetGamesAsync(Guid userId)
        {
            return await dbContext.Games.Where(g => g.UserId == userId).ToListAsync();
        }
    }
}