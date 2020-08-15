using AutoMapper;
using Encuentros.API.Controllers.Base;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.Common;
using Encuentros.Logic.Entities.Common;
using Microsoft.AspNetCore.Mvc;

namespace Encuentros.API.Controllers.Common
{
    [Route("api/area")]
    [ApiController]
    public class AreaController : ControllerCRUDBase<Area, AreaDto>
    {
        public AreaController(IGenericRepository<Area> repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}