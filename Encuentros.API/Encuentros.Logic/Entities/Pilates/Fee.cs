using Encuentros.Logic.Base;
using Encuentros.Logic.Entities.Common;

namespace Encuentros.Logic.Entities.Pilates
{
    public class Fee : EntityBase
    {
        public Student Student { get; set; }
        public FeeType FeeType { get; set; }
        public Month Month { get; set; }
        public Movement Movement { get; set; }
    }
}