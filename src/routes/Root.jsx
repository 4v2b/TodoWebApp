import { useState, useEffect, useMemo } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import TodoListPreview from "../components/TodoListPreview";
import { deleteTodoList, postTodoList, getTodos } from "../api/requests";
import Icon from "../components/Icon";
import { removeToken } from "../utils/storageHelpers";

export async function loader() {
    const loadedTodoLists = ((await getTodos()) ?? []).map(el => ({ id: el.id, name: el.name, itemsCount: el.items.length }));
    return { loadedTodoLists };
}

export default function Root() {
    const navigate = useNavigate();
    const { loadedTodoLists } = useLoaderData();
    const [lists, setLists] = useState([]);
    const [value, setValue] = useState('');
    const [expanded, setExpanded] = useState(true)

    const memoizedLoadedTodoLists = useMemo(() => loadedTodoLists, [loadedTodoLists]);

    useEffect(() => {
        if (JSON.stringify(lists) !== JSON.stringify(memoizedLoadedTodoLists)) {
            setLists([...memoizedLoadedTodoLists]);
        }
    }, [memoizedLoadedTodoLists]);

    function handlePreviewUpdate(updatedList) {
        setLists(lists.map(el => el.id !== updatedList.id ? el : updatedList));
    }

    async function handleListDelete(index) {
        console.log("is deleting");

        const id = lists[index].id;

        const response = await deleteTodoList(id);
        if (response) {
            const newLists = lists.filter(el => el.id !== id);
            setLists(newLists);
            navigate("/");
        }
    }

    async function handleSubmit(value) {
        const newList = {
            userId: 0,
            items: [],
            name: value,
            id: 0,
        };

        const responseList = await postTodoList(newList);

        console.log(responseList);

        if (responseList) {
            setLists([...lists, { id: responseList.id, name: responseList.name, itemsCount: responseList.items.length }]);
        }
        setValue('');
    }

    function logOut() {
        removeToken();
        navigate('/login');
    }

    function handleExpand() {
        setExpanded(!expanded);
    }

    return (
        <div className="main-container">
            <div className={`sidebar ${expanded ? "expanded" : ""}`}>
                <div className="content">
                    <div className="user-panel">
                        <div className="exit-btn" onClick={logOut}>
                            <span>Log Out</span>
                            <Icon className={"exit-icon"} iconName={'exit'} color="none" stroke="black" width={"1em"} height={"1em"} ></Icon>
                        </div>
                    </div>
                    <div className="new-list">
                        <input placeholder="Create a list" value={value} type="text" onInput={event => setValue(event.target.value)} />
                        <div onClick={() => {handleSubmit(value); }}>
                            <Icon className="plus" iconName={"add"} width={"0.9em"} height={"0.9em"} />
                        </div>
                    </div>

                    {lists.map((el, index) => (
                        <TodoListPreview
                            name={el.name}
                            itemsCount={el.itemsCount}
                            index={index}
                            id={el.id}
                            key={index}
                            onDelete={() => handleListDelete(index)}
                        />
                    ))}
                </div>
                <div className="expand-btn" onClick={handleExpand}>
                    <Icon width={"1em"} height={"1em"} className={"arrow"} iconName={"right-arrow"}></Icon>
                </div>
            </div>
            <div className="flex-container">
                <Outlet context={{ sendPreviewInfo: handlePreviewUpdate }} />
            </div>
        </div>
    );
}
