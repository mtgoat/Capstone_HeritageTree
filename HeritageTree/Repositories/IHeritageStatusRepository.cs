using HeritageTree.Models;
using System.Collections.Generic;

namespace HeritageTree.Repositories
{
    public interface IHeritageStatusRepository
    {
        List<HeritageStatus> GetAll();
        HeritageStatus GetById(int id);
    }
}