using Encuentros.Data.Interfaces;
using Encuentros.Logic.Base;
using Encuentros.Logic.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Encuentros.Data
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity>
        where TEntity : EntityBase
    {
        public void Create(TEntity entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(long id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<TEntity> GetAll()
        {
            var list = new List<Professional> {
                    new Professional { Name = "Ezequiel", LastName = "Dalaison", DocumentNumber = "35070715", Email = "eze@gmail.com", PhoneNumber ="3413474636", Percentage = 30, IsActive = true },
                    new Professional { Name = "Pepe", LastName = "Sanchez", DocumentNumber = "20445147", Email = "pepe@gmail.com", PhoneNumber ="34136535799", Percentage = 20, IsActive = true },
                    new Professional { Name = "Jose", LastName = "Gonzalez", DocumentNumber = "39001245", Email = "Jose@gmail.com", PhoneNumber ="3413471044", Percentage = 30, IsActive = true }
                };

            return list as IEnumerable<TEntity>;
        }

        public TEntity GetById(long id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<TEntity> GetByQuery(Expression<Func<TEntity, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public void Update(TEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}