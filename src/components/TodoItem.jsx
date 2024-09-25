import { useState, useEffect } from "react";
import Icon from "./Icon";
import TextBox from "./TextBox";
import { putTodoItem } from "../api/requests";

export default function TodoItem({ index, item, onCheck, onItemDelete, onItemUpdate }) {
    const [triggerSpark, setTriggerSpark] = useState(false);
    const [isEdited, setIsEdited] = useState(false);

    function handleClick() {
        onCheck(index);
        if (!item.isChecked) {
            setTriggerSpark(true);

            setTimeout(() => {
                setTriggerSpark(false);
            }, 500);
        }
    };

    function handleEdition() {
        setIsEdited(true);
    }

    async function handleSubmitChange(value) {

        console.log(value);

        const responseItem = await putTodoItem({...item, content : value });

        if(responseItem){
            onItemUpdate(index, responseItem);
            setIsEdited(false);
        }
    }

    function handleAbortChange() {
        setIsEdited(false)
    }


    const sparks = (
        <div className="sparks">
            <div className="spark spark-1"></div>
            <div className="spark spark-2"></div>
            <div className="spark spark-3"></div>
        </div>
    );

    return (
        <div className={(item.isChecked ? "todo-item-checked" : "todo-item")}>
            <div className="checkbox" type="button" onClick={handleClick}>
                <svg
                    className="checkmark"
                    style={{ "visibility": item.isChecked ? "visible" : "hidden" }}
                    viewBox="1 1 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M6 12L10 16L18 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {triggerSpark && sparks}
            </div>

            {
                isEdited ?
                    (<TextBox initValue={item.content} onSubmit={handleSubmitChange} onAbort={handleAbortChange}></TextBox>)
                    : (<>        <span>{item.content}</span>
                        <Icon className="pencil" onClick={handleEdition} iconName={"pencil-outline"} width={"1em"} color="#FFFFFF" height={"1em"} />
                        <Icon onClick={() => onItemDelete(item.id)} className="delete" height={"1em"} width={"1em"} color={"#58676A"} iconName={"trash-bin-outline"}></Icon>
                    </>)
            }
        </div>
    );
}
