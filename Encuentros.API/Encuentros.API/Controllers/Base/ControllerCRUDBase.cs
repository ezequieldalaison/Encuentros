using AutoMapper;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.Base;
using Encuentros.Logic.Base;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace Encuentros.API.Controllers.Base
{
    public abstract class ControllerCRUDBase<ENT, DTO> : ControllerBase
        where ENT : EntityBase
        where DTO : DtoBase
    {
        protected string ValidationMessage { get; set; }

        protected readonly IGenericRepository<ENT> _repository;
        protected readonly IMapper _mapper;

        public ControllerCRUDBase(IGenericRepository<ENT> repository,
                                  IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public virtual ActionResult<IEnumerable<DTO>> GetAll()
        {
            var entities = _repository.GetAll();
            var response = _mapper.Map<IEnumerable<DTO>>(entities);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public virtual ActionResult<DTO> GetById(long id)
        {
            var entity = _repository.GetById(id);
            if (entity == null)
                return NotFound();

            var response = _mapper.Map<DTO>(entity);
            return Ok(response);
        }

        [HttpPost]
        public virtual ActionResult Create(DTO dto)
        {
            if (dto.Id > 0)
                return BadRequest();

            if (!IsValidForCreate(dto))
                return ValidationProblem(ValidationMessage);

            var entity = _mapper.Map<ENT>(dto);
            _repository.Create(entity);

            var response = _mapper.Map<DTO>(entity);
            return Ok(response);
        }

        [HttpPut]
        public virtual ActionResult Update(DTO dto)
        {
            var entityRepo = _repository.GetById(dto.Id);
            if (entityRepo == null)
                return NotFound();

            var entity = _mapper.Map<ENT>(dto);
            _repository.Update(entity);
            return Ok();
        }

        [HttpDelete("{id}")]
        public virtual ActionResult Delete(long id)
        {
            var entityRepo = _repository.GetById(id);
            if (entityRepo == null)
                return NotFound();

            _repository.Delete(id);
            return Ok();
        }

        protected virtual bool IsValidForCreate(DTO dto)
        {
            return true;
        }
    }
}