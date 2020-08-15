using AutoMapper;
using Entity = Encuentros.Logic.Entities.Common;
using DTO = Encuentros.DTOs.Common;
using System.Linq;
using Encuentros.Logic.Entities.Common;

namespace Encuentros.EntityMapper
{
    public class CommonProfile : Profile
    {
        public CommonProfile()
        {
            CreateMap<Entity.Day, DTO.DayDto>().ReverseMap();
            CreateMap<Entity.Area, DTO.AreaDto>().ReverseMap();
            CreateMap<Entity.Month, DTO.MonthDto>().ReverseMap();
            CreateMap<Entity.MovementStatus, DTO.MovementStatusDto>().ReverseMap();
            CreateMap<Entity.Movement, DTO.MovementDto>().ReverseMap();

            CreateMap<Entity.Professional, DTO.ProfessionalDto>()
                .ForMember(dest => dest.Areas, opt => opt.MapFrom(src => src.ProfessionalAreas.Select(x => x.Area).ToList()))
                .ForMember(dest => dest.AreaIds, opt => opt.Ignore())
                .ReverseMap();
        }
    }
}