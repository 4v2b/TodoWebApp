using Todo.API.Data.Models;

namespace Todo.API.Services
{
    public interface IJwtService
    {
        string GenerateToken(User user);
    }
}
