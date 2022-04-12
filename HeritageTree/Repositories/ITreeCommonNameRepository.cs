using HeritageTree.Models;
using System.Collections.Generic;

namespace HeritageTree.Repositories
{
    public interface ITreeCommonNameRepository
    {
        void Add(TreeCommonName treeCommonName);
        List<TreeCommonName> GetAll();
        TreeCommonName GetById(int id);
    }
}