using System.ComponentModel.DataAnnotations;

namespace HeritageTree.Models
{
    public class HeritageStatus
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
