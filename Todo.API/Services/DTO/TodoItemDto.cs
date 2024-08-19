namespace Todo.API.Services.DTO
{
    public class TodoItemDto
    {
        public int? Id { get; set; }
        public string? Content { get; set; }
        public bool IsChecked { get; set; }
    }
}
