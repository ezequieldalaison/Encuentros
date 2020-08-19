using AutoMapper;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.Base;
using Encuentros.Logic.Base;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Encuentros.API.Controllers.Base
{
    /// <summary>
    /// CRUDAI: Create, Read, Update, Activate, Inactivate
    /// </summary>
    public class ControllerCRUAIBase<ENT, DTO> : ControllerCRUDBase<ENT, DTO>
        where ENT : EntityAIBase
        where DTO : DtoAIBase
    {
        public ControllerCRUAIBase(IGenericAIRepository<ENT> repository,
                                  IMapper mapper)
            : base(repository, mapper)
        {
        }

        [HttpPut("activate/{id}")]
        public virtual ActionResult Activate(long id)
        {
            var entityRepo = GetEntityById(id);
            if (entityRepo == null)
                return NotFound();

            entityRepo.Activate();
            _repository.Update(entityRepo);

            var response = _mapper.Map<DTO>(entityRepo);
            return Ok(response);
        }

        [HttpPut("inactivate/{id}")]
        public virtual ActionResult Inactivate(long id)
        {
            var entityRepo = GetEntityById(id);
            if (entityRepo == null)
                return NotFound();

            if (!IsValidForInactivate(entityRepo))
                return ValidationProblem(ValidationMessage);

            entityRepo.Inactivate();
            _repository.Update(entityRepo);

            var response = _mapper.Map<DTO>(entityRepo);
            return Ok(response);
        }

        public override ActionResult Delete(long id)
        {
            throw new NotImplementedException("This entity could not be deleted.");
        }

        protected virtual bool IsValidForInactivate(ENT entityRepo)
        {
            return true;
        }
    }
}