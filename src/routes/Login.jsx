import { useState } from "react";
import { authorise, getTodos } from "../api/requests";
import { redirect } from "react-router-dom";
import { getToken } from "../utils/storageHelpers";

export default function Login() {
    const [inputs, setInputs] = useState({});
    let errors;

    async function handleSubmit(event) {
        event.preventDefault();
        authorise(inputs.user, inputs.password).then(success => {
            if (success) {
                redirect("/api/todo", {
                    headers: {
                        "Authorization": `Bearer ${getToken()}`
                    }
                });
                getTodos().then(data => console.log(data))
                console.log(getToken());
            } else console.log("Wrong login or password");
        })
    }

    function handleInput(event) {
        console.log(inputs)
        setInputs({ ...inputs, [event.target.id]: event.target.value })
    }

    return (
        <div className="flex-container">
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <div className="input-group">
                    <input id="user" onBlur={handleInput} placeholder="Username"></input>
                    <label>{errors?.username}</label>
                </div>
                <div className="input-group">
                    <input type="password" onBlur={handleInput} id="password" placeholder="Password"></input>
                    <label>{errors?.password}</label>
                </div>
                <input className="primary-btn" value="Log In" type="submit"></input>
                <a href="/register" className="alt-link">I dont have an account</a>
            </form>
        </div>
    )
}