using Encuentros.DTOs.Base;
using Encuentros.DTOs.Common;
using System.Collections.Generic;

namespace Encuentros.DTOs.Pilates
{
    public class WeeklyClassDto : DtoBase
    {
        public string Hour { get; set; }
        public InstructorDto Instructor { get; private set; }
        public DayDto Day { get; private set; }
        public IEnumerable<StudentDto> Students { get; set; }
    }
}