using AutoMapper;
using Encuentros.API.Controllers.Base;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.Common;
using Encuentros.Logic.Entities.Common;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;

namespace Encuentros.API.Controllers.Common
{
    [Route("api/professional")]
    [ApiController]
    public class ProfessionalController : ControllerCRUAIBase<Professional, ProfessionalDto>
    {
        public ProfessionalController(IGenericAIRepository<Professional> repository, IMapper mapper)
            : base(repository, mapper)
        {
        }

        [HttpGet]
        public override ActionResult<IEnumerable<ProfessionalDto>> GetAll()
        {
            var professionals = _repository.GetAllInclude(x => x.ProfessionalAreas,
                                                          x => x.ProfessionalAreas.Select(pa => pa.Area));


            var response = _mapper.Map<IEnumerable<ProfessionalDto>>(professionals);
            return Ok(response);
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

            var entityCreated = GetEntityById(entity.Id);
            var response = _mapper.Map<ProfessionalDto>(entityCreated);

            return Ok(response);
        }

        [HttpPut("{id}")]
        public override ActionResult Update(ProfessionalDto dto)
        {
            using (var context = _repository.GetContext())
            {
                var entityRepo = GetEntityById(dto.Id);
                if (entityRepo == null)
                    return NotFound();

                var professional = _mapper.Map<Professional>(dto);
                professional.SetProfessionalAreas(entityRepo.ProfessionalAreas);

                context.Attach(professional);

                professional.UpdateAreas(dto.AreaIds);

                _repository.Update(professional);

                var entityUpdated = GetEntityById(dto.Id);
                var response = _mapper.Map<ProfessionalDto>(entityUpdated);
                return Ok(response);
            }
        }

        [HttpPost("search")]
        public ActionResult GetByQuery(ProfessionalSearchDto searchDto)
        {
            var entities = _repository.GetByQueryInclude(x => (x.IsActive || searchDto.showInactives) &&
                    (x.Name.ToUpper().Contains(string.IsNullOrEmpty(searchDto.Name) ? string.Empty : searchDto.Name.ToUpper())) &&
                    (x.LastName.ToUpper().Contains(string.IsNullOrEmpty(searchDto.LastName) ? string.Empty : searchDto.LastName.ToUpper())) &&
                    (x.Name.ToUpper().Contains(string.IsNullOrEmpty(searchDto.FullName) ? string.Empty : searchDto.FullName.ToUpper()) ||
                     x.LastName.ToUpper().Contains(string.IsNullOrEmpty(searchDto.FullName) ? string.Empty : searchDto.FullName.ToUpper())),
                     x => x.ProfessionalAreas, x => x.ProfessionalAreas.Select(x => x.Area));

            var response = _mapper.Map<IEnumerable<ProfessionalDto>>(entities);
            return Ok(response);
        }

        protected override Professional GetEntityById(long id)
        {
            return _repository.GetByIdInclude(id, x => x.ProfessionalAreas,
                                                    x => x.ProfessionalAreas.Select(pa => pa.Area));
        }
    }
}