using AutoMapper;
using Encuentros.API.Controllers.Base;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.Pilates;
using Encuentros.Logic.Entities.Common;
using Encuentros.Logic.Entities.Pilates;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Encuentros.API.Controllers.Pilates
{
    [Route("api/fee")]
    [ApiController]
    public class FeeController : ControllerBase
    {
        private readonly IGenericRepository<Fee> _repository;
        private readonly IMapper _mapper;
        private readonly IGenericRepository<Student> _studentRepo;
        private readonly IGenericRepository<Month> _monthRepo;
        private readonly IGenericRepository<FeeType> _feeTypeRepo;

        public FeeController(IGenericRepository<Fee> repository,
                             IGenericRepository<Student> studentRepo,
                             IGenericRepository<Month> monthRepo,
                             IGenericRepository<FeeType> feeTypeRepo,
                             IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
            _studentRepo = studentRepo;
            _monthRepo = monthRepo;
            _feeTypeRepo = feeTypeRepo;
        }

        [HttpGet("month/{monthId}")]
        public ActionResult<IEnumerable<FeeDto>> GetByMonth(long monthId)
        {
            var fees = _repository.GetByQueryInclude(x => x.Month.Id == monthId,
                                                     x => x.Month,
                                                     x => x.FeeType,
                                                     x => x.Student,
                                                     x => x.Movement,
                                                     x => x.Movement.MovementStatus);

            var response = _mapper.Map<IEnumerable<FeeDto>>(fees);

            return Ok(response);
        }

        [HttpPost]
        public ActionResult<IEnumerable<FeeDto>> Create(FeeToCreateDto feeDto)
        {
            var student = _studentRepo.GetById(feeDto.StudentId);
            if (student == null)
                return NotFound(new { Message = "Student not found" });

            var month = _monthRepo.GetById(feeDto.MonthId);
            if (month == null)
                return NotFound(new { Message = "Month not found" });

            var feeType = _studentRepo.GetById(feeDto.FeeTypeId);
            if (feeType == null)
                return NotFound(new { Message = "FeeType not found" });

            var feeRepeted = _repository.GetByQuery(x => x.StudentId == feeDto.StudentId && x.MonthId == feeDto.MonthId && x.FeeTypeId != FeeType.IndividualId);
            if (feeRepeted != null && feeRepeted.Count() > 0)
                return ValidationProblem("El alumno ya tiene el mes abonado.");

            Fee fee = new Fee(feeDto.StudentId, feeDto.FeeTypeId, feeDto.MonthId, feeDto.Amount, feeDto.IsPaid, student.FullName + " | " + month.Name);
            _repository.Create(fee);

            var response = _repository.GetByIdIncluding(fee.Id,
                                                        x => x.Month,
                                                        x => x.FeeType,
                                                        x => x.Student,
                                                        x => x.Movement,
                                                        x => x.Movement.MovementStatus);

            return Ok(response);
        }
    }
}