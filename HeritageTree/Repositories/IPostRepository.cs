using HeritageTree.Models;
using System.Collections.Generic;

namespace HeritageTree.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAll();
    }
}