using System;
using System.ComponentModel.DataAnnotations;

namespace HeritageTree.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [Required]
        public string DisplayName { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }
               
        [Required]
        public DateTime DateCreated { get; set; }

        [Required]
        public int UserTypeId { get; set; }

        public string UserTypeName { get; set; }

    }
}
