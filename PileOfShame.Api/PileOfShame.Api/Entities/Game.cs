namespace PileOfShame.Api.Entities
{
    public class Game
    {
        public Guid Id { get; set; }
        public int GameId { get; set; }
        public Guid UserId { get; set; }
    }
}