using Encuentros.Logic.Base;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Encuentros.Data.Interfaces
{
    public interface IGenericRepository<TEntity> 
        where TEntity : EntityBase
    {
        public IEnumerable<TEntity> GetAll();
        public IEnumerable<TEntity> GetByQuery(Expression<Func<TEntity, bool>> predicate);
        public TEntity GetById(long id);
        public void Create(TEntity entity);
        public void Update(TEntity entity);
        public void Delete(long id);
    }
}