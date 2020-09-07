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
                    ProfessionalId = pro.Id,
                    Professional = _mapper.Map<ProfessionalDto>(pro),
                    QuantityHours = weeklyClasses.Count(x => x.ProfessionalId == pro.Id)
                });
            }

            return Ok(response);
        }

        [HttpGet("month/{monthId}")]
        public ActionResult GetProfessionalWorkDaysByMonth(long monthId)
        {
            var pwds = _repository.GetByQueryInclude(x => x.Date.Month == monthId && x.QuantityHours > 0,
                                                     x => x.Professional);
            var response = _mapper.Map<IEnumerable<ProfessionalWorkDayDto>>(pwds);
            return Ok(response);
        }


        [HttpGet("year/{year}")]
        public ActionResult GetProfessionalWorkDaysByYear(int year)
        {
            List<ProfessionalWorkDayDto> response = new List<ProfessionalWorkDayDto>();

            var pwds = _repository.GetByQueryInclude(x => x.Date.Year == year,
                                                     x => x.Professional);

            var grouped = pwds.GroupBy(x => new { x.Date.Month, x.Professional });

            foreach (var g in grouped)
            {
                var pwd = new ProfessionalWorkDayDto
                {
                    Date = new DateTime(year, g.Key.Month, 1),
                    Professional = _mapper.Map<ProfessionalDto>(g.Key.Professional),
                    ProfessionalId = g.Key.Professional.Id,
                    QuantityHours = g.Sum(x => x.QuantityHours)
                };

                response.Add(pwd);
            }

            return Ok(response);
        }
    }
}