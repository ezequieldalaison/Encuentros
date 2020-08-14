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
            CreateMap<Entity.Month, DTO.MonthDto>().ReverseMap();
            CreateMap<Entity.MovementStatus, DTO.MovementStatusDto>().ReverseMap();
            CreateMap<Entity.Movement, DTO.MovementDto>().ReverseMap();
            CreateMap<Entity.Professional, DTO.ProfessionalDto>().ReverseMap();
        }
    }
}