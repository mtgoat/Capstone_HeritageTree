using HeritageTree.Models;
using System.Collections.Generic;

namespace HeritageTree.Repositories
{
    public interface IOwnershipRepository
    {
        List<Ownership> GetAll();
        Ownership GetById(int id);
    }
}