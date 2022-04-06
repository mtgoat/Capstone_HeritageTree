using HeritageTree.Models;

namespace HeritageTree.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByEmail(string email);
    }
}