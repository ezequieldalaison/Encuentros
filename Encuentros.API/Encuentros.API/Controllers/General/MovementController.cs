using AutoMapper;
using Encuentros.API.Controllers.Base;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.General;
using Encuentros.Logic.Entities.General;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Encuentros.API.Controllers.General
{
    [Route("api/movement")]
    [ApiController]
    public class MovementController : ControllerCRUDBase<Movement, MovementDto>
    {
        public MovementController(IGenericRepository<Movement> repository, IMapper mapper) : base(repository, mapper)
        {
        }

        protected override Expression<Func<Movement, object>>[] IncludeExpressions
        {
            get
            {
                var expressions = new List<Expression<Func<Movement, object>>>();

                expressions.Add(x => x.Concept);
                expressions.Add(x => x.Concept.Area);
                expressions.Add(x => x.Concept.JournalSide);
                expressions.Add(x => x.MovementStatus);

                return expressions.ToArray();
            }
        }

        [HttpGet("month/{monthId}")]
        public ActionResult GetMovementsByMonth(long monthId)
        {
            var movements = _repository.GetByQueryInclude(x => x.Date.Month == monthId, IncludeExpressions);

            var response = _mapper.Map<IEnumerable<MovementDto>>(movements);

            return Ok(response);
        }
    }
}
