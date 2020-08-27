using AutoMapper;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.Common;
using Encuentros.DTOs.Pilates;
using Encuentros.Logic.Entities.Pilates;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Encuentros.API.Controllers.Pilates
{
    [Route("api/class")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private readonly IGenericRepository<WeeklyClass> _weeklyClassRepo;
        private readonly IGenericRepository<IndividualClassStudent> _individualClassStudentRepo;
        private readonly IMapper _mapper;

        public ClassController(IGenericAIRepository<WeeklyClass> weeklyClassRepo,
                                     IGenericRepository<IndividualClassStudent> individualClassStudentRepo,
                                     IMapper mapper)
        {
            _weeklyClassRepo = weeklyClassRepo;
            _individualClassStudentRepo = individualClassStudentRepo;
            _mapper = mapper;
        }

        /// <summary>
        /// Week = 0 => Current Week
        /// Week = positive => Next Weeks
        /// Week = negative => Previous Weeks
        /// </summary>
        /// <param name="week"></param>
        /// <returns></returns>
        [HttpGet("week/{week}")]
        public ActionResult<IEnumerable<ClassDto>> GetByWeek(int week)
        {
            var weeklyClasses = _weeklyClassRepo.GetAllInclude(x => x.WeeklyClassStudents,
                                                          x => x.WeeklyClassStudents.Select(w => w.Student),
                                                          x => x.WeeklyClassStudents.Select(w => w.Student.Fees),
                                                          x => x.WeeklyClassStudents.Select(w => w.Student.Fees.Select(f => f.Movement)),
                                                          x => x.Instructor,
                                                          x => x.Day);

            var multiplier = week == 0 ? 1 : week;

            var startDate = DateTime.Now.Date.AddDays((-(int)DateTime.Now.DayOfWeek) * multiplier); //previous Sunday
            var endDate = DateTime.Now.Date.AddDays((6 - (int)DateTime.Now.DayOfWeek) * multiplier); //next Saturday

            var individualClassStudents = _individualClassStudentRepo.GetByQueryInclude(x => x.Date >= startDate && x.Date <= endDate,
                                                                                        x => x.Student,
                                                                                        x => x.WeeklyClass);

            IList<ClassDto> response = new List<ClassDto>();

            while (startDate < endDate)
            {
                var wcs = weeklyClasses.Where(x => x.Day.Id == (long)startDate.DayOfWeek);

                foreach (var wc in wcs)
                {
                    var classStudents = _mapper.Map<IList<StudentDto>>(wc.WeeklyClassStudents.Select(x => x.Student));

                    var classDto = new ClassDto
                    {
                        Date = startDate,
                        Day = _mapper.Map<DayDto>(wc.Day),
                        Hour = wc.Hour,
                        Instructor = _mapper.Map<ProfessionalDto>(wc.Instructor),
                        InstructorId = wc.Instructor.Id,
                        Students = classStudents.Select(s => new ClassStudentDto(s, false)).ToList(),
                    };

                    var students = individualClassStudents.Where(x => x.WeeklyClassId == wc.Id).Select(x => x.Student);
                    IEnumerable<StudentDto> studentDtos = _mapper.Map<IEnumerable<StudentDto>>(students);

                    foreach (var s in studentDtos)
                    {
                        classDto.Students.Add(new ClassStudentDto(s, true));
                    }

                    classDto.Fill();

                    response.Add(classDto);
                }

                startDate = startDate.AddDays(1);
            }

            //var response = _mapper.Map<IEnumerable<WeeklyClassDto>>(weeklyClasses);

            //foreach (var weeklyClass in weeklyClasses)
            //{
            //    List<IndividualClassStudent> ics = individualClassStudents.Where(x => x.WeeklyClassId == weeklyClass.Id).ToList();
            //    ics.ForEach(x => weeklyClass.AddStudent(x.Student));

            //    weeklyClass.Fill();
            //}


            return Ok(response);
        }
    }
}
