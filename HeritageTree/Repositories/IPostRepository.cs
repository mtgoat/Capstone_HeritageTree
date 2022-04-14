﻿using HeritageTree.Models;
using System.Collections.Generic;

namespace HeritageTree.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAll();
        public List<Post> GetAllNotApp();
        Post GetById(int id);

        Post GetByIdNotApp(int id);
        void Add(Post post);

        public void UpdateNotAppPost(Post post);

        public void Delete(int postId);

        public void AddMaintenanceToPost(PostMaintenance postMaintenance);

    }
}