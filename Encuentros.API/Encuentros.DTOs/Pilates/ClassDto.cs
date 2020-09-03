﻿using Encuentros.DTOs.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace Encuentros.DTOs.Pilates
{
    public class ClassDto
    {
        public string Hour { get; set; }
        public DateTime Date { get; set; }
        public long InstructorId { get; set; }
        public ProfessionalDto Instructor { get; set; }
        public DayDto Day { get; set; }
        public IList<ClassStudentDto> ClassStudents { get; set; }

        public void Fill()
        {
            while (ClassStudents.Count() < 4)
            {
                ClassStudents.Add(new ClassStudentDto(StudentDto.StudentFree, false));
            }
        }

        public void AddStudent(StudentDto student, bool isIndividualClass)
        {
            if (ClassStudents.Count < 4)
                ClassStudents.Add(new ClassStudentDto(student, isIndividualClass));
            else
                throw new ValidationException("No se puede agregar el alumno ya que la cantidad de alumnos en la clase supera la cantidad de lugares disponibles.");
        }
    }
}