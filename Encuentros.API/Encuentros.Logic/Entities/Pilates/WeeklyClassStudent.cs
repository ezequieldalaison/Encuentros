using Encuentros.Logic.Base;
using System;

namespace Encuentros.Logic.Entities.Pilates
{
    public class WeeklyClassStudent : EntityBase
    {
        private WeeklyClassStudent() { }

        public WeeklyClassStudent(WeeklyClass weeklyClass, Student student, DateTime dateFrom)
        {
            WeeklyClass = weeklyClass;
            WeeklyClassId = weeklyClass.Id;
            Student = student;
            StudentId = student.Id;
            DateFrom = dateFrom;
        }

        public WeeklyClassStudent(WeeklyClass weeklyClass, long studentId, DateTime dateFrom)
        {
            WeeklyClass = weeklyClass;
            WeeklyClassId = weeklyClass.Id;
            StudentId = studentId;
            DateFrom = dateFrom;
        }

        public long WeeklyClassId { get; private set; }
        public WeeklyClass WeeklyClass { get; private set; }
        public long StudentId { get; private set; }
        public Student Student { get; private set; }
        public DateTime DateFrom { get; private set; }
    }
}