using System.ComponentModel.DataAnnotations;

namespace PileOfShame.Api.Models
{
    public class CheckUsernameDto
    {
        [Required]
        public string Username { get; set; }
    }
}