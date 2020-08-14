using AutoMapper;
using Encuentros.API.Controllers.Base;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.Common;
using Encuentros.Logic.Entities.Common;
using Microsoft.AspNetCore.Mvc;

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
    }
}