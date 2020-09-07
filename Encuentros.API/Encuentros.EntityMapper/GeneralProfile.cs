using AutoMapper;
using System.Linq;
using DTO = Encuentros.DTOs.General;
using Entity = Encuentros.Logic.Entities.General;

namespace Encuentros.EntityMapper
{
    public class GeneralProfile : Profile
    {
        public GeneralProfile()
        {
            CreateMap<Entity.MovementStatus, DTO.MovementStatusDto>().ReverseMap();
            CreateMap<Entity.Movement, DTO.MovementDto>().ReverseMap();
            CreateMap<Entity.JournalSide, DTO.JournalSideDto>().ReverseMap();
            CreateMap<Entity.Concept, DTO.ConceptDto>().ReverseMap();

            CreateMap<Entity.Professional, DTO.ProfessionalDto>()
                    .ForMember(dest => dest.Areas, opt => opt.MapFrom(src => src.ProfessionalAreas.Select(x => x.Area).ToList()))
                    .ForMember(dest => dest.AreaIds, opt => opt.Ignore())
                    .ReverseMap();
        }
    }
}