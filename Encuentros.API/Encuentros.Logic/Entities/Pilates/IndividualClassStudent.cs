using Encuentros.Logic.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Encuentros.Logic.Entities.Pilates
{
    public class IndividualClassStudent : EntityBase
    {
        public DateTime Date { get; set; }
        public long WeeklyClassId { get; set; }
        public WeeklyClass WeeklyClass { get; set; }
        public long StudentId { get; set; }
        public Student Student { get; set; }
    }
}