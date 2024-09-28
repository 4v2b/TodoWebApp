using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Todo.API.Data.Models;
using Todo.API.Services.DTO;
using Todo.API.Services.Interfaces;

namespace Todo.API.Controllers
{
    [Authorize]
    [EnableCors("AllowReactApp")]
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoListDto>>> GetTodos([FromServices] ITodoListService todoListService)
        {
            string? idString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if(idString == null)
            {
                return NotFound("User id not found");
            }

            int userId = int.Parse(idString);

            IEnumerable<TodoList> lists = await todoListService.GetAllListsByUserIdAsync(userId);

            var listsDto = lists.Adapt<IEnumerable<TodoListDto>>();

            return Ok(listsDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TodoListDto>> GetList(int id, [FromServices] ITodoListService todoListService)
        {
            var list = await todoListService.GetListByIdAsync(id);

            if(list == null)
            {
                return NotFound("List with given id not found");
            }

            var listDto = list.Adapt<TodoListDto>();

            return Ok(listDto);
        }

        [HttpPost]
        public async Task<IActionResult> CreateList([FromBody] TodoListDto listDto, [FromServices] ITodoListService todoListService, [FromServices] IUserService userService)
        {
            var list = listDto.Adapt<TodoList>();

            list.Id = 0;

            string name = User.FindFirst(ClaimTypes.Name)?.Value ?? string.Empty;

            var user = await userService.GetUserByNameAsync(name);

            if (user == null)
            {
                return NotFound("User id not found");
            }

            list.User = user;

            int id = await todoListService.AddListAsync(list);

            return CreatedAtAction(nameof(CreateList), new { Id = id }, list.Adapt<TodoListDto>());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateList(int id, [FromBody] TodoListDto listDto, [FromServices] ITodoListService todoListService)
        {
            var list = await todoListService.GetListByIdAsync(id);

            if(list == null)
            {
               return NotFound("Todo list with given id not found");
            }

            list.Name = listDto.Name ?? list.Name;

            await todoListService.UpdateListAsync(list);

            return Ok(list.Adapt<TodoListDto>());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteList(int id, [FromServices] ITodoListService todoListService)
        {
            var list = await todoListService.GetListByIdAsync(id);

            if(list == null)
            {
                return NotFound("List with given id not found");
            }

            await todoListService.DeleteListAsync(list);

            return Ok("Deleted successfully");
        }

        [HttpPost("{listId}")]
        public async Task<IActionResult> CreateItem(int listId, TodoItemDto itemDto, [FromServices]ITodoListService todoListService, [FromServices] ITodoItemService todoItemService)
        {
            var list = await todoListService.GetListByIdAsync(listId);

            if (list == null)
            {
                return NotFound("List with given id not found");
            }

            var item = itemDto.Adapt<TodoItem>();

            item.TodoList = list;

            int id = await todoItemService.AddItemAsync(item);

            return CreatedAtAction(nameof(CreateItem), new { Id = id}, item.Adapt<TodoItemDto>());
        }

        [HttpPut("items/{id}")]
        public async Task<IActionResult> UpdateItem(int id, TodoItemDto itemDto, [FromServices] ITodoItemService todoItemService)
        {
            var item = await todoItemService.GetItemByIdAsync(id);

            if (item == null)
            {
                return NotFound("Item with given id not found");
            }

            if(itemDto.Content != null && !itemDto.Content.Equals(item.Content))
            {
                item.Content = itemDto.Content;
            }

            item.IsChecked = itemDto.IsChecked;

            await todoItemService.UpdateItemAsync(item);

            return Ok(item.Adapt<TodoItemDto>());
        }

        [HttpDelete("items/{id}")]
        public async Task<IActionResult> DeleteItem(int id, [FromServices] ITodoItemService todoItemService)
        {
            var item = await todoItemService.GetItemByIdAsync(id);

            if (item == null)
            {
                return NotFound("Item with given id not found");
            }

            await todoItemService.DeleteItemAsync(item);

            return Ok("Item deleted successfully");
        }
    }
}
