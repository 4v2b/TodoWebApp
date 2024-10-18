using System.ComponentModel.DataAnnotations;

namespace Todo.API.Data.Models
{
    public class User : BaseEntity
    {
        [MaxLength(100)]
        public string Name { get; set; } = null!;

        public string PasswordHash { get; set; } = null!;

        public ICollection<TodoList> TodoLists { get; } = new List<TodoList>();
    }
}
