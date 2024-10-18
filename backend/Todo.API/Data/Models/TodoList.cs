using Microsoft.EntityFrameworkCore;

namespace Todo.API.Data.Models
{
    public class TodoList : BaseEntity
    {
        public string Name { get; set; } = null!;

        public User User { get; set; } = null!;

        [DeleteBehavior(DeleteBehavior.ClientCascade)]
        public ICollection<TodoItem> Items { get; } = new List<TodoItem>();
    }
}
