﻿using AutoMapper;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.Pilates;
using Encuentros.Logic.Entities.Common;
using Encuentros.Logic.Entities.General;
using Encuentros.Logic.Entities.Pilates;
using Encuentros.Logic.Enums;
using Encuentros.Reports;
using Encuentros.Reports.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

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
        private readonly IGenericRepository<Movement> _movementRepo;
        private readonly IGenericRepository<ReceiptNumber> _receiptNumberRepo;

        public FeeController(IGenericRepository<Fee> repository,
                             IGenericRepository<Student> studentRepo,
                             IGenericRepository<Month> monthRepo,
                             IGenericRepository<FeeType> feeTypeRepo,
                             IGenericRepository<Movement> movementRepo,
                             IGenericRepository<ReceiptNumber> receiptNumberRepo,
                             IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
            _studentRepo = studentRepo;
            _monthRepo = monthRepo;
            _feeTypeRepo = feeTypeRepo;
            _movementRepo = movementRepo;
            _receiptNumberRepo = receiptNumberRepo;
        }

        private Expression<Func<Fee, object>>[] IncludeExpressions
        {
            get
            {
                var expressions = new List<Expression<Func<Fee, object>>>();

                expressions.Add(x => x.Month);
                expressions.Add(x => x.FeeType);
                expressions.Add(x => x.Student);
                expressions.Add(x => x.Movement);
                expressions.Add(x => x.Movement.MovementStatus);

                return expressions.ToArray();
            }
        }

        [HttpPost("search")]
        public ActionResult<IEnumerable<FeeDto>> Search(FeeSearchDto searchDto)
        {
            var fees = _repository.GetByQueryInclude(x => (searchDto.MonthId == 0 || x.Month.Id == searchDto.MonthId) &&
                                                          (!searchDto.StudentId.HasValue || searchDto.StudentId.Value == x.StudentId) &&
                                                          (!searchDto.MovementStatusId.HasValue || searchDto.MovementStatusId.Value == x.Movement.MovementStatusId),
                                                          IncludeExpressions);

            var response = _mapper.Map<IEnumerable<FeeDto>>(fees);

            return Ok(response);
        }

        [HttpPost]
        public ActionResult Create(FeeToCreateUpdateDto feeDto)
        {
            var student = _studentRepo.GetById(feeDto.StudentId);
            if (student == null)
                return NotFound("Student not found");

            var month = _monthRepo.GetById(feeDto.MonthId);
            if (month == null)
                return NotFound("Month not found");

            var feeType = _feeTypeRepo.GetById(feeDto.FeeTypeId);
            if (feeType == null)
                return NotFound("FeeType not found");

            if (feeDto.FeeTypeId != FeeType.IndividualId)
            {
                var feeRepeted = _repository.GetByQuery(x => x.StudentId == feeDto.StudentId && x.MonthId == feeDto.MonthId && x.FeeTypeId != FeeType.IndividualId);
                if (feeRepeted != null && feeRepeted.Count() > 0)
                    return ValidationProblem("El alumno ya tiene el mes abonado.");
            }

            Fee fee = new Fee(feeDto.StudentId, feeDto.FeeTypeId, feeDto.MonthId, feeDto.Amount, feeDto.IsPaid, student.FullName + " | " + month.Name);
            _repository.Create(fee);

            var response = _repository.GetByIdInclude(fee.Id, IncludeExpressions);

            return Ok(response);
        }

        [HttpGet("{id}")]
        public virtual ActionResult<FeeDto> GetById(long id)
        {
            var payment = _repository.GetByIdInclude(id, IncludeExpressions);

            if (payment == null)
                return NotFound();

            var response = _mapper.Map<FeeDto>(payment);
            return Ok(response);
        }

        [HttpPut("{id}")]
        public ActionResult<IEnumerable<FeeDto>> Update(FeeToCreateUpdateDto feeDto)
        {
            using (var context = _repository.GetContext())
            {
                var student = _studentRepo.GetById(feeDto.StudentId);
                if (student == null)
                    return NotFound("Student not found");

                var month = _monthRepo.GetById(feeDto.MonthId);
                if (month == null)
                    return NotFound("Month not found");

                var feeType = _feeTypeRepo.GetById(feeDto.FeeTypeId);
                if (feeType == null)
                    return NotFound("FeeType not found");

                if (feeDto.FeeTypeId != FeeType.IndividualId)
                {
                    var feeRepeted = _repository.GetByQuery(x => x.StudentId == feeDto.StudentId &&
                                                             x.MonthId == feeDto.MonthId &&
                                                             x.FeeTypeId != FeeType.IndividualId &&
                                                             x.Id != feeDto.Id);
                    if (feeRepeted != null && feeRepeted.Count() > 0)
                        return ValidationProblem("El alumno ya tiene el mes abonado.");
                }

                var entityRepo = _repository.GetByIdInclude(feeDto.Id, IncludeExpressions);
                if (entityRepo == null)
                    return NotFound();

                context.Attach(entityRepo);

                entityRepo.Update(feeDto.Amount, feeDto.FeeTypeId, feeDto.MonthId, feeDto.IsPaid);
                _repository.Update(entityRepo);

                var entity = _repository.GetByIdInclude(feeDto.Id, IncludeExpressions);

                var response = _mapper.Map<FeeDto>(entity);

                return Ok(response);
            }
        }

        [HttpDelete("{feeId}")]
        public ActionResult Delete(long feeId)
        {
            var entityRepo = _repository.GetByIdInclude(feeId, IncludeExpressions);
            if (entityRepo == null)
                return NotFound();

            _repository.Delete(feeId);
            _movementRepo.Delete(entityRepo.Movement.Id);

            _repository.SaveChanges();

            return Ok(feeId);
        }

        [HttpPut("movementStatus/{feeId}")]
        public ActionResult ChangeMovementStatus(ChangeMovementStatusDto changeMovementStatusDto)
        {
            using (var context = _repository.GetContext())
            {
                var entityRepo = _repository.GetByIdInclude(changeMovementStatusDto.EntityId, IncludeExpressions);
                if (entityRepo == null)
                    return NotFound();

                context.Attach(entityRepo);

                entityRepo.Movement.UpdateStatus(changeMovementStatusDto.MovementStatusId);

                _repository.Update(entityRepo);

                var entity = _repository.GetByIdInclude(changeMovementStatusDto.EntityId, IncludeExpressions);

                return Ok(entity);
            }
        }

        [HttpGet("receipt/{feeId}")]
        public ActionResult Receipt(long feeId)
        {
            using (var context = _repository.GetContext())
            {
                var fee = _repository.GetByIdInclude(feeId, IncludeExpressions);
                context.Attach(fee);

                string number = fee.Movement.ReceiptNumber;

                if (string.IsNullOrEmpty(number))
                {
                    var receiptNumber = _receiptNumberRepo.GetByQuery(x => x.ReceiptTypeId == (long)ReceiptTypeEnum.FeeReceipt).SingleOrDefault();
                    receiptNumber.IncrementNumber();
                    _receiptNumberRepo.Update(receiptNumber);

                    fee.Movement.SetReceiptNumber(receiptNumber.LastNumberFormatted);

                    _repository.Update(fee);

                    number = receiptNumber.LastNumberFormatted;
                }

                var receipt = new PilatesReceipt
                {
                    CustomerFullName = fee.Student.FullName,
                    PointOfSaleNumber = "00002",
                    ReceiptNumber = number,
                    Date = fee.Movement.Date.Value,
                    ReceiptConcepts = new List<ReceiptConcept>
                    {
                        new ReceiptConcept
                        {
                            Amount = fee.Movement.Amount,
                            Description = "Pilates - " + fee.Month.Name
                        }
                    }
                };

                var file = receipt.Create();

                return File(file, "application/pdf", "Recibo_" + fee.Month.Name + "_" + fee.Student.FullName + ".pdf");
            }
        }
    }
}