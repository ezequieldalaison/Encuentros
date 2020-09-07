using Encuentros.DTOs.Base;
using Encuentros.DTOs.Common;
using Encuentros.DTOs.General;

namespace Encuentros.DTOs.Pilates
{
    public class FeeDto : DtoBase
    {
        public StudentDto Student { get; set; }
        public MonthDto Month { get; set; }
        public FeeTypeDto FeeType { get; set; }
        public virtual MovementDto Movement { get; set; }
    }
}