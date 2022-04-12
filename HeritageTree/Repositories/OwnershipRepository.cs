using Microsoft.Data.SqlClient;
//using Microsoft.SqlServer.Types;
using Microsoft.Extensions.Configuration;
using HeritageTree.Models;
using HeritageTree.Utils;
using System.Collections.Generic;

namespace HeritageTree.Repositories
{
    public class OwnershipRepository : BaseRepository, IOwnershipRepository
    {
        public OwnershipRepository(IConfiguration configuration) : base(configuration)
        { }


        public List<Ownership> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"  
                         SELECT Id as 'OwnershipId', [Name] as 'OwnershipName'
                         
                         FROM Ownership";

                    var reader = cmd.ExecuteReader();

                    var ownerships = new List<Ownership>();
                    while (reader.Read())
                    {
                        ownerships.Add(NewPostFromReader(reader));
                    }

                    reader.Close();

                    return ownerships;
                }
            }
        }


        public Ownership GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" 
                        SELECT Id as 'OwnershipId', [Name] as 'OwnershipName'
                         
                         FROM Ownership
                     
                        WHERE  Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Ownership ownership = null;
                    if (reader.Read())
                    {
                        ownership = NewPostFromReader(reader);

                    }
                    reader.Close();

                    return ownership;
                }
            }
        }



        private Ownership NewPostFromReader(SqlDataReader reader)
        {
            return new Ownership()
            {
                Id = reader.GetInt32(reader.GetOrdinal("OwnershipId")),
                Name = reader.GetString(reader.GetOrdinal("OwnershipName")),
            };
        }




    }
}
