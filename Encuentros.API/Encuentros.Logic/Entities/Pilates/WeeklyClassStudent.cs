namespace Encuentros.Logic.Entities.Pilates
{
    public class WeeklyClassStudent
    {
        private WeeklyClassStudent() { }

        public WeeklyClassStudent(WeeklyClass weeklyClass, Student student)
        {
            WeeklyClass = weeklyClass;
            WeeklyClassId = weeklyClass.Id;
            Student = student;
            StudentId = student.Id;
        }

        public long WeeklyClassId { get; set; }
        public WeeklyClass WeeklyClass { get; set; }
        public long StudentId { get; set; }
        public Student Student { get; set; }
    }
}