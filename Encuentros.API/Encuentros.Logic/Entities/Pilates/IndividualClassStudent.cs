﻿using Encuentros.Logic.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Encuentros.Logic.Entities.Pilates
{
    public class IndividualClassStudent : EntityBase
    {
        private IndividualClassStudent() { }

        public IndividualClassStudent(DateTime date, long weeklyClassId, long studentId)
        {
            Date = date;
            WeeklyClassId = weeklyClassId;
            StudentId = studentId;
        }

        public DateTime Date { get; set; }
        public long WeeklyClassId { get; set; }
        public WeeklyClass WeeklyClass { get; set; }
        public long StudentId { get; set; }
        public Student Student { get; set; }
    }
}