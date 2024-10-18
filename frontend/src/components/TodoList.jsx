import { useState, useEffect, useRef } from "react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import TodoItem from "./TodoItem";
import { deleteTodoItem, postTodoItem, putTodoItem, getTodo, putTodoList } from "../api/requests";
import Icon from "./Icon";
import NewTodoItem from "./NewTodoItem";
import TextBox from "./TextBox";

export async function loader({ params }) {
    const loadedTodoList = await getTodo(params.listId)
    return { loadedTodoList };
}

export default function TodoList() {
    const { sendPreviewInfo } = useOutletContext();
    const [creatingItem, setCreatingItem] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const { loadedTodoList } = useLoaderData()
    const [list, setList] = useState([])

    useEffect(
        () => setList(loadedTodoList),
        [loadedTodoList]
    )

    function handleItemUpdate(itemIndex, newItem) {

        const updatedList = { ...list, "items": list.items.map((item, i) => (i === itemIndex ? newItem : item)) }
        setList(updatedList)
    }

    async function handleNameUpdate(newName) {

        const responseList = await putTodoList({ ...list, "name": newName })
        if (responseList) {
            setList(responseList)
        }

        setIsEdited(false);
        sendPreviewInfo({ id: responseList.id, itemsCount: responseList.items.length, name: responseList.name })
    }

    async function handleItemSubmit(newItem) {

        const item = await postTodoItem(list.id, newItem)

        if (!item) return;
        const updatedList = { ...list, "items": [...list.items, item] }
        setList(updatedList)
        setCreatingItem(false)

        sendPreviewInfo({ id: updatedList.id, itemsCount: updatedList.items.length, name: updatedList.name })
    }

    async function handleItemDelete(itemId) {

        await deleteTodoItem(itemId)
        const updatedList = { ...list, "items": list.items.filter((el) => el.id != itemId) }
        setList(updatedList)
        sendPreviewInfo({ id: updatedList.id, itemsCount: updatedList.items.length, name: updatedList.name })
    }

    function handleNameUpdateAbort() {
        setIsEdited(false);
    }

    async function handleCheck(index) {
        const item = list.items[index];
        const responseItem = await putTodoItem({ ...item, isChecked: !item.isChecked });
        if (responseItem)
            handleItemUpdate(index, { ...item, isChecked: !item.isChecked });
    }

    const items = list.items
        ?.sort((a, b) => (a.isChecked && b.isChecked) ? 0 : (!a.isChecked ? -1 : 1))
        ?.map((el, index) => <TodoItem onItemDelete={handleItemDelete} onItemUpdate={handleItemUpdate} onCheck={handleCheck} index={index} key={index} item={el} />);

    return (<div className="todo-list">

        <div className="title-wrapper">

            {isEdited ? ((<TextBox initValue={list.name} onAbort={handleNameUpdateAbort} onSubmit={handleNameUpdate} ></TextBox>)) : (<>
                <span className="todo-list-title">
                    {list.name}
                </span>

                <Icon onClick={() => setIsEdited(true)} className="pencil" iconName={"pencil-outline"} width={"0.8em"} color="#FFFFFF" height={"0.8em"} />
                <Icon onClick={() => setCreatingItem(true)} className="plus" iconName={"add"} width={"0.9em"} height={"0.9em"} />
            </>)}
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