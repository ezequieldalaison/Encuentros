using Encuentros.Logic.Base;

namespace Encuentros.Logic.Entities.Pilates
{
    public class Student : EntityAIBase
    {
        public virtual string Name { get; private set; }
        public virtual string LastName { get; private set; }
        public virtual string PhoneNumber { get; private set; }
        public virtual string Email { get; private set; }
    }
}