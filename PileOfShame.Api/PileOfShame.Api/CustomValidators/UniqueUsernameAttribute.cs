using PileOfShame.Api.DAL;
using System.ComponentModel.DataAnnotations;

namespace PileOfShame.Api.CustomValidators
{
    public class UniqueUsernameAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            string username = value as string;

            var dbContext = (AppDbContext)validationContext.GetService(typeof(AppDbContext));

            if (dbContext.Users.Any(u => u.Username == username))
            {
                return new ValidationResult("Username is already taken.");
            }

            return ValidationResult.Success;
        }
    }
}