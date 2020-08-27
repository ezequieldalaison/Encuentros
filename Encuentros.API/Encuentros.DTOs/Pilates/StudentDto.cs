using Encuentros.DTOs.Base;

namespace Encuentros.DTOs.Pilates
{
    public class StudentDto : DtoAIBase
    {
        public static StudentDto StudentFree = new StudentDto("LIBRE");

        public StudentDto(string name)
        {
            Name = name;
        }

        public string Name { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public bool IsUpToDate { get; set; }
        public long FeeTypeId { get; set; }
        
        public string FullName
        {
            get
            {
                return Name + (string.IsNullOrEmpty(LastName) ? "" : " " + LastName);
            }
        }
    }
}