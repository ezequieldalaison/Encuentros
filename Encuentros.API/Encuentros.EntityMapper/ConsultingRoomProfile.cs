using AutoMapper;
using Entity = Encuentros.Logic.Entities;
using DTO = Encuentros.DTOs.ConsultingRoom;

namespace Encuentros.EntityMapper
{
    public class ConsultingRoomProfile : Profile
    {
        public ConsultingRoomProfile()
        {
            CreateMap<Entity.Professional, DTO.ProfessionalDto>().ReverseMap();
        }
    }
}