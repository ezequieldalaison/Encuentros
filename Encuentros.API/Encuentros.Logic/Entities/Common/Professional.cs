using Encuentros.Logic.Base;
using System;

namespace Encuentros.Logic.Entities.Common
{
    public class Professional : EntityAIBase
    {
        public virtual string Name { get; private set; }
        public virtual string LastName { get; private set; }
        public virtual string DocumentNumber { get; private set; }
        public virtual string Email { get; private set; }
        public virtual string PhoneNumber { get; private set; }
        public virtual int? Percentage { get; private set; }
        public string FullName
        {
            get
            {
                return Name + (string.IsNullOrEmpty(LastName) ? "" : " " + LastName);
            }
        }
    }
}