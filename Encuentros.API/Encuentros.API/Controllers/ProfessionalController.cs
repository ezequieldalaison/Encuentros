using AutoMapper;
using Encuentros.API.Controllers.Base;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.ConsultingRoom;
using Encuentros.Logic.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Encuentros.API.Controllers
{
    [Route("api/professional")]
    [ApiController]
    public class ProfessionalController : ControllerCRUDBase<Professional, ProfessionalDto>
    {
        public ProfessionalController(IGenericRepository<Professional> repository, IMapper mapper) 
            : base(repository, mapper)
        {
        }

        [HttpPut("activate/{id}")]
        public ActionResult Activate(long id)
        {
            var entityRepo = _repository.GetById(id);
            if (entityRepo == null)
                return NotFound();

            entityRepo.Activate();
            _repository.Update(entityRepo);

            var response = _mapper.Map<ProfessionalDto>(entityRepo);
            return Ok(response);
        }

        [HttpPut("inactivate/{id}")]
        public ActionResult Inactivate(long id)
        {
            var entityRepo = _repository.GetById(id);
            if (entityRepo == null)
                return NotFound();

            entityRepo.Inactivate();
            _repository.Update(entityRepo);

            var response = _mapper.Map<ProfessionalDto>(entityRepo);
            return Ok(response);
        }
    }
}