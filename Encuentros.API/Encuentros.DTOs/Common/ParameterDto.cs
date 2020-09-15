using Encuentros.DTOs.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Encuentros.DTOs.Common
{
    public class ParameterDto : DtoBase
    {
        public string Name { get; set; }
        public string Value { get; set; }
        public long AreaId { get; set; }
    }
}
