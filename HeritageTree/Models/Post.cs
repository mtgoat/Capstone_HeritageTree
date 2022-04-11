using System;
using System.ComponentModel.DataAnnotations;
using System.Spatial;


namespace HeritageTree.Models
{
    public class Post
    {
        public int Id { get; set; }

        
        [MaxLength(255)]
        public string StreetAddress { get; set; }


        [MaxLength(50)]
        public string City { get; set; }


        [MaxLength(50)]
        public string State { get; set; }

        
        [DataType(DataType.PostalCode)]
        public int? Zip { get; set; }


        [Required]
        public double Latitude { get; set; } 


        [Required]
        public double Longitude { get; set; }

        public string test { get; set; }
        public Geography Location
        {
            get;
            set;

        }
        public int? WardId { get; set; }


        [MaxLength(50)]
        public string WardName { get; set; }


        [Required]
        [DataType(DataType.DateTime)]
        public DateTime CreateDateTime { get; set; }


        [Required]
        public int UserProfileId { get; set; }


        public UserProfile UserProfile { get; set; }

        [Required]
        public int TreeCommonNameId { get; set; }


        [MaxLength(50)]
        public string TreeCommonNameName { get; set; }


        [DataType(DataType.ImageUrl)]
        [MaxLength(255)]
        public string ImageLocation { get; set; }


        public int? HeritageStatusId { get; set; }

        [MaxLength(50)]
        public string HeritageStatusName { get; set; }


        [DataType(DataType.DateTime)]
        public DateTime? HeritageDateTime { get; set; }


        [Required]
        public int HealthStatusId { get; set; }


        public string HealthStatusName { get; set; }


        [Required]
        public int OwnershipId { get; set; }

        [MaxLength(50)]
        public string OwnershipName { get; set; }


        public bool? IsApproved { get; set; }
        
    }
}
