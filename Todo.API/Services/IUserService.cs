using Todo.API.Data.Models;

namespace Todo.API.Services
{
    public interface IUserService
    {
        Task RegisterAsync(UserDto user);

        Task<User?> GetUserByNameAsync(string username);

        Task DeleteAsync(User user, string password);

        bool IsAuthenticated(string password, string passwordHash);
    }
}
