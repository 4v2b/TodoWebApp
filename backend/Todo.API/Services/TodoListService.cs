using Microsoft.EntityFrameworkCore;
using Todo.API.Data;
using Todo.API.Data.Models;
using Todo.API.Services.Interfaces;

namespace Todo.API.Services
{
    public class TodoListService : ITodoListService
    {
        private readonly TodoContext _dbContext;

        public TodoListService(TodoContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> AddListAsync(TodoList list)
        {
            _dbContext.Add(list);

            await _dbContext.SaveChangesAsync();

            return list.Id;
        }

        public async Task DeleteListAsync(TodoList list)
        {
            _dbContext.Remove(list);

            await _dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<TodoList>> GetAllListsByUserIdAsync(int userId)
        {
            return await _dbContext.TodoLists
                .Include(e => e.User)
                .Include(e => e.Items)
                .Where(e => e.User.Id == userId)
                .ToListAsync();
        }

        public async Task<TodoList?> GetListByIdAsync(int id)
        {
            return await _dbContext.TodoLists.Include(e => e.Items).SingleOrDefaultAsync(e => e.Id == id); 
        }

        public async Task UpdateListAsync(TodoList list)
        {
            _dbContext.Update(list);

            await _dbContext.SaveChangesAsync();
        }
    }
}
