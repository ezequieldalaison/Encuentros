using AutoMapper;
using Encuentros.API.Controllers.Base;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.ConsultingRoom;
using Encuentros.Logic.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Encuentros.API.Controllers
{
    [Route("api/professional")]
    [ApiController]
    public class ProfessionalController : ControllerCRUDBase<Professional, ProfessionalDto>
    {
        public ProfessionalController(IGenericRepository<Professional> repository, IMapper mapper) 
            : base(repository, mapper)
        {
        }

        //List<ProfessionalDto> list;

        //public ProfessionalController()
        //{
        //    list = new List<ProfessionalDto> {
        //        new ProfessionalDto { Id = 1, Name = "Ezequiel", LastName = "Dalaison", DocumentNumber = "35070715", Email = "eze@gmail.com", PhoneNumber ="3413474636", Percentage = 30, IsActive = true },
        //        new ProfessionalDto { Id = 2, Name = "Pepe", LastName = "Sanchez", DocumentNumber = "20445147", Email = "pepe@gmail.com", PhoneNumber ="34136535799", Percentage = 20, IsActive = true },
        //        new ProfessionalDto { Id = 3, Name = "Jose", LastName = "Gonzalez", DocumentNumber = "39001245", Email = "Jose@gmail.com", PhoneNumber ="3413471044", Percentage = 30, IsActive = true }
        //    };
        //}

        //[HttpGet]
        //public ActionResult Get()
        //{
        //    return Ok(list);
        //}

        //[HttpPost]
        //public ActionResult Post(ProfessionalDto p)
        //{
        //    p.IsActive = true;
        //    list.Add(p);
        //    return Ok(p);
        //}

        //[HttpPut("inactivate/{id}")]
        //public ActionResult Inactivate(long id)
        //{
        //    var p = list.Single(x => x.Id == id);
        //    p.IsActive = false;
        //    return Ok(p);
        //}


        //[HttpPut("activate/{id}")]
        //public ActionResult Activate(long id)
        //{
        //    var p = list.Single(x => x.Id == id);
        //    p.IsActive = true;
        //    return Ok(p);
        //}
    }
}