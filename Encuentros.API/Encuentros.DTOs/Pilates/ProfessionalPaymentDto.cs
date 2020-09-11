using Encuentros.DTOs.Base;
using Encuentros.DTOs.Common;
using Encuentros.DTOs.General;

namespace Encuentros.DTOs.Pilates
{
    public class ProfessionalPaymentDto : DtoBase
    {
        public long ProfessionalId { get; set; }
        public ProfessionalDto Professional { get; set; }
        public long MonthId { get; set; }
        public MonthDto Month { get; set; }
        public int QuantityHours { get; set; }
        public decimal ValueHour { get; set; }
        public long MovementId { get; set; }
        public MovementDto Movement { get; set; }
    }
}