namespace PileOfShame.Api.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public ICollection<Game> Games { get; set; } = new List<Game>();
    }
}