using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PileOfShame.Api.Entities;

namespace PileOfShame.Api.DAL
{
    public class AppDbContext : DbContext
    {
        private readonly IPasswordHasher<User> passwordHasher;

        public AppDbContext(DbContextOptions<AppDbContext> options, IPasswordHasher<User> passwordHasher) : base(options)
        {
            this.passwordHasher = passwordHasher;
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Game> Games { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Game>(config =>
            {
                config.HasKey(g => g.Id);
                config.Property(g => g.GameId).IsRequired();
            });

            builder.Entity<User>(config =>
            {
                config.HasKey(u => u.Id);
                config.Property(u => u.Username).IsRequired();
                config.Property(u => u.PasswordHash).IsRequired();
            });
        }
    }
}