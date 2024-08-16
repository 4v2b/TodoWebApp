using Todo.API.Data.Models;

namespace Todo.API.Services
{
    public interface ITodoListService
    {
        Task AddListAsync(TodoList list);

        Task UpdateListAsync(TodoList list);

        Task DeleteListAsync(TodoList list);

        Task<IEnumerable<TodoList>> GetAllListsByUserIdAsync(int userId);

        Task<TodoList?> GetListByIdAsync(int id);
    }
}
