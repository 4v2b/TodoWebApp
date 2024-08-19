namespace Todo.API.Services.DTO
{
    public class TodoListDto
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public int UserId { get; set; }
        public ICollection<TodoItemDto> Items { get; set; } = new List<TodoItemDto>();
    }
}
