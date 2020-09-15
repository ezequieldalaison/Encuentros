using Encuentros.Logic.Base;

namespace Encuentros.Logic.Entities.Common
{
    public class Parameter : EntityBase
    {
        public virtual string Name { get; private set; }
        public virtual string Value { get; private set; }
        public virtual long AreaId { get; private set; }
        public virtual Area Area { get; private set; }
    }
}