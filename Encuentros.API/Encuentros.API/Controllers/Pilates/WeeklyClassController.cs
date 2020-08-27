using AutoMapper;
using Encuentros.API.Controllers.Base;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.Pilates;
using Encuentros.Logic.Entities.Pilates;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Encuentros.API.Controllers.Pilates
{
    [Route("api/weeklyClass")]
    [ApiController]
    public class WeeklyClassController : ControllerCRUAIBase<WeeklyClass, WeeklyClassDto>
    {
        private readonly IGenericRepository<IndividualClassStudent> _individualClassStudentRepo;

        public WeeklyClassController(IGenericAIRepository<WeeklyClass> repository,
                                     IGenericRepository<IndividualClassStudent> individualClassStudentRepo,
                                     IMapper mapper)
            : base(repository, mapper)
        {
            _individualClassStudentRepo = individualClassStudentRepo;
        }

        protected override Expression<Func<WeeklyClass, object>>[] IncludeExpressions
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

        //[HttpGet]
        //public override ActionResult<IEnumerable<WeeklyClassDto>> GetAll()
        //{
        //    var weeklyClasses = _repository.GetAllInclude(x => x.WeeklyClassStudents,
        //                                                  x => x.WeeklyClassStudents.Select(w => w.Student),
        //                                                  x => x.WeeklyClassStudents.Select(w => w.Student.Fees),
        //                                                  x => x.WeeklyClassStudents.Select(w => w.Student.Fees.Select(f => f.Movement)),
        //                                                  x => x.Instructor,
        //                                                  x => x.Day);

        //    //foreach (var weeklyClass in weeklyClasses)
        //    //    weeklyClass.Fill();

        //    var response = _mapper.Map<IEnumerable<WeeklyClassDto>>(weeklyClasses);
        //    return Ok(response);
        //}

        //[HttpPost("search")]
        //public ActionResult GetByQuery(WeeklyClassSearchDto searchDto)
        //{
        //    var entities = _repository.GetByQueryInclude(x => x.IsActive || searchDto.ShowInactives,
        //                                                 x => x.WeeklyClassStudents,
        //                                                 x => x.WeeklyClassStudents.Select(w => w.Student),
        //                                                 x => x.WeeklyClassStudents.Select(w => w.Student.Fees),
        //                                                 x => x.WeeklyClassStudents.Select(w => w.Student.Fees.Select(f => f.Movement)),
        //                                                 x => x.Instructor,
        //                                                 x => x.Day);

        //    var response = _mapper.Map<IEnumerable<WeeklyClassDto>>(entities);
        //    return Ok(response);
        //}

        //[HttpGet("{id}")]
        //public override ActionResult<WeeklyClassDto> GetById(long id)
        //{
        //    var weeklyClass = GetEntityById(id);

        //    if (weeklyClass == null)
        //        return NotFound();

        //    //weeklyClass.Fill();

        //    var response = _mapper.Map<WeeklyClassDto>(weeklyClass);
        //    return Ok(response);
        //}

        public override ActionResult Update(WeeklyClassDto dto)
        {
            WeeklyClassDto response;
            using (var context = _repository.GetContext())
            {
                var weeklyClass = _repository.GetByIdInclude(dto.Id, IncludeExpressions);

                if (weeklyClass == null)
                    return NotFound();

                if (dto.Students.Where(x => x.Id > 0).GroupBy(x => x.Id).Any(x => x.Count() > 1))
                    return ValidationProblem("No puede haber alumnos repetidos la clase.");

                context.Attach(weeklyClass);

                weeklyClass.UpdateStudents(dto.Students.Select(x => x.Id));
                weeklyClass.SetInstructor(dto.InstructorId);

                _repository.Update(weeklyClass);

                weeklyClass = _repository.GetByIdInclude(dto.Id, IncludeExpressions);

                //weeklyClass.Fill();

                response = _mapper.Map<WeeklyClassDto>(weeklyClass);
            }

            return Ok(response);
        }

        //protected override WeeklyClass GetEntityById(long id)
        //{
        //    return _repository.GetByIdInclude(id, x => x.WeeklyClassStudents,
        //                                          x => x.WeeklyClassStudents.Select(w => w.Student),
        //                                          x => x.WeeklyClassStudents.Select(w => w.Student.Fees),
        //                                          x => x.WeeklyClassStudents.Select(w => w.Student.Fees.Select(f => f.Movement)),
        //                                          x => x.Instructor,
        //                                          x => x.Day);
        //}

        protected override bool IsValidForInactivate(WeeklyClass entityRepo)
        {
            if (entityRepo.WeeklyClassStudents.Count > 0)
            {
                ValidationMessage = "La clase no se puede inactivar por que tiene alumnos.";
                return false;
            }

            return true;
        }
    }
}