using Microsoft.Data.SqlClient;
//using Microsoft.SqlServer.Types;
using Microsoft.Extensions.Configuration;
using HeritageTree.Models;
using HeritageTree.Utils;
using System.Collections.Generic;
using System;
using HeritageTree.Models;
using HeritageTree.Utils;
using System.Spatial;
namespace HeritageTree.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration)
        { }


        public List<Post> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"  SELECT p.Id AS PostId, p.StreetAddress AS 'Street', p.City, 
                              p.State, p.Zip, p.[Location].Lat as Lat, p.[Location].Long as Lon,	p.WardId,								p.CreateDateTime, p.UserProfileId, p.TreeCommonNameId, p.ImageLocation, p.HeritageStatusId, p.HeritageDateTime, p.HealthStatusId, p.OwnershipId, p.IsApproved,
                               
                              w.[Name] AS WardName, t.[Name] AS TreeCommonName, hrtg.[Name] AS HeritageStatusName, h.[Name] AS HealthStatusName, o.[Name] AS OwnershipName,

                              u.FirstName, u.LastName, u.DisplayName, 
                              u.Email, u.CreateDateTime, 
                              u.UserTypeId, 
                              ut.[Name] AS UserTypeName

                         FROM Post p
                            LEFT JOIN Ward w ON p.WardId = w.id
  							LEFT JOIN TreeCommonName t ON p.TreeCommonNameId = t.id
  							LEFT JOIN HeritageStatus hrtg ON p.HeritageStatusId = hrtg.id
  							LEFT JOIN HealthStatus h ON p.HealthStatusId = h.id
   							LEFT JOIN Ownership o ON p.OwnershipId = o.id

                              LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                        WHERE IsApproved = 1 AND p.CreateDateTime < SYSDATETIME()
                        ORDER BY p.CreateDateTime DESC";

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        posts.Add(NewPostFromReaderGet(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }


        public Post GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" SELECT p.Id AS PostId, p.StreetAddress AS 'Street', p.City, p.State, p.Zip, p.[Location].Lat as Lat, p.[Location].Long as Lon,	p.WardId, p.CreateDateTime, p.UserProfileId, p.TreeCommonNameId, p.ImageLocation, p.HeritageStatusId, p.HeritageDateTime, p.HealthStatusId, p.OwnershipId, p.IsApproved,
                               
                     w.[Name] AS WardName, t.[Name] AS TreeCommonName, hrtg.[Name] AS HeritageStatusName, h.[Name] AS HealthStatusName, o.[Name] AS OwnershipName,

                     u.FirstName, u.LastName, u.DisplayName, u.Email, u.CreateDateTime, u.UserTypeId, 
                              ut.[Name] AS UserTypeName

                     FROM Post p
                     LEFT JOIN Ward w ON p.WardId = w.id
  							LEFT JOIN TreeCommonName t ON p.TreeCommonNameId = t.id
  							LEFT JOIN HeritageStatus hrtg ON p.HeritageStatusId = hrtg.id
  							LEFT JOIN HealthStatus h ON p.HealthStatusId = h.id
   							LEFT JOIN Ownership o ON p.OwnershipId = o.id

                              LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                        WHERE  p.Id = @Id AND IsApproved = 1 AND p.CreateDateTime < SYSDATETIME()";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Post post = null;
                    if (reader.Read())
                    {
                        post = NewPostFromReaderGet(reader);

                    }
                    reader.Close();

                    return post;
                }
            }
        }


        public void Add(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Post (StreetAddress, City, [State], Zip, [Location], WardId, CreateDateTime, UserProfileId, TreeCommonNameId, ImageLocation, HeritageStatusId, HeritageDateTime,  OwnershipId, HealthStatusId,IsApproved) 
                        OUTPUT INSERTED.ID
                        VALUES (@StreetAddress, @City, @State, @Zip, geography::Point(@Latitude,@Longitude, 4326), @WardId, @CreateDateTime, @UserProfileId, @TreeCommonNameId,@ImageLocation, @HeritageStatusId, @HeritageDateTime,  @OwnershipId, @HealthStatusId,@IsApproved)";

                    DbUtils.AddParameter(cmd, "@StreetAddress", post.StreetAddress);
                    DbUtils.AddParameter(cmd, "@City", post.City); 
                    DbUtils.AddParameter(cmd, "@State", post.State);
                    DbUtils.AddParameter(cmd, "@Zip", post.Zip);
                    DbUtils.AddParameter(cmd, "@Latitude", post.Latitude);
                    DbUtils.AddParameter(cmd, "@Longitude", post.Longitude);
                    DbUtils.AddParameter(cmd, "@WardId", post.WardId);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", DateTime.Now);
                    DbUtils.AddParameter(cmd, "@UserProfileId", post.UserProfileId);
                    DbUtils.AddParameter(cmd, "@TreeCommonNameId", post.TreeCommonNameId);
                    DbUtils.AddParameter(cmd, "@ImageLocation", post.ImageLocation);
                    DbUtils.AddParameter(cmd, "@HeritageStatusId", post.HeritageStatusId);
                    DbUtils.AddParameter(cmd, "@HeritageDateTime", post.HeritageDateTime);
                    DbUtils.AddParameter(cmd, "@OwnershipId", post.OwnershipId);
                    DbUtils.AddParameter(cmd, "@HealthStatusId", post.HealthStatusId);
                    DbUtils.AddParameter(cmd, "@IsApproved", post.IsApproved);

                    post.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        private Post NewPostFromReaderGet(SqlDataReader reader)
        {
            return new Post()
            {
                Id = reader.GetInt32(reader.GetOrdinal("PostId")),
                StreetAddress = DbUtils.GetString(reader,"Street"),
                City = DbUtils.GetString(reader,"City"),
                State = DbUtils.GetString(reader,"State"),
                Zip = DbUtils.GetNullableInt(reader, "Zip"),
                Latitude = reader.GetDouble(reader.GetOrdinal("Lat")),
                Longitude = reader.GetDouble(reader.GetOrdinal("Lon")),
                WardId = DbUtils.GetNullableInt(reader, "WardId"),
                WardName = DbUtils.GetString(reader, "WardName"),
                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),

                UserProfile = new UserProfile()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                    UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                    UserTypeName = reader.GetString(reader.GetOrdinal("UserTypeName"))
                },
                TreeCommonNameId = reader.GetInt32(reader.GetOrdinal("TreeCommonNameId")),
                TreeCommonNameName = DbUtils.GetString(reader, "TreeCommonName"),
                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                HeritageStatusId = DbUtils.GetNullableInt(reader, "HealthStatusId"),
                HeritageStatusName = DbUtils.GetString(reader, "HeritageStatusName"),
                HeritageDateTime = DbUtils.GetNullableDateTime(reader, "HeritageDateTime"),
                HealthStatusId = reader.GetInt32(reader.GetOrdinal("HealthStatusId")),
                HealthStatusName = DbUtils.GetString(reader, "HealthStatusName"),
                OwnershipId = reader.GetInt32(reader.GetOrdinal("OwnershipId")),
                OwnershipName = DbUtils.GetString(reader, "OwnershipName"),
                IsApproved = DbUtils.GetNullableBool(reader, "IsApproved")

            };
        }




    }
}
