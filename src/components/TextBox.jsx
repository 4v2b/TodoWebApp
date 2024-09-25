import { useState, useRef } from "react";
import Icon from "./Icon";

export default function TextBox({ initValue = '', onSubmit, onAbort }) {
    const [value, setValue] = useState(initValue);
    const textareaRef = useRef(null);

    const handleInputChange = (event) => {
        setValue(event.target.value);
        autoResizeTextarea();
    };

    const autoResizeTextarea = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };
    return (
        <div className={"textbox"}>
            <textarea
                ref={textareaRef}
                value={value}
                onChange={handleInputChange}
                rows={1}
                maxLength="70"
                placeholder="To do..."
            />
            <Icon
                className={"cancelItem"}
                color="#58676A"
                height={"1.5em"}
                width={"1.5em"}
                iconName={"cross"}
                onClick={() => onAbort()}
            ></Icon>
            <Icon
                className={"submitItem"}
                color="#58676A"
                height={"1em"}
                width={"1em"}
                iconName={"checkmark"}
                onClick={() => {onSubmit(value); setValue(initValue)}}
            ></Icon>

        </div>)
}