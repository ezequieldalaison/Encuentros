using Encuentros.Logic.Base;
using Encuentros.Logic.Extensions;

namespace Encuentros.Logic.Entities.Common
{
    public class ReceiptNumber : EntityBase
    {
        public virtual long ReceiptTypeId { get; private set; }
        public virtual long LastNumber { get; private set; }
        public string LastNumberFormatted
        {
            get
            {
                return LastNumber.ToReceiptNumber();
            }
        }

        public void IncrementNumber()
        {
            LastNumber += 1;
        }
    }
}