using Encuentros.Logic.Base;
using Encuentros.Logic.Entities.Common;
using Encuentros.Logic.Entities.General;
using Encuentros.Logic.Enums;
using System;

namespace Encuentros.Logic.Entities.Pilates
{
    public class ProfessionalPayment : EntityBase
    {
        private ProfessionalPayment() { }

        public ProfessionalPayment(long professionalId, long monthId, decimal valueHour, int quantityHours, decimal amount, string comments)
        {
            ProfessionalId = professionalId;
            MonthId = monthId;
            ValueHour = valueHour;
            QuantityHours = quantityHours;
            Movement = new Movement(DateTime.Now, amount, comments, (long)ConceptEnum.ProfessionalPayment, (long)MovementStatusEnum.Paid);
        }

        public virtual long ProfessionalId { get; private set; }
        public virtual Professional Professional { get; private set; }
        public virtual long MonthId { get; private set; }
        public virtual Month Month { get; private set; }
        public virtual int QuantityHours { get; private set; }
        public virtual decimal ValueHour { get; private set; }
        public virtual long MovementId { get; private set; }
        public virtual Movement Movement { get; private set; }
    }
}
