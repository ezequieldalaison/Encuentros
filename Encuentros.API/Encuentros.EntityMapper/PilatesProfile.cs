using AutoMapper;
using Entity = Encuentros.Logic.Entities.Pilates;
using DTO = Encuentros.DTOs.Pilates;
using System.Linq;
using System.Collections.Generic;

namespace Encuentros.EntityMapper
{
    public class PilatesProfile : Profile
    {
        public PilatesProfile()
        {
            CreateMap<Entity.Student, DTO.StudentDto>()
                .ForMember(dest => dest.FullName, opt => opt.Ignore())
                .ReverseMap();

            CreateMap<Entity.Instructor, DTO.InstructorDto>()
                .ForMember(dest => dest.FullName, opt => opt.Ignore())
                .ReverseMap();

            CreateMap<Entity.WeeklyClass, DTO.WeeklyClassDto>()
                .ForMember(dest => dest.Students, opt => opt.MapFrom(src => src.WeeklyClassStudents.Select(x => x.Student).ToList()))
                .ReverseMap();
        }
    }
}