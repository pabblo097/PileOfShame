using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PileOfShame.Api;
using PileOfShame.Api.DAL;
using PileOfShame.Api.Entities;
using PileOfShame.Api.Repositories;
using System.Reflection;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

//SERVICES

builder.Services.AddControllers(options =>
{
    options.ReturnHttpNotAcceptable = true;
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//EF Core
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(connectionString, options =>
    {
    });
});

//Authentification
var authentificationSettings = new AuthentificationSettings();
builder.Configuration.GetSection("Authentification").Bind(authentificationSettings);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = "Bearer";
    options.DefaultScheme = "Bearer";
    options.DefaultChallengeScheme = "Bearer";
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = authentificationSettings.JwtIssuer,
        ValidAudience = authentificationSettings.JwtIssuer,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authentificationSettings.JwtKey))
    };
});

builder.Services.AddSingleton(authentificationSettings);
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();

//Automapper
builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());

//Repositories
builder.Services.AddScoped<IAccountRepository, AccountRepository>();
builder.Services.AddScoped<IGamesRepository, GamesRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();