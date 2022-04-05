using System.ComponentModel.DataAnnotations;

namespace HeritageTree.Models
{
    public class Ownership
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
