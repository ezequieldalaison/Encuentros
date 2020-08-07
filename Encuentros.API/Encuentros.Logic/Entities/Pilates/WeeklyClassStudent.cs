using Encuentros.Logic.Base;

namespace Encuentros.Logic.Entities.Pilates
{
    public class WeeklyClassStudent : EntityBase
    {
        private WeeklyClassStudent() { }

        public WeeklyClassStudent(WeeklyClass weeklyClass, Student student)
        {
            WeeklyClass = weeklyClass;
            WeeklyClassId = weeklyClass.Id;
            Student = student;
            StudentId = student.Id;
        }

        public WeeklyClassStudent(WeeklyClass weeklyClass, long studentId)
        {
            WeeklyClass = weeklyClass;
            WeeklyClassId = weeklyClass.Id;
            StudentId = studentId;
        }

        public long WeeklyClassId { get; private set; }
        public WeeklyClass WeeklyClass { get; private set; }
        public long StudentId { get; private set; }
        public Student Student { get; private set; }
    }
}