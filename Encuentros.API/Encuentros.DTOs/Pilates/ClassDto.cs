using Encuentros.DTOs.Common;
using Encuentros.DTOs.General;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Encuentros.DTOs.Pilates
{
    public class ClassDto
    {
        public string Hour { get; set; }
        public DateTime Date { get; set; }
        public long ProfessionalId { get; set; }
        public ProfessionalDto Professional { get; set; }
        public DayDto Day { get; set; }
        public IList<ClassStudentDto> ClassStudents { get; set; }
        public bool IsClosed { get; set; }

        public void Fill(int quantityBeds)
        {
            while (ClassStudents.Count() < quantityBeds)
            {
                ClassStudents.Add(new ClassStudentDto(StudentDto.StudentFree, false));
            }
        }
    }
}
