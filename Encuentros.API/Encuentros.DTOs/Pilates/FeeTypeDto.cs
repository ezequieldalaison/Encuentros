using Encuentros.DTOs.Base;

namespace Encuentros.DTOs.Pilates
{
    public   class FeeTypeDto : DtoBase
    {
        public string Name { get; set; }
        public decimal Amount { get; set; }
    }
}