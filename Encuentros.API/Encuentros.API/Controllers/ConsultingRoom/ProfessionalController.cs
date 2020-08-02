using AutoMapper;
using Encuentros.API.Controllers.Base;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.ConsultingRoom;
using Encuentros.Logic.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Encuentros.API.Controllers.ConsultingRoom
{
    [Route("api/professional")]
    [ApiController]
    public class ProfessionalController : ControllerCRUAIBase<Professional, ProfessionalDto>
    {
        public ProfessionalController(IGenericRepository<Professional> repository, IMapper mapper) 
            : base(repository, mapper)
        {
        }
    }
}