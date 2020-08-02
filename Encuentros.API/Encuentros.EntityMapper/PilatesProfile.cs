using AutoMapper;
using Entity = Encuentros.Logic.Entities.Pilates;
using DTO = Encuentros.DTOs.Pilates;

namespace Encuentros.EntityMapper
{
    public class PilatesProfile : Profile
    {
        public PilatesProfile()
        {
            CreateMap<Entity.Student, DTO.StudentDto>().ReverseMap();
        }
    }
}