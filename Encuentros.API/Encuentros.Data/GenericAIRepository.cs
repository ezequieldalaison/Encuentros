using Encuentros.Data.Interfaces;
using Encuentros.Logic.Base;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Encuentros.Data
{
    public class GenericAIRepository<TEntity> : GenericRepository<TEntity>, IGenericAIRepository<TEntity>
        where TEntity : EntityAIBase
    {
        public GenericAIRepository(DbContext context) : base(context)
        {
        }

        public override IEnumerable<TEntity> GetAll()
        {
            return _dbSet.AsNoTracking().Where(x => x.IsActive).ToList();
        }

        public override void Create(TEntity entity)
        {
            entity.Activate();

            _dbSet.Add(entity);
            _context.SaveChanges();
        }
    }
}
