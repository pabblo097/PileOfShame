using AutoMapper;
using PileOfShame.Api.Entities;

namespace PileOfShame.Api.AutoMapperProfiles
{
    public class GameProfile : Profile
    {
        public GameProfile()
        {
            CreateMap<Game, int>()
                .ConvertUsing(src => src.GameId);
        }
    }
}