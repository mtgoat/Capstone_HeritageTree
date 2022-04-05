using System;
using System.ComponentModel.DataAnnotations;
using System.Spatial;

namespace HeritageTree.Models
{
    public class Post
    {
        public int Id { get; set; }

        [Required]
        public string StreetAddress { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string State { get; set; }

        [Required]
        public int Zip { get; set; }

        public Geography Location { get; set; }

        [Required]
        public int WardId { get; set; }
        public string WardName { get; set; }

        [Required]
        public DateTime CreateDateTime { get; set; }

        [Required]
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }

        [Required]
        public int TreeCommonNameId { get; set; }

        public string TreeCommonNameName { get; set; }

        public string ImageLocation { get; set; }

        public int HeritageStatusId { get; set; }

        public string HeritageStatusName { get; set; }

        public DateTime HeritageDateTime { get; set; }

        [Required]
        public int HealthStatusId { get; set; }
        public string HealthStatusName { get; set; }

        [Required]
        public int OwnershipId { get; set; }
        public string OwnershipName { get; set; }
        public bool IsApproved { get; set; }
        
    }
}
