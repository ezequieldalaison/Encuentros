using Encuentros.DTOs.Base;
using System.Collections.Generic;

namespace Encuentros.DTOs.Pilates
{
    public class WeeklyClassDto : DtoBase
    {
        public long DayId { get; set; }
        public string Hour { get; set; }
        public IEnumerable<ClassStudentDto> Students { get; set; }
    }
}