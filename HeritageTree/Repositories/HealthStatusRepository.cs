using Microsoft.Data.SqlClient;
//using Microsoft.SqlServer.Types;
using Microsoft.Extensions.Configuration;
using HeritageTree.Models;
using HeritageTree.Utils;
using System.Collections.Generic;

namespace HeritageTree.Repositories
{
    public class HealthStatusRepository : BaseRepository, IHealthStatusRepository
    {
        public HealthStatusRepository(IConfiguration configuration) : base(configuration)
        { }


        public List<HealthStatus> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"  
                         SELECT Id as HealthStatusId, [Name] as HealthStatusName
                                                 
                         FROM HealthStatus";

                    var reader = cmd.ExecuteReader();

                    var ownerships = new List<HealthStatus>();
                    while (reader.Read())
                    {
                        ownerships.Add(NewPostFromReader(reader));
                    }

                    reader.Close();

                    return ownerships;
                }
            }
        }


        public HealthStatus GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" 
                         SELECT Id as HealthStatusId, [Name] as HealthStatusName
                         
                         FROM HealthStatus
                     
                        WHERE  Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    HealthStatus healthStatus = null;
                    if (reader.Read())
                    {
                        healthStatus = NewPostFromReader(reader);

                    }
                    reader.Close();

                    return healthStatus;
                }
            }
        }



        private HealthStatus NewPostFromReader(SqlDataReader reader)
        {
            return new HealthStatus()
            {
                Id = reader.GetInt32(reader.GetOrdinal("HealthStatusId")),
                Name = reader.GetString(reader.GetOrdinal("HealthStatusName")),
            };
        }




    }
}
