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

        public virtual long StudentId { get; set; }
        public virtual Student Student { get; set; }
        public virtual long FeeTypeId { get; set; }
        public virtual FeeType FeeType { get; set; }
        public virtual long MonthId { get; set; }
        public virtual Month Month { get; set; }
        public virtual Movement Movement { get; set; }
    }
}