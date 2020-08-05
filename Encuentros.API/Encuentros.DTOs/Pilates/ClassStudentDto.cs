using Encuentros.DTOs.Base;

namespace Encuentros.DTOs.Pilates
{
    public class ClassStudentDto : DtoBase
    {
        public string FullName { get; set; }
        public bool IsUpToDate { get; set; }
    }
}