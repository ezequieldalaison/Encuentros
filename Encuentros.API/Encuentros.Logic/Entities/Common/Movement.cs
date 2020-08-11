using Encuentros.Logic.Base;
using System;

namespace Encuentros.Logic.Entities.Common
{
    public class Movement : EntityBase
    {
        public Movement(DateTime date, decimal amount, string comments, long conceptId, long movementStatusId)
        {
            Date = date;
            Amount = amount;
            Comments = comments;
            ConceptId = conceptId;
            MovementStatusId = movementStatusId;
        }

        public virtual DateTime Date { get; set; }
        public virtual decimal Amount { get; set; }
        public virtual string Comments { get; set; }
        public virtual long ConceptId { get; set; }
        public virtual Concept Concept { get; set; }
        public virtual long MovementStatusId { get; set; }
        public virtual MovementStatus MovementStatus { get; set; }
    }
}