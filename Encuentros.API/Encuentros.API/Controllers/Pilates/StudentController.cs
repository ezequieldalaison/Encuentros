﻿using AutoMapper;
using Encuentros.API.Controllers.Base;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.Pilates;
using Encuentros.Logic.Entities.Pilates;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;
using System.Collections.Generic;
using System.Linq;

namespace Encuentros.API.Controllers.Pilates
{
    [Route("api/student")]
    [ApiController]
    public class StudentController : ControllerCRUAIBase<Student, StudentDto>
    {
        private readonly IGenericRepository<WeeklyClass> _weeklyClassRepo;

        public StudentController(IGenericAIRepository<Student> repository,
                                 IGenericRepository<WeeklyClass> weeklyClassRepo,
                                 IMapper mapper)
            : base(repository, mapper)
        {
            _weeklyClassRepo = weeklyClassRepo;
        }

        [HttpPost("search")]
        public ActionResult GetByQuery(StudentSearchDto searchDto)
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

        [HttpPut("inactivate/{id}")]
        public override ActionResult Inactivate(long id)
        {
            var entityRepo = _repository.GetById(id);
            if (entityRepo == null)
                return NotFound();

            var weeklyClasses = _weeklyClassRepo.GetByQuery(x => x.WeeklyClassStudents.Any(p => p.StudentId == id));
            if(weeklyClasses.Any())
                return ValidationProblem("El alumno no se puede inactivar ya que está inscripto en clases semanales.");

            entityRepo.Inactivate();
            _repository.Update(entityRepo);

            var response = _mapper.Map<StudentDto>(entityRepo);
            return Ok(response);
        }
    }
}