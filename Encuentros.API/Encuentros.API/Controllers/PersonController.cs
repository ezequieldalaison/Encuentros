using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.Web.CodeGeneration.Contracts.Messaging;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace Encuentros.API.Controllers
{
    [Route("api/professional")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        List<PersonDto> list;

        public PersonController()
        {
            list = new List<PersonDto> {
                new PersonDto { Id = 1, Name = "Eze", LastName = "Dala", DocumentNumber = "111111", Email = "eze@ed.com", PhoneNumber ="12312", Percentage = 30, IsActive = true },
                new PersonDto { Id = 2, Name = "Pepe", LastName = "Pepito", DocumentNumber = "2222", Email = "pepe@pepe.com", PhoneNumber ="222444", Percentage = 50, IsActive = true },
                new PersonDto { Id = 3, Name = "Joselito", LastName = "Gonzalez", DocumentNumber = "33333333", Email = "je@jeje.com", PhoneNumber ="545666", Percentage = 30, IsActive = true }
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

        [HttpPut("inactivate/{id}")]
        public ActionResult Inactivate(long id)
        {
            var p = list.Single(x => x.Id == id);
            p.IsActive = false;
            return Ok(p);
        }


        [HttpPut("activate/{id}")]
        public ActionResult Activate(long id)
        {
            var p = list.Single(x => x.Id == id);
            p.IsActive = true;
            return Ok(p);
        }
    }
}

public class PersonDto
{
    public long Id { get; set; }
    public string Name { get; set; }
    public string LastName { get; set; }
    public string DocumentNumber { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public int Percentage { get; set; }
    public bool IsActive { get; set; }
}