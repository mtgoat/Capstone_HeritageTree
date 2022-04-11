using Microsoft.Data.SqlClient;
//using Microsoft.SqlServer.Types;
using Microsoft.Extensions.Configuration;
using HeritageTree.Models;
using HeritageTree.Utils;
using System.Collections.Generic;

namespace HeritageTree.Repositories
{
    public class HeritageStatusRepository : BaseRepository, IHeritageStatusRepository
    {
        public HeritageStatusRepository(IConfiguration configuration) : base(configuration)
        { }


        public List<HeritageStatus> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"  
                         SELECT Id as HeritageStatusId, [Name] as HeritageStatusName
                         
                         FROM HeritageStatus";

                    var reader = cmd.ExecuteReader();

                    var heritageStatus = new List<HeritageStatus>();
                    while (reader.Read())
                    {
                        heritageStatus.Add(NewPostFromReader(reader));
                    }

                    reader.Close();

                    return heritageStatus;
                }
            }
        }


        public HeritageStatus GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" 
                         SELECT Id as HeritageStatusId, [Name] as HeritageStatusName                         
                         FROM HeritageStatus
                     
                        WHERE  Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    HeritageStatus ownership = null;
                    if (reader.Read())
                    {
                        ownership = NewPostFromReader(reader);

                    }
                    reader.Close();

                    return ownership;
                }
            }
        }



        private HeritageStatus NewPostFromReader(SqlDataReader reader)
        {
            return new HeritageStatus()
            {
                Id = reader.GetInt32(reader.GetOrdinal("HeritageStatusId")),
                Name = reader.GetString(reader.GetOrdinal("HeritageStatusName")),
            };
        }




    }
}
