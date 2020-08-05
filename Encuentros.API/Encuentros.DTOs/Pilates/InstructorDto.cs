using Encuentros.DTOs.Base;

namespace Encuentros.DTOs.Pilates
{
    public class InstructorDto : DtoAIBase
    {
        public string Name { get; private set; }
        public string LastName { get; private set; }
    }
}