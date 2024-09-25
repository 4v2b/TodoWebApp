import { useState, useEffect } from "react";
import Icon from "./Icon";

export default function TodoItem({ index, item, onCheck, onItemDelete, onItemUpdate }) {
    const [triggerSpark, setTriggerSpark] = useState(false);

    const handleClick = () => {
        onCheck(index);
        if (!item.isChecked) {
            setTriggerSpark(true);

            setTimeout(() => {
                setTriggerSpark(false);
            }, 500);
        }
    };

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
            <span>{item.content}</span>
            <Icon className="pencil" iconName={"pencil-outline"} width={"1em"} color="#FFFFFF" height={"1em"} />
            <Icon onClick={() => onItemDelete(item.id)} className="delete" height={"1em"} width={"1em"} color={"#58676A"} iconName={"trash-bin-outline"}></Icon>
        </div>
    );
}
