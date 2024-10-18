import { useState, useRef } from "react";
import Icon from "./Icon";

export default function TextBox({maxLength =50, width = null, className = '', initValue = '', onSubmit = () => { }, onAbort = () => { } }) {
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
        <div className={"textbox " + className}>
            <textarea
                style={{ width: width || 'auto' }}
                ref={textareaRef}
                value={value}
                onChange={handleInputChange}
                rows={1}
                maxLength={maxLength}
                placeholder="To do..."
            />
            <Icon
                className={"cancelItem"}
                height={"1.35em"}
                width={"1.35em"}
                iconName={"cross"}
                onClick={() => onAbort()}
            ></Icon>
            <Icon
                className={"submitItem"}
                height={"0.9em"}
                width={"0.9em"}
                iconName={"checkmark"}
                onClick={() => { onSubmit(value); setValue('') }}
            ></Icon>

        </div>)
}