using System.ComponentModel.DataAnnotations;

namespace HeritageTree.Models
{
    public class Ward
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
    }
}
