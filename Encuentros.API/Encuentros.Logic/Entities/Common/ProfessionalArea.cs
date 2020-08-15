using Encuentros.Logic.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Encuentros.Logic.Entities.Common
{
    public class ProfessionalArea : EntityBase
    {
        private ProfessionalArea() { }

        public ProfessionalArea(long professionalId, long areaId)
        {
            ProfessionalId = professionalId;
            AreaId = areaId;
        }

        public long ProfessionalId { get; private set; }
        public Professional Professional { get; private set; }
        public long AreaId { get; private set; }
        public Area Area { get; private set; }
    }
}