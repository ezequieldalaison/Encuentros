using AutoMapper;
using DTO = Encuentros.DTOs.Common;
using Entity = Encuentros.Logic.Entities.Common;

namespace Encuentros.EntityMapper
{
    public class CommonProfile : Profile
    {
        public CommonProfile()
        {
            CreateMap<Entity.Day, DTO.DayDto>().ReverseMap();
            CreateMap<Entity.Area, DTO.AreaDto>().ReverseMap();
            CreateMap<Entity.Month, DTO.MonthDto>().ReverseMap();
        }
    }
}