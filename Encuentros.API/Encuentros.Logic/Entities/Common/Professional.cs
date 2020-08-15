using Encuentros.Logic.Base;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace Encuentros.Logic.Entities.Common
{
    public class Professional : EntityAIBase
    {
        public virtual string Name { get; private set; }
        public virtual string LastName { get; private set; }
        public virtual string DocumentNumber { get; private set; }
        public virtual string Email { get; private set; }
        public virtual string PhoneNumber { get; private set; }
        public virtual int? Percentage { get; private set; }
        public virtual ICollection<ProfessionalArea> ProfessionalAreas { get; private set; } = new List<ProfessionalArea>();

        public void SetProfessionalAreas(ICollection<ProfessionalArea> professionalAreas)
        {
            ProfessionalAreas = professionalAreas;
        }

        public string FullName
        {
            get
            {
                return Name + (string.IsNullOrEmpty(LastName) ? "" : " " + LastName);
            }
        }

        public void UpdateAreas(IEnumerable<long> areaIds)
        {
            var toRemove = ProfessionalAreas.Where(x => !areaIds.Contains(x.AreaId)).ToList();
            foreach (var item in toRemove)
            {
                ProfessionalAreas.Remove(item);
            }

            foreach (var areaId in areaIds)
            {
                var pa = ProfessionalAreas.SingleOrDefault(x => x.AreaId == areaId);
                if (pa == null)
                    ProfessionalAreas.Add(new ProfessionalArea(Id, areaId));
            }
        }
    }
}