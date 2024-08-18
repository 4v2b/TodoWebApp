using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Todo.API.Data.Models;
using Todo.API.Services.Interfaces;

namespace Todo.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoList>>> GetTodos([FromServices] ITodoListService todoListService)
        {
            string? idString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if(idString == null)
            {
                return NotFound("User id not found");
            }

            int userId = int.Parse(idString);

            IEnumerable<TodoList> lists = await todoListService.GetAllListsByUserIdAsync(userId);

            return Ok(lists);
        }

        [HttpPost]
        public async Task<IActionResult> CreateList([FromBody] TodoList list,[FromServices] ITodoListService todoListService)
        {
            int id = await todoListService.AddListAsync(list);

            return CreatedAtAction(nameof(CreateList), new { Id = id }, list);
        }
    }
}
