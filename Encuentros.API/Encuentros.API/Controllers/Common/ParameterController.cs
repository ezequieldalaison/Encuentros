using AutoMapper;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.Common;
using Encuentros.Logic.Entities.Common;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Encuentros.API.Controllers.Common
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParameterController : ControllerBase
    {
        private readonly IGenericRepository<Parameter> _repository;
        private readonly IMapper _mapper;

        public ParameterController(IGenericRepository<Parameter> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public virtual ActionResult<ParameterDto> GetById(long id)
        {
            var parameter = _repository.GetById(id);
            if (parameter == null)
                return NotFound();

            var response = _mapper.Map<ParameterDto>(parameter);
            return Ok(response);
        }

        [HttpGet("area/{areaId}")]
        public virtual ActionResult<IEnumerable<ParameterDto>> GetByAreaId(long areaId)
        {
            var parameters = _repository.GetByQuery(x => x.AreaId == areaId);
            var response = _mapper.Map<IEnumerable<ParameterDto>>(parameters);
            return Ok(response);
        }

        [HttpPut("{id}")]
        public virtual ActionResult Update(ParameterDto dto)
        {
            var entityRepo = _repository.GetById(dto.Id);
            if (entityRepo == null)
                return NotFound();

            if (string.IsNullOrEmpty(dto.Value))
                return ValidationProblem("Debe ingresar un valor");

            var entity = _mapper.Map<Parameter>(dto);
            _repository.Update(entity);

            return Ok(dto);
        }
    }
}
