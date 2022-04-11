using HeritageTree.Models;
using System.Collections.Generic;

namespace HeritageTree.Repositories
{
    public interface IHealthStatusRepository
    {
        List<HealthStatus> GetAll();
        HealthStatus GetById(int id);
    }
}