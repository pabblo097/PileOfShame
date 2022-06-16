using PileOfShame.Api.CustomValidators;
using System.ComponentModel.DataAnnotations;

namespace PileOfShame.Api.Models
{
    public class UserRegisterDto
    {
        [Required]
        [MaxLength(20)]
        [UniqueUsername]
        public string Username { get; set; }

        [Required]
        [MaxLength(40)]
        [Compare("ConfirmPassword")]
        public string Password { get; set; }

        [Required]
        public string ConfirmPassword { get; set; }
    }
}