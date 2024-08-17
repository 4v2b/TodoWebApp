using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Todo.API.Services;

namespace Todo.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> SignUp([FromBody] UserDto newUser, [FromServices] IUserService userService)
        {
            try
            {
                await userService.RegisterAsync(newUser);
            }
            catch (AggregateException ex) 
            {
                if(ex.InnerException is not ArgumentException)
                {
                    throw ex.InnerException;
                }
                return BadRequest();
            }
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UserDto user, [FromServices] IUserService userService, [FromServices] IJwtService jwtService)
        {
            var storedUser = await userService.GetUserByNameAsync(user.Name);

            if (storedUser == null) 
            {
                return BadRequest();
            }

            if(!userService.ValidatePassword(user.Password, storedUser.PasswordHash))
            {
                return BadRequest();
            }

            string token = jwtService.GenerateToken(storedUser);

            return Ok(token);
        }
    }
}
