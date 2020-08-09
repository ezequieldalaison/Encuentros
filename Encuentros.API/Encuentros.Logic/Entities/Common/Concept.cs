using Encuentros.Logic.Base;

namespace Encuentros.Logic.Entities.Common
{
    public class Concept : EntityAIBase
    {
        public string Name { get; set; }
        public Area Area { get; set; }
        public virtual JournalSide JournalSide { get; set; }
    }
}