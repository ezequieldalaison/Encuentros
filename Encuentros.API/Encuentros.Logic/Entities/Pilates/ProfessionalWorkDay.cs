using Encuentros.Logic.Base;
using Encuentros.Logic.Entities.Common;
using System;

namespace Encuentros.Logic.Entities.Pilates
{
    public class ProfessionalWorkDay : EntityBase
    {
        public ProfessionalWorkDay(DateTime date, long instructorId, int quantityHours)
        {
            Date = date;
            InstructorId = instructorId;
            QuantityHours = quantityHours;
        }

        public DateTime Date { get; private set; }
        public long InstructorId { get; private set; }
        public Professional Instructor { get; private set; }
        public int QuantityHours { get; private set; }
    }
}