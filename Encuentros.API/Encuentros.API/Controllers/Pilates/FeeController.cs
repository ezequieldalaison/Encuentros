using AutoMapper;
using Encuentros.API.Controllers.Base;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.Pilates;
using Encuentros.Logic.Entities.Pilates;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Encuentros.API.Controllers.Pilates
{
    [Route("api/fee")]
    [ApiController]
    public class FeeController : ControllerCRUDBase<Fee, FeeDto>
    {
        public FeeController(IGenericRepository<Fee> repository,
                                     IMapper mapper)
            : base(repository, mapper)
        {
        }

        [HttpGet("month/{monthId}")]
        public ActionResult<IEnumerable<FeeDto>> GetByMonth(long monthId)
        {
            var fees = _repository.GetByQueryInclude(x => x.Month.Id == monthId,
                                                     x => x.Month,
                                                     x => x.FeeType,
                                                     x => x.Student,
                                                     x => x.Movement,
                                                     x => x.Movement.MovementStatus);

            var response = _mapper.Map<IEnumerable<FeeDto>>(fees);

            return Ok(response);
        }
    }
}