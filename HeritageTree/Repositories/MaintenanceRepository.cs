using Microsoft.Data.SqlClient;
//using Microsoft.SqlServer.Types;
using Microsoft.Extensions.Configuration;
using HeritageTree.Models;
using HeritageTree.Utils;
using System.Collections.Generic;

namespace HeritageTree.Repositories
{
    public class MaintenanceRepository : BaseRepository, IMaintenanceRepository
    {
        public MaintenanceRepository(IConfiguration configuration) : base(configuration)
        { }


        public List<Maintenance> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"  
                         SELECT Id as MaintenanceId, [Name] as MaintenanceName
                         
                         FROM Maintenance";

                    var reader = cmd.ExecuteReader();

                    var maintenances = new List<Maintenance>();
                    while (reader.Read())
                    {
                        maintenances.Add(NewPostFromReaderGet(reader));
                    }

                    reader.Close();

                    return maintenances;
                }
            }
        }

        //this is to get all maintenace by the same post.  NO post Id in this quarey 
        public List<Maintenance> GetAllByPostId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"  
                         SELECT pm.Id AS PostMaintenanceId, pm.MaintenanceId, m.[Name] as MaintenanceName 
                FROM PostMaintenance pm
                LEFT JOIN Maintenance m on pm.MaintenanceId = m.id
                WHERE pm.PostId = @Id
                ORDER BY pm.MaintenanceId";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    var maintenances = new List<Maintenance>();
                    while (reader.Read())
                    {
                        maintenances.Add(new Maintenance()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("MaintenanceId")),
                            Name = reader.GetString(reader.GetOrdinal("MaintenanceName")),
                        });
                    }

                    reader.Close();

                    return maintenances;
                }
            }
        }
        public Maintenance GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" 
                        SELECT Id as MaintenanceId, [Name] as MaintenanceName

                        FROM Maintenance
                     
                        WHERE  Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Maintenance maintenance = null;
                    if (reader.Read())
                    {
                        maintenance = NewPostFromReaderGet(reader);

                    }
                    reader.Close();

                    return maintenance;
                }
            }
        }


        public void Add(Maintenance maintenance)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Maintenance ([Name]) 
                        OUTPUT INSERTED.ID
                        VALUES (@Name)";

                    DbUtils.AddParameter(cmd, "@Name", maintenance.Name);


                    maintenance.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Maintenance maintenance)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Maintenance
                        SET [Name] = @Name
                        
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", maintenance.Name);
                    DbUtils.AddParameter(cmd, "@Id", maintenance.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }



        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        Delete FROM Maintenance
                                                
                        WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        private Maintenance NewPostFromReaderGet(SqlDataReader reader)
        {
            return new Maintenance()
            {
                Id = reader.GetInt32(reader.GetOrdinal("MaintenanceId")),
                Name = reader.GetString(reader.GetOrdinal("MaintenanceName")),
            };
        }




    }
}
