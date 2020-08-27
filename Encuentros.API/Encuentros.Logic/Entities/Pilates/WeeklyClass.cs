﻿using Encuentros.Logic.Base;
using Encuentros.Logic.Entities.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Encuentros.Logic.Entities.Pilates
{
    public class WeeklyClass : EntityAIBase
    {
        public virtual string Hour { get; private set; }
        public virtual long InstructorId { get; private set; }
        public virtual Professional Instructor { get; private set; }
        public virtual Day Day { get; private set; }
        public virtual ICollection<WeeklyClassStudent> WeeklyClassStudents { get; private set; }

        public void UpdateStudents(IEnumerable<long> studentIds)
        {
            var toRemove = WeeklyClassStudents.Where(x => !studentIds.Contains(x.StudentId)).ToList();
            foreach (var item in toRemove)
            {
                WeeklyClassStudents.Remove(item);
            }

            foreach (var studentId in studentIds.Where(x => x > 0))
            {
                var wcs = WeeklyClassStudents.SingleOrDefault(x => x.StudentId == studentId);

                if (wcs == null)
                    WeeklyClassStudents.Add(new WeeklyClassStudent(this, studentId));
            }
        }

        public void SetInstructor(long id)
        {
            InstructorId = id;
        }
    }
}