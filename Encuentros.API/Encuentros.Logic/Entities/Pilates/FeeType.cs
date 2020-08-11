using Encuentros.Logic.Base;
using System.Data;

namespace Encuentros.Logic.Entities.Pilates
{
    public class FeeType : EntityBase
    {
        public static long OnceId = 1;
        public static long TwiceId = 2;
        public static long ThreeTimesId = 3;
        public static long IndividualId = 4;

        public virtual string Name { get; set; }
        public virtual decimal Amount { get; set; }
    }
}