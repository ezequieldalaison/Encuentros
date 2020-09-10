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
    [Route("api/concept")]
    [ApiController]
    public class ConceptController : ControllerCRUAIBase<Concept, ConceptDto>
    {
        public ConceptController(IGenericAIRepository<Concept> repository, IMapper mapper)
            : base(repository, mapper)
        {
        }

        protected override Expression<Func<Concept, object>>[] IncludeExpressions 
        {
            get
            {
                var expressions = new List<Expression<Func<Concept, object>>>();

                expressions.Add(x => x.JournalSide);
                expressions.Add(x => x.Area);

                return expressions.ToArray();
            }
        }

        [HttpGet("common/{areaId}")]
        public ActionResult GetCommonConceptsByArea(long areaId)
        {
            var concepts = _repository.GetByQueryInclude(x => x.IsCommon && x.Area.Id == areaId, IncludeExpressions);
            var response = _mapper.Map<IEnumerable<ConceptDto>>(concepts);
            return Ok(response);
        }
    }
}