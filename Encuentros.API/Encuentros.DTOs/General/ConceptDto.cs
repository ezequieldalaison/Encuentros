using Encuentros.DTOs.Base;
using Encuentros.DTOs.Common;

namespace Encuentros.DTOs.General
{
    public class ConceptDto : DtoAIBase
    {
        public string Name { get; set; }
        public AreaDto Area { get; set; }
        public JournalSideDto JournalSide { get; set; }
        public bool IsCommon { get; set; }
    }
}