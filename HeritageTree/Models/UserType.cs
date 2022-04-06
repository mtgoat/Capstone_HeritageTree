using System.ComponentModel.DataAnnotations;

namespace HeritageTree.Models
{
    public class UserType
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string Name { get; set; }

        public static int ADMIN_ID => 1;
        public static int PUBLIC_ID => 2;
        public static int Arbor_ID => 3;
    }
}
