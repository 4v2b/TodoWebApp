import Icon from "./Icon";
import { Link, useNavigate } from "react-router-dom";

export default function TodoListPreview({ id, index, name, itemsCount, onDelete }) {

    const navigate = useNavigate();

    return (
        <div className="todo-list-prev" onClick={() => navigate(`/todo/${id}`)}>

            <div className="todo-list-prev-name">{name}</div>
            <div className="items-count">{"(" + itemsCount + ")"}</div>

            <div className="list-delete" onClick={(event) => { event.stopPropagation(); onDelete(index); }}>
                <div className="bubble">

                </div>
                <Icon
                    className={"list-delete-icon"}
                    width={"1em"}
                    height={"1em"}
                    iconName={"trash-bin-outline"}
                />

            </div>


        </div>
    )
}