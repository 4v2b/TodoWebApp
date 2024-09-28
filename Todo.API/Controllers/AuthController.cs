using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Todo.API.Services.DTO;
using Todo.API.Services.Interfaces;

namespace Todo.API.Controllers
{
    [EnableCors("AllowReactApp")]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost("[action]")]
        public async Task<IActionResult> SignUp([FromBody] UserDto newUser, [FromServices] IUserService userService)
        {
            try
            {
                await userService.RegisterAsync(newUser);
            }
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
            return Ok();
        }

        [HttpPost("[action]")]
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
