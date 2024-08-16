using Microsoft.EntityFrameworkCore;
using Todo.API.Data.Models;

namespace Todo.API.Data
{
    public class TodoContext : DbContext
    {
        public DbSet<TodoItem> TodoItems { get; set; }
        public DbSet<TodoList> TodoLists { get; set; }
        public DbSet<User> Users { get; set; }

        public TodoContext(DbContextOptions options) : base(options)
        {
            
        }
    }
}
