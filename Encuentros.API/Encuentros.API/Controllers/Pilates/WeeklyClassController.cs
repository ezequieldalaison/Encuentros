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
            var entities = _repository.GetAllInclude(x => x.WeeklyClassStudents, 
                                                     x => x.WeeklyClassStudents.Select(w => w.Student),
                                                     x => x.Instructor);
            
            foreach (var weeklyClass in entities)
                weeklyClass.Fill();

            var response = _mapper.Map<IEnumerable<WeeklyClassDto>>(entities);
            return Ok(response);
        }
    }
}