using Encuentros.DTOs.Base;
using Encuentros.DTOs.Common;
using System.Collections.Generic;
using System.Linq;

namespace Encuentros.DTOs.General
{
    public class ProfessionalDto : DtoAIBase
    {
        public ProfessionalDto()
        {
            AreaIds = new List<long>();
            Areas = new List<AreaDto>();
        }

        public string Name { get; set; }
        public string LastName { get; set; }
        public string DocumentNumber { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int? Percentage { get; set; }
        public IEnumerable<long> AreaIds { get; set; }
        public IEnumerable<AreaDto> Areas { get; set; }

        public string AreasNames
        {
            get
            {
                return string.Join(", ", Areas.Select(x => x.Name).ToList());
            }
        }

        public string FullName
        {
            get
            {
                return Name + (string.IsNullOrEmpty(LastName) ? "" : " " + LastName);
            }
        }
    }
}