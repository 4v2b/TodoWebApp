import { getTodos } from "../api/requests"
import {
    useLoaderData,
} from "react-router-dom";
import TodoList from "../components/TodoList";
import { useEffect, useState } from "react";

export default function Board() {
    const { loadedTodoLists } = useLoaderData()
    const [lists, setLists] = useState([])

    console.log(loadedTodoLists)

    useEffect(
        () => setLists([...loadedTodoLists]),
        [loadedTodoLists]
    )

    function handleListCreation(list) {
        setLists([...lists, list])
    }

    function handleListUpdate(index, newList) {
        setLists(lists.map((list, i) => (i === index ? newList : list)))
    }

    console.log(lists)
    return (<div className="todo-container flex-container">
        {lists.map((el, index) => <TodoList index={index} key={el.id} list={el} onListCreation={handleListCreation} onListUpdate={handleListUpdate} />)}
    </div>)
}

// Todo: Remove stub data
export async function loader() {
    const loadedTodoLists = await getTodos()
    //console.log(loadedTodoLists)
    return { loadedTodoLists };
    // const loadedTodoLists =
    //     [{
    //         name: "Movie list",
    //         items: [
    //             {
    //                 id: 1,
    //                 content: "Dune: Part 2",
    //                 isChecked: false
    //             },
    //             {
    //                 id: 2,

    //                 content: "Inception",
    //                 isChecked: true
    //             },
    //             {
    //                 id: 3,

    //                 content: "Pulp Fiction",
    //                 isChecked: true
    //             },
    //             {
    //                 id: 4,

    //                 content: "Barbie",
    //                 isChecked: false
    //             }
    //         ]
    //     }
    // ]

    return {
        loadedTodoLists
    }
}

