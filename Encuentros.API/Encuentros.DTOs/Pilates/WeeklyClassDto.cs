using Encuentros.DTOs.Base;
using Encuentros.DTOs.Common;
using Encuentros.DTOs.General;
using System.Collections.Generic;

namespace Encuentros.DTOs.Pilates
{
    public class WeeklyClassDto : DtoAIBase
    {
        public string Hour { get; set; }
        public long ProfessionalId { get; set; }
        public ProfessionalDto Professional { get; private set; }
        public DayDto Day { get; private set; }
        public IEnumerable<StudentDto> Students { get; set; }
    }
}