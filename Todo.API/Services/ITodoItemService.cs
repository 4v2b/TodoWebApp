using Todo.API.Data.Models;

namespace Todo.API.Services
{
    public interface ITodoItemService
    {
        Task AddItemAsync(TodoItem item);

        Task UpdateItemAsync(TodoItem item);

        Task DeleteItemAsync(TodoItem item);

        Task<TodoItem?> GetItemByIdAsync(int id);
    }
}
