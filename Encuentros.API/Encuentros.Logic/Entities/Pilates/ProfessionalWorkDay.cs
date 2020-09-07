using Encuentros.Logic.Base;
using Encuentros.Logic.Entities.Common;
using System;

namespace Encuentros.Logic.Entities.Pilates
{
    public class ProfessionalWorkDay : EntityBase
    {
        public ProfessionalWorkDay(DateTime date, long professionalId, int quantityHours)
        {
            Date = date;
            ProfessionalId = professionalId;
            QuantityHours = quantityHours;
        }

        public DateTime Date { get; private set; }
        public long ProfessionalId { get; private set; }
        public Professional Professional { get; private set; }
        public int QuantityHours { get; private set; }
    }
}