using AutoMapper;
using Encuentros.Data.Interfaces;
using Encuentros.DTOs.Pilates;
using Encuentros.Logic.Entities.Common;
using Encuentros.Logic.Entities.General;
using Encuentros.Logic.Entities.Pilates;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

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

        public ProfessionalPaymentController(IGenericRepository<ProfessionalPayment> repository,
                                             IGenericRepository<Professional> professionalRepo,
                                             IGenericRepository<Month> monthRepo,
                                             IMapper mapper)
        {
            _repository = repository;
            _professionalRepo = professionalRepo;
            _monthRepo = monthRepo;
            _mapper = mapper;
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

            var entity = _repository.GetByIdInclude(payment.Id,
                                                    x => x.Month,
                                                    x => x.Professional,
                                                    x => x.Movement,
                                                    x => x.Movement.MovementStatus);

            var response = _mapper.Map<ProfessionalPaymentDto>(entity);

            return Ok(response);
        }



        [HttpGet("month/{monthId}")]
        public ActionResult<IEnumerable<ProfessionalPaymentDto>> GetByMonth(long monthId)
        {
            var payments = _repository.GetByQueryInclude(x => x.Month.Id == monthId || monthId == 0,
                                                         x => x.Month,
                                                         x => x.Professional,
                                                         x => x.Movement,
                                                         x => x.Movement.MovementStatus);

            var response = _mapper.Map<IEnumerable<ProfessionalPaymentDto>>(payments);

            return Ok(response);
        }
    }
}