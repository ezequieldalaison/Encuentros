using System;
using System.Collections.Generic;
using System.Text;

namespace Encuentros.DTOs.Pilates
{
    public class ClassDayDto
    {
        public DateTime Date { get; set; }
        public List<ProfessionalWorkDay> Professionals { get; set; }
    }

    public class ProfessionalWorkDay
    {
        public long ProfessionalId { get; set; }
        public int QuantityHours { get; set; }
    }
}
