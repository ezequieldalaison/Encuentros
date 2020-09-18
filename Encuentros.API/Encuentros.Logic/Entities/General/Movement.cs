using Encuentros.Logic.Base;
using System;

namespace Encuentros.Logic.Entities.General
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

        public virtual DateTime Date { get; private set; }
        public virtual decimal Amount { get; private set; }
        public virtual string Comments { get; private set; }
        public virtual long ConceptId { get; private set; }
        public virtual Concept Concept { get; private set; }
        public virtual long MovementStatusId { get; private set; }
        public virtual MovementStatus MovementStatus { get; private set; }

        public void UpdateAmount(decimal amount)
        {
            Amount = amount;
        }
    }
}