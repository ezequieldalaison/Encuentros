using Microsoft.AspNetCore.Mvc;

namespace Encuentros.API.Controllers
{
    [Route("api/health")]
    [ApiController]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get()
        {
            return Ok("It's alive!");
        }
    }
}