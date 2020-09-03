using Encuentros.DTOs.Base;
using Encuentros.DTOs.Common;
using System;

namespace Encuentros.DTOs.Pilates
{
    public class ProfessionalWorkDayDto : DtoBase
    {
        public DateTime Date { get; set; }
        public long InstructorId { get; set; }
        public ProfessionalDto Instructor { get; set; }
        public int QuantityHours { get; set; }
    }
}