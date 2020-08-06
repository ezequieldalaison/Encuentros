using AutoMapper;
using Entity = Encuentros.Logic.Entities.Common;
using DTO = Encuentros.DTOs.Common;

namespace Encuentros.EntityMapper
{
    public class CommonProfile : Profile
    {
        public CommonProfile()
        {
            CreateMap<Entity.Day, DTO.DayDto>().ReverseMap();
        }
    }
}