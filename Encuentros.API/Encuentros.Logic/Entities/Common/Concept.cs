using Encuentros.Logic.Base;

namespace Encuentros.Logic.Entities.Common
{
    public class Concept : EntityAIBase
    {
        public virtual string Name { get; set; }
        public virtual Area Area { get; set; }
        public virtual JournalSide JournalSide { get; set; }
    }
}