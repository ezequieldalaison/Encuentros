using Encuentros.Data.Extensions;
using Encuentros.Data.Interfaces;
using Encuentros.Logic.Base;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

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

        public override IEnumerable<TEntity> GetAllInclude(params Expression<Func<TEntity, object>>[] includeProperties)
        {
            IQueryable<TEntity> queryable = _dbSet.AsNoTracking().Where(x => x.IsActive);

            return includeProperties.Aggregate
              (queryable, (current, includeProperty) =>
              {
                  return current.Include(includeProperty.AsPath());
              });
        }
    }
}
