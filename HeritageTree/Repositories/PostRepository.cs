using Microsoft.Data.SqlClient;
//using Microsoft.SqlServer.Types;
using Microsoft.Extensions.Configuration;
using HeritageTree.Models;
using HeritageTree.Utils;
using System.Collections.Generic;
using System;
using HeritageTree.Models;
using HeritageTree.Utils;

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
                    cmd.CommandText = @" SELECT p.Id AS PostId, p.StreetAddress AS 'Street', p.City, 
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




        private Post NewPostFromReaderGet(SqlDataReader reader)
        {
            return new Post()
            {
                Id = reader.GetInt32(reader.GetOrdinal("PostId")),
                StreetAddress = reader.GetString(reader.GetOrdinal("Street")),
                City = reader.GetString(reader.GetOrdinal("City")),
                State = reader.GetString(reader.GetOrdinal("State")),
                Zip = reader.GetInt32(reader.GetOrdinal("Zip")),
                //Location = DbUtils.GetString(reader, "LocationString"),
                Latitude = DbUtils.GetNullableDouble(reader, "Lat"),
                Longitude = DbUtils.GetNullableDouble(reader, "Lon"),
                WardId = reader.GetInt32(reader.GetOrdinal("WardId")),
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
