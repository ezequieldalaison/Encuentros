using Encuentros.Logic.Base;

namespace Encuentros.Logic.Entities.Common
{
    public class MovementStatus : EntityBase
    {
        public static long PendingId = 1;
        public static long PaidId = 2;

        public virtual string Name { get; set; }
    }
}