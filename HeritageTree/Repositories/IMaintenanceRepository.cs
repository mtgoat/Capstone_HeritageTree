using HeritageTree.Models;
using System.Collections.Generic;

namespace HeritageTree.Repositories
{
    public interface IMaintenanceRepository
    {
        void Add(Maintenance maintenance);
        List<Maintenance> GetAll();
        Maintenance GetById(int id);

        void Update(Maintenance maintenance);

        public void Delete(int id);
        public List<Maintenance> GetAllByPostId(int id);

    }
}