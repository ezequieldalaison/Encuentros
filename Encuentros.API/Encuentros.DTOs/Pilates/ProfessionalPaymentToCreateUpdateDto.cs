using Encuentros.DTOs.Base;
using System;

namespace Encuentros.DTOs.Pilates
{
    public class ProfessionalPaymentToCreateUpdateDto : DtoBase
    {
        public long ProfessionalId { get; set; }
        public long MonthId { get; set; }
        public int QuantityHours { get; set; }
        public decimal ValueHour { get; set; }
        public decimal Amount { get; set; }
    }
}