using Encuentros.Logic.Base;
using Encuentros.Logic.Entities.Common;
using System.Collections.Generic;

namespace Encuentros.Logic.Entities.Pilates
{
    public class WeeklyClass : EntityBase
    {
        public virtual string Hour { get; private set; }
        public virtual Instructor Instructor { get; private set; }
        public virtual Day Day { get; private set; }
        public virtual ICollection<WeeklyClassStudent> WeeklyClassStudents { get; private set; }

        public void Fill()
        {
            while (WeeklyClassStudents.Count < 4)
            {
                WeeklyClassStudents.Add(new WeeklyClassStudent(this, Student.StudentFree));
            }
        }
    }
}