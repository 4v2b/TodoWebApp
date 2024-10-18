using Todo.API.Data.Models;

namespace Todo.API.Services.Interfaces
{
    public interface ITodoListService
    {
        Task<int> AddListAsync(TodoList list);

        Task UpdateListAsync(TodoList list);

        Task DeleteListAsync(TodoList list);

        Task<IEnumerable<TodoList>> GetAllListsByUserIdAsync(int userId);

        Task<TodoList?> GetListByIdAsync(int id);
    }
}
