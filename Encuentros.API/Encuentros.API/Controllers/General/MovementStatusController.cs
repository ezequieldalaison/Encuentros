using AutoMapper;
using Encuentros.API.Controllers.Base;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.General;
using Encuentros.Logic.Entities.General;
using Microsoft.AspNetCore.Mvc;

namespace Encuentros.API.Controllers.General
{
    [Route("api/movementStatus")]
    [ApiController]
    public class MovementStatusController : ControllerCRUDBase<MovementStatus, MovementStatusDto>
    {
        public MovementStatusController(IGenericRepository<MovementStatus> repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}