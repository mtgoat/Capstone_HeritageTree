﻿using System.ComponentModel.DataAnnotations;

namespace HeritageTree.Models
{
    public class HealthStatus
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
