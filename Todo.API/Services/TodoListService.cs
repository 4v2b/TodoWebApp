using Microsoft.EntityFrameworkCore;
using Todo.API.Data.Models;

namespace Todo.API.Services
{
    public class TodoListService : ITodoListService
    {
        private readonly DbContext _dbContext;

        public TodoListService(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddListAsync(TodoList list)
        {
            _dbContext.Add(list);

            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteListAsync(TodoList list)
        {
            _dbContext.Remove(list);

            await _dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<TodoList>> GetAllListsByUserIdAsync(int userId)
        {
            return await _dbContext.Set<TodoList>()
                .Include(e => e.User)
                .Where(e => e.User.Id == userId)
                .ToListAsync();
        }

        public async Task<TodoList?> GetListByIdAsync(int id)
        {
            return await _dbContext.FindAsync<TodoList>(id); 
        }

        public Task UpdateListAsync(TodoList list)
        {
            throw new NotImplementedException();
        }
    }
}
