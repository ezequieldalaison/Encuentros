using Encuentros.Logic.Base;
using Encuentros.Logic.Entities.Common;

namespace Encuentros.Logic.Entities.General
{
    public class Concept : EntityAIBase
    {
        public virtual string Name { get; set; }
        public virtual Area Area { get; set; }
        public virtual JournalSide JournalSide { get; set; }
    }
}