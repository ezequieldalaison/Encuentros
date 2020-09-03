using AutoMapper;
using Encuentros.API.Controllers.Base;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.Pilates;
using Encuentros.Logic.Entities.Pilates;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Encuentros.API.Controllers.Pilates
{
    [Route("api/weeklyClass")]
    [ApiController]
    public class WeeklyClassController : ControllerCRUAIBase<WeeklyClass, WeeklyClassDto>
    {
        private readonly IGenericRepository<IndividualClassStudent> _individualClassStudentRepo;

        public WeeklyClassController(IGenericAIRepository<WeeklyClass> repository,
                                     IGenericRepository<IndividualClassStudent> individualClassStudentRepo,
                                     IMapper mapper)
            : base(repository, mapper)
        {
            _individualClassStudentRepo = individualClassStudentRepo;
        }

        protected override Expression<Func<WeeklyClass, object>>[] IncludeExpressions
        {
            get
            {
                var expressions = new List<Expression<Func<WeeklyClass, object>>>();

                expressions.Add(x => x.WeeklyClassStudents);
                expressions.Add(x => x.WeeklyClassStudents.Select(w => w.Student));
                expressions.Add(x => x.WeeklyClassStudents.Select(w => w.Student.Fees));
                expressions.Add(x => x.WeeklyClassStudents.Select(w => w.Student.Fees.Select(f => f.Movement)));
                expressions.Add(x => x.Instructor);
                expressions.Add(x => x.Day);

                return expressions.ToArray();
            }
        }

        protected override bool IsValidForInactivate(WeeklyClass entityRepo)
        {
            if (entityRepo.WeeklyClassStudents.Count > 0)
            {
                ValidationMessage = "La clase no se puede inactivar por que tiene alumnos.";
                return false;
            }

            return true;
        }
    }
}