using AutoMapper;
using Encuentros.API.Controllers.Base;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.Pilates;
using Encuentros.Logic.Entities.Pilates;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;

namespace Encuentros.API.Controllers.Pilates
{
    [Route("api/weeklyClass")]
    [ApiController]
    public class WeeklyClassController : ControllerCRUDBase<WeeklyClass, WeeklyClassDto>
    {
        public WeeklyClassController(IGenericRepository<WeeklyClass> repository, IMapper mapper)
            : base(repository, mapper)
        {
        }

        [HttpGet]
        public override ActionResult<IEnumerable<WeeklyClassDto>> GetAll()
        {
            var weeklyClasses = _repository.GetAllInclude(x => x.WeeklyClassStudents,
                                                          x => x.WeeklyClassStudents.Select(w => w.Student),
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
                                                               x => x.Instructor,
                                                               x => x.Day);
            if (weeklyClass == null)
                return NotFound();

            weeklyClass.Fill();

            var response = _mapper.Map<WeeklyClassDto>(weeklyClass);
            return Ok(response);
        }
    }
}