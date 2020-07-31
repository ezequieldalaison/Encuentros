using Encuentros.DTOs.Base;

namespace Encuentros.DTOs.ConsultingRoom
{
    public class ProfessionalDto : DtoBase
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string DocumentNumber { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int Percentage { get; set; }
        public bool IsActive { get; set; }
    }
}