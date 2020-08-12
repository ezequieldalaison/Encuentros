using Encuentros.Logic.Base;

namespace Encuentros.Data.Interfaces
{
    public interface IGenericAIRepository<TEntity> : IGenericRepository<TEntity>
        where TEntity : EntityAIBase
    {
    }
}