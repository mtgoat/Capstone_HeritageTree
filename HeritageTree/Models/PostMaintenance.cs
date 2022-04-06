using System;
using System.ComponentModel.DataAnnotations;

namespace HeritageTree.Models
{
    public class PostMaintenance
    {
        public int Id { get; set; }

        [Required]
        public int PostId { get; set; }

        [Required]
        public int MaintenanceId { get; set; }
               
        public string MaintenanceName { get; set; }
    }
}
