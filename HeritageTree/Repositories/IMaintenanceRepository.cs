using HeritageTree.Models;
using System.Collections.Generic;

namespace HeritageTree.Repositories
{
    public interface IMaintenanceRepository
    {
        void Add(Maintenance maintenance);
        List<Maintenance> GetAll();
        Maintenance GetById(int id);
    }
}