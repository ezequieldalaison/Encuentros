using Encuentros.Logic.Base;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Encuentros.Data.Interfaces
{
    public interface IGenericRepository<TEntity> 
        where TEntity : EntityBase
    {
        DbContext GetContext();
        IEnumerable<TEntity> GetAll();
        IEnumerable<TEntity> GetAllInclude(params Expression<Func<TEntity, object>>[] includeProperties);
        IEnumerable<TEntity> GetByQueryInclude(Expression<Func<TEntity, bool>> predicate,
            params Expression<Func<TEntity, object>>[] includeProperties);
        IEnumerable<TEntity> GetByQuery(Expression<Func<TEntity, bool>> predicate);
        TEntity GetById(long id);
        void Create(TEntity entity);
        void Update(TEntity entity);
        void Delete(long id);
        TEntity GetByIdInclude(long id, params Expression<Func<TEntity, object>>[] includeProperties);
        void AddEntiy(TEntity entity);
        void AttachEntity(TEntity entity);
        public void SaveChanges();
    }
}