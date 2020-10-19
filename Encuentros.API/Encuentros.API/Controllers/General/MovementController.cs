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
            var movements = _repository.GetByQueryInclude(x => x.Date.HasValue && x.Date.Value.Month == monthId, IncludeExpressions);

            var response = _mapper.Map<IEnumerable<MovementDto>>(movements);

            return Ok(response);
        }

        [HttpPut("{id}")]
        public override ActionResult Update(MovementDto dto)
        {
            var entityRepo = _repository.GetByIdInclude(dto.Id, IncludeExpressions);
            if (entityRepo == null)
                return NotFound();

            dto.MovementStatus = null;
            var entity = _mapper.Map<Movement>(dto);
            _repository.Update(entity);

            entity = _repository.GetByIdInclude(dto.Id, IncludeExpressions);
            dto = _mapper.Map<MovementDto>(entity);
            return Ok(dto);
        }

        protected override bool IsValidForCreate(MovementDto dto)
        {
            if (dto.ConceptId <= 0)
            {
                ValidationMessage = "Se debe seleccionar un concepto";
                return false;
            }

            if (dto.Date == DateTime.MinValue)
            {
                ValidationMessage = "Se debe seleccionar una fecha";
                return false;
            }

            return true;
        }
    }
}