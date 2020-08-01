using Encuentros.Logic.Base;
using System;

namespace Encuentros.Logic.Entities
{
    public class Professional : EntityBase
    {
        public virtual string Name { get; private set; }
        public virtual string LastName { get; private set; }
        public virtual string DocumentNumber { get; private set; }
        public virtual string Email { get; private set; }
        public virtual string PhoneNumber { get; private set; }
        public virtual int Percentage { get; private set; }
        public virtual bool IsActive { get; private set; }

        public void Activate()
        {
            IsActive = true;
        }
        public void Inactivate()
        {
            IsActive = false;
        }
    }
}