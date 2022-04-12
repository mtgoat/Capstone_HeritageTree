using Microsoft.Data.SqlClient;
//using Microsoft.SqlServer.Types;
using Microsoft.Extensions.Configuration;
using HeritageTree.Models;
using HeritageTree.Utils;
using System.Collections.Generic;

namespace HeritageTree.Repositories
{
    public class WardRepository : BaseRepository, IWardRepository
    {
        public WardRepository(IConfiguration configuration) : base(configuration)
        { }


        public List<Ward> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"  
                         SELECT Id as WardId, [Name] as WardName
                         
                         FROM Ward";

                    var reader = cmd.ExecuteReader();

                    var wards = new List<Ward>();
                    while (reader.Read())
                    {
                        wards.Add(NewPostFromReaderGet(reader));
                    }

                    reader.Close();

                    return wards;
                }
            }
        }


        public Ward GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" 
                        SELECT Id as WardId, [Name] as WardName

                        FROM Ward
                     
                        WHERE  Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Ward ward = null;
                    if (reader.Read())
                    {
                        ward = NewPostFromReaderGet(reader);

                    }
                    reader.Close();

                    return ward;
                }
            }
        }


        public void Add(Ward ward)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Ward ([Name]) 
                        OUTPUT INSERTED.ID
                        VALUES (@Name)";

                    DbUtils.AddParameter(cmd, "@Name", ward.Name);


                    ward.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        private Ward NewPostFromReaderGet(SqlDataReader reader)
        {
            return new Ward()
            {
                Id = reader.GetInt32(reader.GetOrdinal("WardId")),
                Name = reader.GetString(reader.GetOrdinal("WardName")),
            };
        }




    }
}
