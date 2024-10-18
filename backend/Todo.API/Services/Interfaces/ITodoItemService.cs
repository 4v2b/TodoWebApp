using Todo.API.Data.Models;

namespace Todo.API.Services.Interfaces
{
    public interface ITodoItemService
    {
        Task<int> AddItemAsync(TodoItem item);

        Task UpdateItemAsync(TodoItem item);

        Task DeleteItemAsync(TodoItem item);

        Task<TodoItem?> GetItemByIdAsync(int id);
    }
}
