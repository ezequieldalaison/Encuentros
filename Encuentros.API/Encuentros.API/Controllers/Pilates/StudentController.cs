using AutoMapper;
using Encuentros.API.Controllers.Base;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.Pilates;
using Encuentros.Logic.Entities.Pilates;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Encuentros.API.Controllers.Pilates
{
    [Route("api/student")]
    [ApiController]
    public class StudentController : ControllerCRUAIBase<Student, StudentDto>
    {
        public StudentController(IGenericAIRepository<Student> repository, IMapper mapper)
            : base(repository, mapper)
        {
        }


        [HttpPost("search")]
        public virtual ActionResult GetByQuery(StudentSearchDto searchDto)
        {
            var entities = _repository.GetByQueryInclude(x => (x.IsActive || searchDto.showInactives) &&
                    (x.Name.ToUpper().Contains(string.IsNullOrEmpty(searchDto.Name) ? string.Empty : searchDto.Name.ToUpper())) &&
                    (x.LastName.ToUpper().Contains(string.IsNullOrEmpty(searchDto.LastName) ? string.Empty : searchDto.LastName.ToUpper())) &&
                    (x.Name.ToUpper().Contains(string.IsNullOrEmpty(searchDto.FullName) ? string.Empty : searchDto.FullName.ToUpper()) ||
                     x.LastName.ToUpper().Contains(string.IsNullOrEmpty(searchDto.FullName) ? string.Empty : searchDto.FullName.ToUpper())), 
                     x => x.WeeklyClassStudents);

            var response = _mapper.Map<IEnumerable<StudentDto>>(entities);
            return Ok(response);
        }
    }
}