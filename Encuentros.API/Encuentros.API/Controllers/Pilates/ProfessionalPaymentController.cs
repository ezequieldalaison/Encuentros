using AutoMapper;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.Pilates;
using Encuentros.Logic.Entities.Common;
using Encuentros.Logic.Entities.General;
using Encuentros.Logic.Entities.Pilates;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Encuentros.API.Controllers.Pilates
{
    [Route("api/professionalPayment")]
    [ApiController]
    public class ProfessionalPaymentController : ControllerBase
    {
        private readonly IGenericRepository<ProfessionalPayment> _repository;
        private readonly IGenericRepository<Professional> _professionalRepo;
        private readonly IGenericRepository<Month> _monthRepo;
        private readonly IMapper _mapper;
        private readonly IGenericRepository<Movement> _movementRepo;

        public ProfessionalPaymentController(IGenericRepository<ProfessionalPayment> repository,
                                             IGenericRepository<Professional> professionalRepo,
                                             IGenericRepository<Month> monthRepo,
                                             IGenericRepository<Movement> movementRepo,
                                             IMapper mapper)
        {
            _repository = repository;
            _professionalRepo = professionalRepo;
            _monthRepo = monthRepo;
            _mapper = mapper;
            _movementRepo = movementRepo;
        }

        private Expression<Func<ProfessionalPayment, object>>[] IncludeExpressions
        {
            get
            {
                var expressions = new List<Expression<Func<ProfessionalPayment, object>>>();

                expressions.Add(x => x.Month);
                expressions.Add(x => x.Professional);
                expressions.Add(x => x.Movement);
                expressions.Add(x => x.Movement.MovementStatus);

                return expressions.ToArray();
            }
        }

        [HttpPost]
        public ActionResult Create(ProfessionalPaymentToCreateDto dto)
        {
            var professional = _professionalRepo.GetById(dto.ProfessionalId);
            if (professional == null)
                return NotFound("Professional not found");

            var month = _monthRepo.GetById(dto.MonthId);
            if (month == null)
                return NotFound("Month not found");

            if (dto.QuantityHours <= 0)
                return ValidationProblem("La cantidad de horas debe ser mayor a cero");

            var paymentRepeted = _repository.GetByQuery(x => x.ProfessionalId == dto.ProfessionalId && x.MonthId == dto.MonthId);
            if (paymentRepeted != null && paymentRepeted.Count() > 0)
                return ValidationProblem("El professional ya tiene el mes abonado.");

            var payment = new ProfessionalPayment(dto.ProfessionalId, dto.MonthId, dto.ValueHour, dto.QuantityHours, dto.Amount,
                                                    professional.FullName + " | " + month.Name);
            _repository.Create(payment);

            var entity = _repository.GetByIdInclude(payment.Id, IncludeExpressions);

            var response = _mapper.Map<ProfessionalPaymentDto>(entity);

            return Ok(response);
        }

        [HttpGet("month/{monthId}")]
        public ActionResult<IEnumerable<ProfessionalPaymentDto>> GetByMonth(long monthId)
        {
            var payments = _repository.GetByQueryInclude(x => x.Month.Id == monthId || monthId == 0,
                                                         IncludeExpressions);

            var response = _mapper.Map<IEnumerable<ProfessionalPaymentDto>>(payments);

            return Ok(response);
        }

        [HttpGet("{id}")]
        public virtual ActionResult<ProfessionalPaymentDto> GetById(long id)
        {
            var payment = _repository.GetByIdInclude(id, IncludeExpressions);

            if (payment == null)
                return NotFound();

            var response = _mapper.Map<ProfessionalPaymentDto>(payment);
            return Ok(response);
        }

        [HttpPut("{professionalPaymentId}")]
        public ActionResult Update(ProfessionalPaymentToCreateDto dto)
        {
            using (var context = _repository.GetContext())
            {
                var professional = _professionalRepo.GetById(dto.ProfessionalId);
                if (professional == null)
                    return NotFound("Professional not found");

                var month = _monthRepo.GetById(dto.MonthId);
                if (month == null)
                    return NotFound("Month not found");

                if (dto.QuantityHours <= 0)
                    return ValidationProblem("La cantidad de horas debe ser mayor a cero");

                var paymentRepeted = _repository.GetByQuery(x => x.ProfessionalId == dto.ProfessionalId && x.MonthId == dto.MonthId && x.Id != dto.Id);
                if (paymentRepeted != null && paymentRepeted.Count() > 0)
                    return ValidationProblem("El professional ya tiene el mes abonado.");

                var entityRepo = _repository.GetByIdInclude(dto.Id, IncludeExpressions);
                if (entityRepo == null)
                    return NotFound();

                context.Attach(entityRepo);

                entityRepo.Update(dto.QuantityHours, dto.ValueHour, dto.Amount);
                _repository.Update(entityRepo);

                var entity = _repository.GetByIdInclude(dto.Id, IncludeExpressions);

                var response = _mapper.Map<ProfessionalPaymentDto>(entity);

                return Ok(response);
            }
        }


        [HttpDelete("{professionalPaymentId}")]
        public ActionResult Delete(long professionalPaymentId)
        {
            var entityRepo = _repository.GetByIdInclude(professionalPaymentId, IncludeExpressions);
            if (entityRepo == null)
                return NotFound();

            _repository.Delete(professionalPaymentId);
            _movementRepo.Delete(entityRepo.Movement.Id);

            _repository.SaveChanges();

            return Ok(professionalPaymentId);
        }
    }
}