using System.ComponentModel.DataAnnotations;

namespace HeritageTree.Models
{
    public class TreeCommonName
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        public bool IsActive { get; set; }

        //public TreeCommonName ()
        //{
        //    IsActive = true;
        //}
    }
}
