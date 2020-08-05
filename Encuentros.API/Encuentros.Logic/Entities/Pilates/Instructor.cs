using Encuentros.Logic.Base;

namespace Encuentros.Logic.Entities.Pilates
{
    public class Instructor : EntityAIBase
    {
        public virtual string Name { get; private set; }
        public virtual string LastName { get; private set; }
    }
}