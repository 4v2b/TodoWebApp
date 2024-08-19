using Mapster;
using System;
using Todo.API.Data.Models;
using Todo.API.Services.DTO;

namespace Todo.API.Services
{
    public static class MappingExtensions
    {
        public static void RegisterMapsterConfiguration(this IServiceCollection services)
        {
            TypeAdapterConfig<TodoItem, TodoItemDto>.NewConfig();

            TypeAdapterConfig<TodoItemDto, TodoItem>.NewConfig().Ignore(dto => dto.Id);

            TypeAdapterConfig<TodoListDto, TodoList>.NewConfig().Ignore(dest => dest.Id, dest => dest.User, dest => dest.Items);

            TypeAdapterConfig<TodoList, TodoListDto>.NewConfig()
            .Map(dest => dest.UserId, src => src.User.Id);
        }
    }
}
