using Microsoft.Data.SqlClient;
using Microsoft.SqlServer.Types;
using Microsoft.Extensions.Configuration;
using HeritageTree.Models;
using HeritageTree.Utils;
using System.Collections.Generic;
using System;
using HeritageTree.Models;
using HeritageTree.Utils;

namespace HeritageTree.Repositories
{
    public class PostRepository : BaseRepository
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
                              p.State, p.Zip, p.[Location].Lat as Lat,  p.[Location].Long as Lon,	p.WardId,								p.CreateDateTime, p.UserProfileId, p.TreeCommonNameId, p.ImageLocation, p.HeritageStatusId, p.HeritageDateTime, p.HealthStatusId, p.OwnershipId, p.IsApproved,
                               
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
                        posts.Add(NewPostFromReader(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }









        private Post NewPostFromReader(SqlDataReader reader)
        {
            return new Post()
            {
                Id = reader.GetInt32(reader.GetOrdinal("PostId")),
                StreetAddress = reader.GetString(reader.GetOrdinal("Street")),
                City = reader.GetString(reader.GetOrdinal("City")),
                State = reader.GetString(reader.GetOrdinal("State")),
                Zip = reader.GetInt32(reader.GetOrdinal("Zip")),
                Location = reader.STPointN(reader.GetOrdinal("Location")), 

                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                PublishDateTime = (System.DateTime)DbUtils.GetNullableDateTime(reader, "PublishDateTime"),
                CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                Category = new Category()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                    Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                },
                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                UserProfile = new UserProfile()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                    ImageLocation = DbUtils.GetNullableString(reader, "UserProfileImage"),
                    UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                    UserType = new UserType()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                        Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
                    }
                }
            };
        }




    }
}
