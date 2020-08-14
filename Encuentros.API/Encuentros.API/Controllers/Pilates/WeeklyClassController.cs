using AutoMapper;
using Encuentros.API.Controllers.Base;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.Pilates;
using Encuentros.Logic.Entities.Pilates;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace Encuentros.API.Controllers.Pilates
{
    [Route("api/weeklyClass")]
    [ApiController]
    public class WeeklyClassController : ControllerCRUDBase<WeeklyClass, WeeklyClassDto>
    {
        private readonly IGenericRepository<Student> _studentRepo;

        public WeeklyClassController(IGenericRepository<WeeklyClass> repository,
                                     IGenericRepository<Student> studentRepo,
                                     IMapper mapper)
            : base(repository, mapper)
        {
            _studentRepo = studentRepo;
        }

        [HttpGet]
        public override ActionResult<IEnumerable<WeeklyClassDto>> GetAll()
        {
            var weeklyClasses = _repository.GetAllInclude(x => x.WeeklyClassStudents,
                                                          x => x.WeeklyClassStudents.Select(w => w.Student),
                                                          x => x.WeeklyClassStudents.Select(w => w.Student.Fees),
                                                          x => x.WeeklyClassStudents.Select(w => w.Student.Fees.Select(f => f.Movement)),
                                                          x => x.Instructor,
                                                          x => x.Day);

            foreach (var weeklyClass in weeklyClasses)
                weeklyClass.Fill();

            var response = _mapper.Map<IEnumerable<WeeklyClassDto>>(weeklyClasses);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public override ActionResult<WeeklyClassDto> GetById(long id)
        {
            var weeklyClass = _repository.GetByIdIncluding(id, x => x.WeeklyClassStudents,
                                                               x => x.WeeklyClassStudents.Select(w => w.Student),
                                                               x => x.WeeklyClassStudents.Select(w => w.Student.Fees),
                                                               x => x.WeeklyClassStudents.Select(w => w.Student.Fees.Select(f => f.Movement)),
                                                               x => x.Instructor,
                                                               x => x.Day);
            if (weeklyClass == null)
                return NotFound();

            weeklyClass.Fill();

            var response = _mapper.Map<WeeklyClassDto>(weeklyClass);
            return Ok(response);
        }

        public override ActionResult Update(WeeklyClassDto dto)
        {
            WeeklyClassDto response;
            using (var context = _repository.GetContext())
            {
                var weeklyClass = _repository.GetByIdIncluding(dto.Id, x => x.WeeklyClassStudents,
                                                                       x => x.WeeklyClassStudents.Select(w => w.Student),
                                                                       x => x.WeeklyClassStudents.Select(w => w.Student.Fees),
                                                                       x => x.WeeklyClassStudents.Select(w => w.Student.Fees.Select(f => f.Movement)),
                                                                       x => x.Instructor,
                                                                       x => x.Day);

                if (weeklyClass == null)
                    return NotFound();

                if (dto.Students.GroupBy(x => x.Id).Any(x => x.Count() > 1))
                    return ValidationProblem("No puede haber alumnos repetidos la clase.");

                context.Attach(weeklyClass);

                weeklyClass.UpdateStudents(dto.Students.Select(x => x.Id));

                _repository.Update(weeklyClass);

                weeklyClass = _repository.GetByIdIncluding(dto.Id, x => x.WeeklyClassStudents,
                                                                   x => x.WeeklyClassStudents.Select(w => w.Student),
                                                                   x => x.WeeklyClassStudents.Select(w => w.Student.Fees),
                                                                   x => x.WeeklyClassStudents.Select(w => w.Student.Fees.Select(f => f.Movement)),
                                                                   x => x.Instructor,
                                                                   x => x.Day);
                weeklyClass.Fill();

                response = _mapper.Map<WeeklyClassDto>(weeklyClass);
            }

            return Ok(response);
        }
    }
}