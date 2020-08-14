using Encuentros.Logic.Base;
using Encuentros.Logic.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;

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
        public virtual ICollection<Fee> Fees { get; private set; }
        public bool IsUpToDate
        {
            get
            {
                if (Fees == null)
                    return false;

                var lastFeePaid = Fees.Where(x => x.Movement.MovementStatusId == MovementStatus.PaidId).OrderByDescending(x => x.MonthId).FirstOrDefault();
                return lastFeePaid != null && lastFeePaid.MonthId == DateTime.Now.Month;
            }
        }

        public long? FeeTypeId
        {
            get
            {
                if (WeeklyClassStudents == null)
                    return null;

                switch (WeeklyClassStudents.Count)
                {
                    case 1:
                        return FeeType.OnceId;
                    case 2:
                        return FeeType.TwiceId;
                    case 3:
                        return FeeType.ThreeTimesId;
                    default:
                        return null;
                }
            }
        }
        public string FullName
        {
            get
            {
                return Name + (string.IsNullOrEmpty(LastName) ? "" : " " + LastName);
            }
        }
    }
}