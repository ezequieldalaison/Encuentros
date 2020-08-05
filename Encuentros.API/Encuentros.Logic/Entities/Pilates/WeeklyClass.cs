using Encuentros.Logic.Base;
using System;
using System.Collections.Generic;

namespace Encuentros.Logic.Entities.Pilates
{
    public class WeeklyClass : EntityBase
    {
        public virtual long DayId { get; private set; }
        public virtual string Hour { get; private set; }
        public virtual ICollection<WeeklyClassStudent> WeeklyClassStudents { get; private set; }

        public void Fill()
        {
            while(WeeklyClassStudents.Count < 4)
            {
                WeeklyClassStudents.Add(new WeeklyClassStudent(this, Student.StudentFree));
            }
        }
    }
}