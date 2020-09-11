using System;

namespace Encuentros.DTOs.Pilates
{
    public class ProfessionalPaymentToCreateDto
    {
        public long ProfessionalId { get; set; }
        public long MonthId { get; set; }
        public int QuantityHours { get; set; }
        public decimal ValueHour { get; set; }
        public decimal Amount { get; set; }
    }
}