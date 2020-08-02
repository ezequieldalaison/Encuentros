using System.ComponentModel.DataAnnotations.Schema;

namespace Encuentros.Logic.Base
{
    /// <summary>
    /// Entity base with Activate/Inactivate function
    /// </summary>
    public abstract class EntityAIBase : EntityBase
    {
        public bool IsActive { get; protected set; }

        public virtual void Activate()
        {
            IsActive = true;
        }

        public virtual void Inactivate()
        {
            IsActive = false;
        }
    }
}