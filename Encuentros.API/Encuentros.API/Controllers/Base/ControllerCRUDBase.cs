using AutoMapper;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.Base;
using Encuentros.Logic.Base;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

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
            var entities = _repository.GetAllInclude(IncludeExpressions);
            var response = _mapper.Map<IEnumerable<DTO>>(entities);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public virtual ActionResult<DTO> GetById(long id)
        {
            var entity = _repository.GetByIdInclude(id, IncludeExpressions);
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


        [HttpPost("list")]
        public virtual ActionResult CreateList(List<DTO> dtos)
        {
            foreach (var dto in dtos)
            {
                if (dto.Id > 0)
                    return BadRequest();

                if (!IsValidForCreate(dto))
                    return ValidationProblem(ValidationMessage);

                var entity = _mapper.Map<ENT>(dto);
                _repository.AddEntiy(entity);

                var response = _mapper.Map<DTO>(entity);
            }

            _repository.SaveChanges();

            return Ok(new { Message = "Ok" });
        }

        [HttpPut("{id}")]
        public virtual ActionResult Update(DTO dto)
        {
            var entityRepo = _repository.GetByIdInclude(dto.Id, IncludeExpressions);
            if (entityRepo == null)
                return NotFound();

            var entity = _mapper.Map<ENT>(dto);
            _repository.Update(entity);
            return Ok(dto);
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

        protected virtual Expression<Func<ENT, object>>[] IncludeExpressions { get; } = new Expression<Func<ENT, object>>[0];
    }
}