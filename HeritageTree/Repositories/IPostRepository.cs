using HeritageTree.Models;
using System.Collections.Generic;

namespace HeritageTree.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAll();

        List<Post> GetAllByHeritageId(int id);
        List<Post> GetAllNotApp();
        Post GetById(int id);

        Post GetByIdNotApp(int id);

        Post GetMyPostById(int id);
        void Add(Post post);

        void UpdateNotAppPost(Post post);

        void Delete(int postId);

        void AddMaintenanceToPost(PostMaintenance postMaintenance);

        List<Post> GetAllByMaintenanceId(int id);
        List<Post> GetAllByUserId(int id);

    }
}