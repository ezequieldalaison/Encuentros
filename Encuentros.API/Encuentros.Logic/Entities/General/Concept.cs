using Encuentros.Logic.Base;
using Encuentros.Logic.Entities.Common;

namespace Encuentros.Logic.Entities.General
{
    public class Concept : EntityAIBase
    {
        public virtual string Name { get; private set; }
        public virtual Area Area { get; private set; }
        public virtual JournalSide JournalSide { get; private set; }
        public virtual bool IsCommon { get; private set; }
    }
}