using Todo.API.Data.Models;

namespace Todo.API.Services
{
    public interface ITodoService
    {
        Task AddList(TodoList list);

        Task DeleteList(TodoList list);

        Task DeleteItem(TodoItem item);

        Task<IEnumerable<TodoList>> GetAllListWithItems();

        Task<TodoList> GetListById(int id);

    }
}
