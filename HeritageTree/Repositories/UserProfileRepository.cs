using Microsoft.Extensions.Configuration;
using HeritageTree.Models;
using HeritageTree.Utils;

namespace HeritageTree.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT up.Id, up.DisplayName, up.FirstName,     up.LastName, 
                               up.Email, up.CreateDateTime, up.UserTypeId,
                               ut.Name AS UserTypeName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                         WHERE Email =@email";

                    DbUtils.AddParameter(cmd, "email", email);
                    var reader = cmd.ExecuteReader();
                    
                    UserProfile userProfile = null;                 

                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),

                            UserTypeName = DbUtils.GetString(reader, "UserTypeName")
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }


        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (DisplayName, FirstName, LastName, Email, CreateDateTime, UserTypeId) 
                                        OUTPUT INSERTED.ID
                                        VALUES (@DisplayName, @FirstName, @LastName, @Email, @CreateDateTime, @UserTypeId)";
                    //DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", userProfile.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@UserTypeId", userProfile.UserTypeId);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }


    }
}
