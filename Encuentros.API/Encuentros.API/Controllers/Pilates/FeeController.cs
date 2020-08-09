using AutoMapper;
using Encuentros.API.Controllers.Base;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.Pilates;
using Encuentros.Logic.Entities.Pilates;
using Microsoft.AspNetCore.Mvc;

namespace Encuentros.API.Controllers.Pilates
{
    [Route("api/fee")]
    [ApiController]
    public class FeeController : ControllerCRUDBase<Fee, FeeDto>
    {
        public FeeController(IGenericRepository<Fee> repository,
                                     IMapper mapper)
            : base(repository, mapper)
        {
        }
    }
}