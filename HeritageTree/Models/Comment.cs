﻿using System;
using System.ComponentModel.DataAnnotations;

namespace HeritageTree.Models
{
    public class Comment
    {
        public int Id { get; set; }

        [Required]
        public string Subject { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        public int UserProfileId { get; set; }
            
        public UserProfile UserProfile { get; set; } 
public DateTime DateCreated { get; set; }
        [Required]
        public int PostId { get; set; }
        public Post Post { get; set; }
        public bool IsDeleted { get; set; }
    }
}
