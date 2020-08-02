using AutoMapper;
using Encuentros.API.Controllers.Base;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.Pilates;
using Encuentros.Logic.Entities.Pilates;

namespace Encuentros.API.Controllers.Pilates
{
    public class StudentController : ControllerCRUAIBase<Student, StudentDto>
    {
        public StudentController(IGenericRepository<Student> repository, IMapper mapper)
            : base(repository, mapper)
        {
        }
    }
}