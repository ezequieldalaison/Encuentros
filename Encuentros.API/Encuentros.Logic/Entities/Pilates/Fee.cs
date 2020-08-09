using Encuentros.Logic.Base;
using Encuentros.Logic.Entities.Common;

namespace Encuentros.Logic.Entities.Pilates
{
    public class Fee : EntityBase
    {
        public virtual Student Student { get; set; }
        public virtual FeeType FeeType { get; set; }
        public virtual Month Month { get; set; }
        public virtual Movement Movement { get; set; }
    }
}