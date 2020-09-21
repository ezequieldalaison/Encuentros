using Encuentros.DTOs.Base;
using System;

namespace Encuentros.DTOs.General
{
    public class MovementDto : DtoBase
    {
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public string Comments { get; set; }
        public long ConceptId { get; set; }
        public ConceptDto Concept { get; set; }
        public long MovementStatusId { get; set; }
        public MovementStatusDto MovementStatus { get; set; }
        public bool IsPaid { get; set; }
    }
}
