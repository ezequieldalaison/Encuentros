using Encuentros.DTOs.Base;

namespace Encuentros.DTOs.Pilates
{
    public class InstructorDto : DtoAIBase
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string FullName
        {
            get
            {
                return Name + (string.IsNullOrEmpty(LastName) ? "" : " " + LastName);
            }
        }
    }
}