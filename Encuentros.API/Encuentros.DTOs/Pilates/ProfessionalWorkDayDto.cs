using Encuentros.DTOs.Base;
using Encuentros.DTOs.General;
using System;

namespace Encuentros.DTOs.Pilates
{
    public class ProfessionalWorkDayDto : DtoBase
    {
        public DateTime Date { get; set; }
        public long ProfessionalId { get; set; }
        public ProfessionalDto Professional { get; set; }
        public int QuantityHours { get; set; }
    }
}