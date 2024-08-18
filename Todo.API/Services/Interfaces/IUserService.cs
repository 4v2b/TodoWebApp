using Todo.API.Data.Models;
using Todo.API.Services.DTO;

namespace Todo.API.Services.Interfaces
{
    public interface IUserService
    {
        Task RegisterAsync(UserDto user);

        Task<User?> GetUserByNameAsync(string username);

        Task DeleteAsync(User user);

        bool ValidatePassword(string password, string passwordHash);
    }
}
