using AutoMapper;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.Common;
using Encuentros.Logic.Entities.Common;
using Microsoft.AspNetCore.Mvc;

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
    }
}
