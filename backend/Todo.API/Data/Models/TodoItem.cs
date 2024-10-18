using System.ComponentModel.DataAnnotations;

namespace Todo.API.Data.Models
{
    public class TodoItem : BaseEntity
    {
        public bool IsChecked { get; set; } = false;

        [MaxLength(200)]
        public string Content { get; set; } = null!;

        public TodoList TodoList { get; set; } = null!;
    }
}
