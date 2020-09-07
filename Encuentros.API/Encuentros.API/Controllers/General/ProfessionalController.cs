using AutoMapper;
using Encuentros.API.Controllers.Base;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.General;
using Encuentros.Logic.Entities.General;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Encuentros.API.Controllers.General
{
    [Route("api/professional")]
    [ApiController]
    public class ProfessionalController : ControllerCRUAIBase<Professional, ProfessionalDto>
    {
        public ProfessionalController(IGenericAIRepository<Professional> repository, IMapper mapper)
            : base(repository, mapper)
        {
        }

        protected override Expression<Func<Professional, object>>[] IncludeExpressions
        {
            get
            {
                var expressions = new List<Expression<Func<Professional, object>>>();

                expressions.Add(x => x.ProfessionalAreas);
                expressions.Add(x => x.ProfessionalAreas.Select(pa => pa.Area));

                return expressions.ToArray();
            }
        }

        [HttpPost]
        public override ActionResult Create(ProfessionalDto dto)
        {
            if (dto.Id > 0)
                return BadRequest();

            if (!IsValidForCreate(dto))
                return ValidationProblem(ValidationMessage);

            var entity = _mapper.Map<Professional>(dto);

            foreach (var areaId in dto.AreaIds)
            {
                entity.ProfessionalAreas.Add(new ProfessionalArea(entity.Id, areaId));
            }

            _repository.Create(entity);

            var entityCreated = _repository.GetByIdInclude(entity.Id, IncludeExpressions);
            var response = _mapper.Map<ProfessionalDto>(entityCreated);

            return Ok(response);
        }

        [HttpPut("{id}")]
        public override ActionResult Update(ProfessionalDto dto)
        {
            using (var context = _repository.GetContext())
            {
                var entityRepo = _repository.GetByIdInclude(dto.Id, IncludeExpressions);
                if (entityRepo == null)
                    return NotFound();

                var professional = _mapper.Map<Professional>(dto);
                professional.SetProfessionalAreas(entityRepo.ProfessionalAreas);

                context.Attach(professional);

                professional.UpdateAreas(dto.AreaIds);

                _repository.Update(professional);

                var entityUpdated = _repository.GetByIdInclude(dto.Id, IncludeExpressions);
                var response = _mapper.Map<ProfessionalDto>(entityUpdated);
                return Ok(response);
            }
        }

        [HttpPost("search")]
        public ActionResult GetByQuery(ProfessionalSearchDto searchDto)
        {
            var entities = _repository.GetByQueryInclude(x => (x.IsActive || searchDto.ShowInactives) &&
                    (x.Name.ToUpper().Contains(string.IsNullOrEmpty(searchDto.Name) ? string.Empty : searchDto.Name.ToUpper())) &&
                    (x.LastName.ToUpper().Contains(string.IsNullOrEmpty(searchDto.LastName) ? string.Empty : searchDto.LastName.ToUpper())) &&
                    (x.Name.ToUpper().Contains(string.IsNullOrEmpty(searchDto.FullName) ? string.Empty : searchDto.FullName.ToUpper()) ||
                     x.LastName.ToUpper().Contains(string.IsNullOrEmpty(searchDto.FullName) ? string.Empty : searchDto.FullName.ToUpper())),
                     IncludeExpressions);

            var response = _mapper.Map<IEnumerable<ProfessionalDto>>(entities);
            return Ok(response);
        }

        [HttpGet("area/{areaId}")]
        public ActionResult GetByQuery(long areaId)
        {
            var entities = _repository.GetByQuery(x => x.IsActive &&
                                                       x.ProfessionalAreas.Select(pa => pa.AreaId).Contains(areaId));

            var response = _mapper.Map<IEnumerable<ProfessionalDto>>(entities);
            return Ok(response);
        }
    }
}