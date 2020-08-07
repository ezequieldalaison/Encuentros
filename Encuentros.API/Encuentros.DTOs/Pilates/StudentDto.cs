using Encuentros.DTOs.Base;

namespace Encuentros.DTOs.Pilates
{
    public class StudentDto : DtoAIBase
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public bool IsUpToDate { get; set; }

        public string FullName
        {
            get
            {
                return Name + (string.IsNullOrEmpty(LastName) ? "" : " " + LastName);
            }
        }
    }
}