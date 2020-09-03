using AutoMapper;
using Encuentros.API.Controllers.Base;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.Pilates;
using Encuentros.Logic.Entities.Pilates;
using Microsoft.AspNetCore.Mvc;

namespace Encuentros.API.Controllers.Pilates
{
    [Route("api/professionalWorkDay")]
    [ApiController]
    public class ProfessionalWorkDayController : ControllerCRUDBase<ProfessionalWorkDay, ProfessionalWorkDayDto>
    {
        public ProfessionalWorkDayController(IGenericRepository<ProfessionalWorkDay> repository, IMapper mapper) 
            : base(repository, mapper)
        {
        }
    }
}