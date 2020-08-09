﻿using Encuentros.Logic.Base;
using System;

namespace Encuentros.Logic.Entities.Common
{
    public class Movement : EntityBase
    {
        public virtual DateTime Date { get; set; }
        public virtual decimal Amount { get; set; }
        public virtual int Comments { get; set; }
        public virtual Concept Concept { get; set; }
        public virtual MovementStatus MovementStatus { get; set; }
    }
}