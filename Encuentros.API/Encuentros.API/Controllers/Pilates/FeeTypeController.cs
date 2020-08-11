using AutoMapper;
using Encuentros.API.Controllers.Base;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.Pilates;
using Encuentros.Logic.Entities.Pilates;
using Microsoft.AspNetCore.Mvc;

namespace Encuentros.API.Controllers.Pilates
{
    [Route("api/feeType")]
    [ApiController]
    public class FeeTypeController : ControllerCRUDBase<FeeType, FeeTypeDto>
    {
        public FeeTypeController(IGenericRepository<FeeType> repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}