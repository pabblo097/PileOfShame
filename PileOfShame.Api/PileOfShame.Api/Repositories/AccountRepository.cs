using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using PileOfShame.Api.DAL;
using PileOfShame.Api.Entities;
using PileOfShame.Api.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PileOfShame.Api.Repositories
{
    public interface IAccountRepository
    {
        void RegisterUser(UserRegisterDto userDto);

        string GenerateJwt(UserLoginDto userDto);

        bool CheckUsername(string username);
    }

    public class AccountRepository : IAccountRepository
    {
        private readonly AppDbContext dbContext;
        private readonly IPasswordHasher<User> passwordHasher;
        private readonly AuthentificationSettings authentificationSettings;

        public AccountRepository(AppDbContext dbContext, IPasswordHasher<User> passwordHasher, AuthentificationSettings authentificationSettings)
        {
            this.dbContext = dbContext;
            this.passwordHasher = passwordHasher;
            this.authentificationSettings = authentificationSettings;
        }

        public void RegisterUser(UserRegisterDto userDto)
        {
            var newUser = new User
            {
                Id = Guid.NewGuid(),
                Username = userDto.Username,
            };

            newUser.PasswordHash = passwordHasher.HashPassword(newUser, userDto.Password);

            dbContext.Users.Add(newUser);
            dbContext.SaveChanges();
        }

        public string GenerateJwt(UserLoginDto userDto)
        {
            //veryfing user
            var user = dbContext.Users
                .FirstOrDefault(u => u.Username == userDto.Username);

            if (user == null)
            {
                return null;
            }

            var isPasswordCorrect = passwordHasher.VerifyHashedPassword(user, user.PasswordHash, userDto.Password);

            if (isPasswordCorrect == PasswordVerificationResult.Failed)
            {
                return null;
            }

            //generate jwt
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authentificationSettings.JwtKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                    issuer: authentificationSettings.JwtIssuer,
                    audience: authentificationSettings.JwtIssuer,
                    claims: claims,
                    expires: DateTime.Now.AddDays(authentificationSettings.JwtExpireDays),
                    signingCredentials: credentials);

            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(token);
        }

        public bool CheckUsername(string username)
        {
            return dbContext.Users.Any(u => u.Username == username);
        }
    }
}