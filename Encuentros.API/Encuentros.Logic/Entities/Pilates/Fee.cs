using Encuentros.Logic.Base;
using Encuentros.Logic.Entities.Common;
using Encuentros.Logic.Entities.General;
using Encuentros.Logic.Enums;
using System;

namespace Encuentros.Logic.Entities.Pilates
{
    public class Fee : EntityBase
    {
        private Fee() { }
        public Fee(long studentId, long feeTypeId, long monthId, decimal amount, bool isPaid, string comments)
        {
            StudentId = studentId;
            FeeTypeId = feeTypeId;
            MonthId = monthId;
            Movement = new Movement(DateTime.Now, amount, comments, (long)ConceptEnum.Fee, isPaid ? (long)MovementStatusEnum.Paid : (long)MovementStatusEnum.Pending);
        }

        public virtual long StudentId { get; private set; }
        public virtual Student Student { get; private set; }
        public virtual long FeeTypeId { get; private set; }
        public virtual FeeType FeeType { get; private set; }
        public virtual long MonthId { get; private set; }
        public virtual Month Month { get; private set; }
        public virtual long MovementId { get; private set; }
        public virtual Movement Movement { get; private set; }

        public bool IsPaid { get { return Movement.IsPaid; } }

        public void Update(decimal amount, long feeTypeId, long monthId, bool isPaid)
        {
            Movement.UpdateAmount(amount);
            Movement.UpdateStatus(isPaid ? (long)MovementStatusEnum.Paid : (long)MovementStatusEnum.Pending);
            FeeType = null;
            FeeTypeId = feeTypeId;
            Month = null;
            MonthId = monthId;
        }
    }
}