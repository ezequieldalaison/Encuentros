using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Collections.Generic;

namespace Encuentros.API.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpPost("login")]
        public ActionResult Login(UserDto dto)
        {
            if (dto.UserName == "kapsch\\dalaison")
                return Ok(new { Message = "Ok" });

            return NotFound(new { Message = "Usuario o Contraseña incorrecta." });
        }
    }
}

public class UserDto
{
    public string UserName { get; set; }
    public string Password { get; set; }
}