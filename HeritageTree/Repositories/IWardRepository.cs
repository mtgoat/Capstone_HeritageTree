using HeritageTree.Models;
using System.Collections.Generic;

namespace HeritageTree.Repositories
{
    public interface IWardRepository
    {
        void Add(Ward ward);
        List<Ward> GetAll();
        Ward GetById(int id);
    }
}