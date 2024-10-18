using Todo.API.Data.Models;

namespace Todo.API.Services.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(User user);
    }
}
