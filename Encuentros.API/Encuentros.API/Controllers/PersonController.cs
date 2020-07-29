using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.Web.CodeGeneration.Contracts.Messaging;
using System.Collections;
using System.Collections.Generic;

namespace Encuentros.API.Controllers
{
    [Route("api/person")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        List<PersonDto> list;

        public PersonController()
        {
            list = new List<PersonDto> {
                new PersonDto { Name = "Eze", LastName = "Dala", DocumentNumber = "111111", Email = "eze@ed.com", PhoneNumber ="12312", Percentage = 30 },
                new PersonDto { Name = "Pepe", LastName = "Pepito", DocumentNumber = "2222", Email = "pepe@pepe.com", PhoneNumber ="222444", Percentage = 50 },
                new PersonDto { Name = "Joselito", LastName = "Gonzalez", DocumentNumber = "33333333", Email = "je@jeje.com", PhoneNumber ="545666", Percentage = 30 }
            };
        }

        [HttpGet]
        public ActionResult Get()
        {
            return Ok(list);
        }   

        [HttpPost]
        public ActionResult Post(PersonDto p)
        {
            list.Add(p);
            return Ok(p);
        }
    }
}

public class PersonDto
{
    public string Name { get; set; }
    public string LastName { get; set; }
    public string DocumentNumber { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public int Percentage { get; set; }
}