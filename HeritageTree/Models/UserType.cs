using System.ComponentModel.DataAnnotations;

namespace HeritageTree.Models
{
    public class UserType
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
