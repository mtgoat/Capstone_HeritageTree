using Microsoft.Data.SqlClient;
//using Microsoft.SqlServer.Types;
using Microsoft.Extensions.Configuration;
using HeritageTree.Models;
using HeritageTree.Utils;
using System.Collections.Generic;

namespace HeritageTree.Repositories
{
    public class TreeCommonNameRepository : BaseRepository, ITreeCommonNameRepository
    {
        public TreeCommonNameRepository(IConfiguration configuration) : base(configuration)
        { }


        public List<TreeCommonName> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"  
                         SELECT Id as TreeNameId, [Name] as TreeCommonName, isActive
                         FROM TreeCommonName";

                    var reader = cmd.ExecuteReader();

                    var treeCommonNames = new List<TreeCommonName>();
                    while (reader.Read())
                    {
                        treeCommonNames.Add(NewPostFromReader(reader));
                    }

                    reader.Close();

                    return treeCommonNames;
                }
            }
        }


        public TreeCommonName GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" 
                       SELECT Id as TreeNameId, [Name] as TreeCommonName, isActive
                         FROM TreeCommonName

                          WHERE  Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    TreeCommonName treeCommonName = null;
                    if (reader.Read())
                    {
                        treeCommonName = NewPostFromReader(reader);

                    }
                    reader.Close();

                    return treeCommonName;
                }
            }
        }


        public void Add(TreeCommonName treeCommonName)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO TreeCommonName ([Name], isActive) 
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @isActive)";

                    DbUtils.AddParameter(cmd, "@Name", treeCommonName.Name);
                    DbUtils.AddParameter(cmd, "@isActive", 1);


                    treeCommonName.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
      
        private TreeCommonName NewPostFromReader(SqlDataReader reader)
        {
            return new TreeCommonName()
            {
                Id = reader.GetInt32(reader.GetOrdinal("TreeNameId")),
                Name = reader.GetString(reader.GetOrdinal("TreeCommonName")),
                IsActive = reader.GetBoolean(reader.GetOrdinal("isActive"))
            };
        }




    }
}
