using Encuentros.Logic.Base;
using System.Collections;
using System.Collections.Generic;

namespace Encuentros.Logic.Entities.Pilates
{
    public class Student : EntityAIBase
    {
        public static Student StudentFree = new Student("LIBRE");

        private Student() { }

        public Student(string name)
        {
            Name = name;
        }

        public virtual string Name { get; private set; }
        public virtual string LastName { get; private set; }
        public virtual string PhoneNumber { get; private set; }
        public virtual string Email { get; private set; }
        public virtual ICollection<WeeklyClassStudent> WeeklyClassStudents { get; private set; }
    }
}