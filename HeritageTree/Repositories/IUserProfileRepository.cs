using HeritageTree.Models;
using System.Collections.Generic;

namespace HeritageTree.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);

        List<UserProfile> GetAll();
        UserProfile GetByEmail(string email);
    }
}