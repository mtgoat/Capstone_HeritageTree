using System.ComponentModel.DataAnnotations;

namespace HeritageTree.Models
{
    public class TreeCommonName
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public bool IsActive { get; set; }

        //public TreeCommonName ()
        //{
        //    IsActive = true;
        //}
    }
}
