import { useState } from "react";
import TodoItem from "./TodoItem";
import { deleteTodoItem, postTodoItem, putTodoItem } from "../api/requests";
import Icon from "./Icon";
import NewTodoItem from "./NewTodoItem";

export default function TodoList({ index, list, onListCreation, onListUpdate }) {
    const [creatingItem, setCreatingItem] = useState(false);

    function handleItemUpdate(itemIndex, newItem) {

        const updatedList = { ...list, "items": list.items.map((item, i) => (i === itemIndex ? newItem : item)) }

        onListUpdate(index, updatedList)
    }

    async function handleItemSubmit(newItem) {

        const item = await postTodoItem(list.id, newItem)

        const updatedList = { ...list, "items": [...list.items, item] }

        onListUpdate(index, updatedList)
    }

    async function handleItemDelete(itemId) {

        await deleteTodoItem(itemId)

        const updatedList = { ...list, "items": list.items.filter((el)=> el.id != itemId) }

        onListUpdate(index, updatedList)
    }

    async function handleCheck(index) {
        const item = list.items[index];
        const responseItem = await putTodoItem({ ...item, isChecked: !item.isChecked });
        if (responseItem)
            handleItemUpdate(index, { ...item, isChecked: !item.isChecked });
    }

    const items = list.items
        .sort((a, b) => (a.isChecked && b.isChecked) ? 0 : (!a.isChecked ? -1 : 1))
        .map((el, index) => <TodoItem onItemDelete={handleItemDelete} onItemUpdate={handleItemUpdate} onCheck={handleCheck} index={index} key={index} item={el} />);

    return (<div className="todo-list">

        <div className="title-wrapper">
            <span className="todo-list-title">
                {list.name}
            </span>
            <Icon className="pencil" iconName={"pencil-outline"} width={"0.8em"} color="#FFFFFF" height={"0.8em"} />

            <Icon onClick={() => setCreatingItem(true)} className="plus" iconName={"add"} width={"0.9em"} height={"0.9em"} color="#58676A" />

        </div>
        <div className="todo-items-wrapper">
            {items}
            {creatingItem &&
                (<NewTodoItem
                    onItemAbort={() => setCreatingItem(false)}
                    onItemSubmit={handleItemSubmit}
                ></NewTodoItem>)}
        </div>
    </div>);
}