using Encuentros.DTOs.Base;

namespace Encuentros.DTOs.Common
{
    public class ProfessionalDto : DtoAIBase
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string DocumentNumber { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int? Percentage { get; set; }

        public string FullName
        {
            get
            {
                return Name + (string.IsNullOrEmpty(LastName) ? "" : " " + LastName);
            }
        }
    }
}