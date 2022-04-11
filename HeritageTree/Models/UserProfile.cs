using System;
using System.ComponentModel.DataAnnotations;

namespace HeritageTree.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string DisplayName { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime CreateDateTime { get; set; }

        [Required]
        public int UserTypeId { get; set; }

        [MaxLength(50)]
        public string UserTypeName { get; set; }

        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }
    }
}