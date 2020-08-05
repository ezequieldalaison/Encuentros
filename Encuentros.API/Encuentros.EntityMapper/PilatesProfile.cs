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
            CreateMap<Entity.Student, DTO.StudentDto>().ReverseMap();
            CreateMap<Entity.Instructor, DTO.InstructorDto>().ReverseMap();

            CreateMap<Entity.Student, DTO.ClassStudentDto>()
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.Name + " " + src.LastName))
                .ForMember(dest => dest.IsUpToDate, opt => opt.MapFrom(src => true));

            CreateMap<Entity.WeeklyClass, DTO.WeeklyClassDto>()
                .ForMember(dest => dest.Students, opt => opt.MapFrom(src => src.WeeklyClassStudents.Select(x => x.Student).ToList()))
                .ReverseMap();
        }
    }
}