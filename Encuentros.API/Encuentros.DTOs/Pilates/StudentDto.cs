using Encuentros.DTOs.Base;

namespace Encuentros.DTOs.Pilates
{
    public class StudentDto : DtoAIBase
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
    }
}