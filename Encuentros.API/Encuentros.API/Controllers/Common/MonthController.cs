using AutoMapper;
using Encuentros.API.Controllers.Base;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.Common;
using Encuentros.Logic.Entities.Common;
using Microsoft.AspNetCore.Mvc;

namespace Encuentros.API.Controllers.Common
{
    [Route("api/month")]
    [ApiController]
    public class MonthController : ControllerCRUDBase<Month, MonthDto>
    {
        public MonthController(IGenericRepository<Month> repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}