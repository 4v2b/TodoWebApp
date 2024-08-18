namespace Todo.API.Services.DTO
{
    public class TodoListDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public ICollection<int> ItemsIds { get; set; } = new List<int>();
    }
}
