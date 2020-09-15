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
            CreateMap<Entity.FeeType, DTO.FeeTypeDto>().ReverseMap();

            CreateMap<Entity.Student, DTO.StudentDto>()
                .ForMember(dest => dest.FullName, opt => opt.Ignore())
                .ReverseMap();

            CreateMap<Entity.WeeklyClass, DTO.WeeklyClassDto>()
                .ForMember(dest => dest.Students, opt => opt.MapFrom(src => src.WeeklyClassStudents.Select(x => x.Student).ToList()))
                .ReverseMap();

            CreateMap<Entity.Fee, DTO.FeeDto>()
                .ReverseMap();

            CreateMap<Entity.ProfessionalWorkDay, DTO.ProfessionalWorkDayDto>()
                .ReverseMap();

            CreateMap<Entity.ProfessionalPayment, DTO.ProfessionalPaymentDto>()
                .ReverseMap(); 
        }
    }
}