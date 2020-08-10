﻿using Encuentros.DTOs.Base;
using System;

namespace Encuentros.DTOs.Common
{
    public class MovementDto : DtoBase
    {
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public string Comments { get; set; }
        //public ConceptDto Concept { get; set; }
        public MovementStatusDto MovementStatus { get; set; }
    }
}