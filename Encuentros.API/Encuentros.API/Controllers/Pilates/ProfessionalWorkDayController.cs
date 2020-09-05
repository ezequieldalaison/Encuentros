using AutoMapper;
using Encuentros.API.Controllers.Base;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.Common;
using Encuentros.DTOs.Pilates;
using Encuentros.Logic.Entities.Common;
using Encuentros.Logic.Entities.Pilates;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Encuentros.API.Controllers.Pilates
{
    [Route("api/professionalWorkDay")]
    [ApiController]
    public class ProfessionalWorkDayController : ControllerCRUDBase<ProfessionalWorkDay, ProfessionalWorkDayDto>
    {
        private readonly IGenericRepository<WeeklyClass> _weeklyClassRepo;
        private readonly IGenericRepository<Professional> _professionalRepo;

        public ProfessionalWorkDayController(IGenericRepository<ProfessionalWorkDay> repository,
                                             IGenericRepository<WeeklyClass> weeklyClassRepo,
                                             IGenericRepository<Professional> professionalRepo,
                                             IMapper mapper)
            : base(repository, mapper)
        {
            _weeklyClassRepo = weeklyClassRepo;
            _professionalRepo = professionalRepo;
        }

        [HttpGet("suggestedProfessionals/{dayId}")]
        public ActionResult GetSuggestedProfessionalsByDate(long dayId)
        {
            var response = new List<ProfessionalWorkDayDto>();
            var weeklyClasses = _weeklyClassRepo.GetByQueryInclude(x => x.Day.Id == dayId && x.IsActive);
            var professionals = _professionalRepo.GetByQuery(x => x.ProfessionalAreas.Select(x => x.AreaId).Contains(1) && x.IsActive);

            foreach (var pro in professionals)
            {
                response.Add(new ProfessionalWorkDayDto
                {
                    InstructorId = pro.Id,
                    Instructor = _mapper.Map<ProfessionalDto>(pro),
                    QuantityHours = weeklyClasses.Count(x => x.InstructorId == pro.Id)
                });
            }

            return Ok(response);
        }
    }
}