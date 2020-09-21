using Encuentros.DTOs.Base;

namespace Encuentros.DTOs.Pilates
{
    public class FeeToCreateUpdateDto : DtoBase
    {
        public long StudentId { get; set; }
        public long MonthId { get; set; }
        public long FeeTypeId { get; set; }
        public decimal Amount { get; set; }
        public bool IsPaid { get; set; }
    }
}