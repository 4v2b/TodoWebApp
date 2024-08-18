using BCrypt.Net;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;
using Todo.API.Data;
using Todo.API.Data.Models;

namespace Todo.API.Services
{
    public class UserService : IUserService
    {
        private readonly TodoContext _dbContext;

        public UserService(TodoContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task DeleteAsync(User user)
        {
            _dbContext.Remove(user);

            await _dbContext.SaveChangesAsync();
        }

        public async Task<User?> GetUserByNameAsync(string username)
        {
            return await _dbContext.Users.SingleOrDefaultAsync(e => e.Name.Equals(username));
        }

        public bool ValidatePassword(string password, string passwordHash)
        {
            ArgumentNullException.ThrowIfNull(password);
            ArgumentNullException.ThrowIfNull(passwordHash);

            return BCrypt.Net.BCrypt.Verify(password, passwordHash);
        }

        public async Task RegisterAsync(UserDto user)
        {
            var storedUser = await GetUserByNameAsync(user.Name);

            if (storedUser != null)
            {
                throw new ArgumentException("Such user already exists");
            }

            var newUser = new User
            {
                Name = user.Name,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.Password)
            };

            _dbContext.Add(newUser);

            await _dbContext.SaveChangesAsync();
        }
    }
}
