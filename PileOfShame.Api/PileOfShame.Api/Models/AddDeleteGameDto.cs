using System.ComponentModel.DataAnnotations;

namespace PileOfShame.Api.Models
{
    public class AddDeleteGameDto
    {
        [Required]
        public int GameId { get; set; }
    }
}