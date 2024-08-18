using Microsoft.EntityFrameworkCore;
using Todo.API.Data;
using Todo.API.Data.Models;
using Todo.API.Services.Interfaces;

namespace Todo.API.Services
{
    public class TodoItemService : ITodoItemService
    {
        private readonly TodoContext _dbContext;

        public TodoItemService(TodoContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> AddItemAsync(TodoItem item)
        {
            _dbContext.Add(item);

            await _dbContext.SaveChangesAsync();

            return item.Id;
        }

        public async Task DeleteItemAsync(TodoItem item)
        {
            _dbContext.Remove(item);

            await _dbContext.SaveChangesAsync();
        }

        public async Task<TodoItem?> GetItemByIdAsync(int id)
        {
           return await _dbContext.FindAsync<TodoItem>(id);
        }

        public async Task UpdateItemAsync(TodoItem item)
        {
            _dbContext.Update(item);

            await _dbContext.SaveChangesAsync();
        }
    }
}
