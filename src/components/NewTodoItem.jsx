import TextBox from "./TextBox";

export default function NewTodoItem({ onItemSubmit, onItemAbort }) {
    
    function handleSubmit(value) {

        if (value.length < 1) {
            return;
        }

        const newItem = {
            id: 0,
            isChecked: false,
            content: value
        }
        onItemSubmit(newItem)
    }

    return (
        <div className={"new-todo-item"}>
            <div className="checkbox" >
            </div>

            <TextBox
                onSubmit={(value) => handleSubmit(value)}
                onAbort={() => onItemAbort()}
            ></TextBox>
        </div>
    );
}
