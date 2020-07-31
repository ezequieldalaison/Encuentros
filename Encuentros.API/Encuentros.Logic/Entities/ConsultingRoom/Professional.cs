using Encuentros.Logic.Base;

namespace Encuentros.Logic.Entities
{
    public class Professional : EntityBase
    {
        public virtual string Name { get; set; }
        public virtual string LastName { get; set; }
        public virtual string DocumentNumber { get; set; }
        public virtual string Email { get; set; }
        public virtual string PhoneNumber { get; set; }
        public virtual int Percentage { get; set; }
        public virtual bool IsActive { get; set; }
    }
}