namespace Encuentros.DTOs.Pilates
{
    public class ClassStudentDto
    {
        public ClassStudentDto(StudentDto student, bool isIndividualClass)
        {
            Student = student;
            IsIndividualClass = isIndividualClass;
        }

        public StudentDto Student { get; set; }
        public bool IsIndividualClass { get; set; }
    }
}