using AutoMapper;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.Common;
using Encuentros.DTOs.Pilates;
using Encuentros.Logic.Entities.Pilates;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.Web.CodeGeneration.Contracts.Messaging;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Linq.Expressions;

namespace Encuentros.API.Controllers.Pilates
{
    [Route("api/class")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private readonly IGenericRepository<WeeklyClass> _weeklyClassRepo;
        private readonly IGenericRepository<IndividualClassStudent> _individualClassStudentRepo;
        private readonly IGenericRepository<ProfessionalWorkDay> _professionalWorkDayRepo;
        private readonly IMapper _mapper;

        public ClassController(IGenericAIRepository<WeeklyClass> weeklyClassRepo,
                               IGenericRepository<IndividualClassStudent> individualClassStudentRepo,
                               IGenericRepository<ProfessionalWorkDay> professionalWorkDayRepo,
                               IMapper mapper)
        {
            _weeklyClassRepo = weeklyClassRepo;
            _individualClassStudentRepo = individualClassStudentRepo;
            _professionalWorkDayRepo = professionalWorkDayRepo;
            _mapper = mapper;
        }

        private Expression<Func<WeeklyClass, object>>[] WeeklyClassIncludeExpressions
        {
            get
            {
                var expressions = new List<Expression<Func<WeeklyClass, object>>>();

                expressions.Add(x => x.WeeklyClassStudents);
                expressions.Add(x => x.WeeklyClassStudents.Select(w => w.Student));
                expressions.Add(x => x.WeeklyClassStudents.Select(w => w.Student.Fees));
                expressions.Add(x => x.WeeklyClassStudents.Select(w => w.Student.Fees.Select(f => f.Movement)));
                expressions.Add(x => x.Instructor);
                expressions.Add(x => x.Day);

                return expressions.ToArray();
            }
        }

        private Expression<Func<IndividualClassStudent, object>>[] IndividualClassStudentIncludeExpressions
        {
            get
            {
                var expressions = new List<Expression<Func<IndividualClassStudent, object>>>();

                expressions.Add(x => x.WeeklyClass);
                expressions.Add(x => x.Student);

                return expressions.ToArray();
            }
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
            var weeklyClasses = _weeklyClassRepo.GetAllInclude(WeeklyClassIncludeExpressions);

            //var multiplier = 1 + week;

            var startDate = DateTime.Now.Date.AddDays((-(int)DateTime.Now.DayOfWeek) + (7 * week)); //previous Sunday
            var endDate = DateTime.Now.Date.AddDays((6 - (int)DateTime.Now.DayOfWeek) + (7 * week)); //next Saturday

            var individualClassStudents = _individualClassStudentRepo.GetByQueryInclude(x => x.Date >= startDate && x.Date <= endDate,
                                                                                        IndividualClassStudentIncludeExpressions);

            IList<ClassDto> response = new List<ClassDto>();

            while (startDate < endDate)
            {
                var wcs = weeklyClasses.Where(x => x.Day.Id == (long)startDate.DayOfWeek);

                foreach (var wc in wcs)
                {
                    var classStudents = _mapper.Map<IList<StudentDto>>(wc.WeeklyClassStudents.Where(x => x.DateFrom <= startDate).Select(x => x.Student));

                    var classDto = new ClassDto
                    {
                        Date = startDate,
                        Day = _mapper.Map<DayDto>(wc.Day),
                        Hour = wc.Hour,
                        Instructor = _mapper.Map<ProfessionalDto>(wc.Instructor),
                        InstructorId = wc.Instructor.Id,
                        ClassStudents = classStudents.Select(s => new ClassStudentDto(s, false)).ToList(),
                    };

                    var students = individualClassStudents.Where(x => x.WeeklyClassId == wc.Id).Select(x => x.Student);
                    IEnumerable<StudentDto> studentDtos = _mapper.Map<IEnumerable<StudentDto>>(students);

                    foreach (var s in studentDtos)
                    {
                        classDto.ClassStudents.Add(new ClassStudentDto(s, true));
                    }

                    classDto.Fill();

                    response.Add(classDto);
                }

                startDate = startDate.AddDays(1);
            }

            return Ok(response);
        }

        [HttpPost("getByCriteria")]

        public ActionResult<ClassDto> Get(GetClassDto criteria)
        {
            var weeklyClass = _weeklyClassRepo.GetByQueryInclude(x => x.Day.Id == (long)criteria.Date.DayOfWeek && x.Hour == criteria.Hour,
                                                                 WeeklyClassIncludeExpressions).SingleOrDefault();

            if (weeklyClass == null)
                return ValidationProblem("No se encontró la clase");

            var individualClassStudents = _individualClassStudentRepo.GetByQueryInclude(x => x.Date == criteria.Date && x.WeeklyClassId == weeklyClass.Id,
                                                                                        IndividualClassStudentIncludeExpressions);

            var classStudents = _mapper.Map<IList<StudentDto>>(weeklyClass.WeeklyClassStudents.Where(x => x.DateFrom <= criteria.Date).Select(x => x.Student));

            var classDto = new ClassDto
            {
                Date = criteria.Date,
                Day = _mapper.Map<DayDto>(weeklyClass.Day),
                Hour = weeklyClass.Hour,
                Instructor = _mapper.Map<ProfessionalDto>(weeklyClass.Instructor),
                InstructorId = weeklyClass.Instructor.Id,
                ClassStudents = classStudents.Select(s => new ClassStudentDto(s, false)).ToList(),
            };

            if (individualClassStudents.Count() > 0)
            {
                IEnumerable<StudentDto> studentDtos = _mapper.Map<IEnumerable<StudentDto>>(individualClassStudents.Select(x => x.Student));
                foreach (var s in studentDtos)
                {
                    classDto.ClassStudents.Add(new ClassStudentDto(s, true));
                }
            }

            classDto.Fill();

            return Ok(classDto);
        }

        [HttpPost]
        public ActionResult<ClassDto> Update(ClassDto dto)
        {
            if (dto.Date < DateTime.Now.Date)
                return ValidationProblem("No puede editar la clase ya que es de una fecha pasada.");

            using (var context = _weeklyClassRepo.GetContext())
            {
                var weeklyClass = _weeklyClassRepo.GetByQueryInclude(x => x.Day.Id == (long)dto.Date.DayOfWeek && x.Hour == dto.Hour,
                                                                     WeeklyClassIncludeExpressions).SingleOrDefault();

                if (weeklyClass == null)
                    return NotFound();

                if (dto.ClassStudents.Select(x => x.Student).Where(x => x.Id > 0).GroupBy(x => x.Id).Any(x => x.Count() > 1))
                    return ValidationProblem("No puede haber alumnos repetidos la clase.");

                context.Attach(weeklyClass);

                //Firstable we update the students who are monthly suscribed
                weeklyClass.UpdateStudents(dto.ClassStudents.Where(x => !x.IsIndividualClass).Select(x => x.Student).Select(x => x.Id), dto.Date);
                //Then we update the instructor
                weeklyClass.SetInstructor(dto.InstructorId);

                _weeklyClassRepo.Update(weeklyClass);

                //Then we have to update the IndividualClassStudents
                var individualClassStudents = _individualClassStudentRepo.GetByQuery(x => x.Date == dto.Date &&
                                                                     x.WeeklyClassId == weeklyClass.Id);

                //Remove the deleted students
                var toRemove = individualClassStudents.Where(x => !dto.ClassStudents.Where(x => x.IsIndividualClass)
                                                                      .Select(x => x.Student.Id).Contains(x.StudentId)).ToList();
                foreach (var item in toRemove)
                {
                    _individualClassStudentRepo.Delete(item.Id);
                }

                //And finally we add the new IndividualClassStudent
                var toAdd = dto.ClassStudents.Where(x => x.IsIndividualClass && !individualClassStudents.Select(p => p.StudentId).Contains(x.Student.Id)).ToList();

                foreach (var item in toAdd)
                {
                    _individualClassStudentRepo.Create(new IndividualClassStudent(dto.Date, weeklyClass.Id, item.Student.Id));
                }

                return Get(new GetClassDto { Date = dto.Date, Hour = dto.Hour });
            }
        }
    }
}
