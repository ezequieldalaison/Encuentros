using AutoMapper;
using Encuentros.API.Controllers.Base;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.Pilates;
using Encuentros.Logic.Entities.Pilates;
using Microsoft.AspNetCore.Mvc;

namespace Encuentros.API.Controllers.Pilates
{
    [Route("api/student")]
    [ApiController]
    public class StudentController : ControllerCRUAIBase<Student, StudentDto>
    {
        public StudentController(IGenericRepository<Student> repository, IMapper mapper)
            : base(repository, mapper)
        {
        }
    }
}