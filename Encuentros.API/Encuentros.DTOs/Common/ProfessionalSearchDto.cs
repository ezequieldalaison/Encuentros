namespace Encuentros.DTOs.Common
{
    public class ProfessionalSearchDto
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public bool showInactives { get; set; }
    }
}