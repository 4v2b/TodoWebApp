import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { register } from "../api/requests";
import { Link, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../utils/storageHelpers";

export default function Register() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        let token = getToken();
        if (!token) return;
        let decodedToken = jwtDecode(token);
        let currentDate = new Date();

        if (decodedToken.exp * 1000 >= currentDate.getTime()) {
            navigate("/");
        } else {
            removeToken();
            setError('Your session ended. Log in')
        }
    }, [navigate]);

    async function handleSubmit(event) {
        event.preventDefault();
        setError(null)

        if (!inputs.user || !inputs.password || !inputs.copyPassword) {
            setError("Enter your login and password");
            return;
        }

        if (inputs.password != inputs.copyPassword) {
            setError("Your password is not the same");
            return;
        }

        const response = await register(inputs.user, inputs.password);

        if (response.ok) {
            navigate("/");
        } else {
            setError(response.message);
        }
    }

    function handleInput(event) {
        if (event.target.id == "copyPassword" && event.target.id.length < 8) {
            setError("Password's length must be at least 8 symbols");
        }
        else {
            if (error) setError('')
            setInputs({ ...inputs, [event.target.id]: event.target.value });
        }
    }

    return (
        <div className="flex-container">
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input id="user" onBlur={handleInput} placeholder="Username" />
                </div>
                <div className="input-group">
                    <input type="password" onBlur={handleInput} id="password" placeholder="Password" />
                </div>
                <div className="input-group">
                    <input type="password" onBlur={handleInput} id="copyPassword" placeholder="Repeat password" />
                </div>
                <div style={{ visibility: error ? 'visible' : 'hidden' }} className="errors">
                    {error}
                </div>
                <input className="primary-btn" value="Register" type="submit" />
                <Link to="/login" className="alt-link">I already have an account</Link>
            </form>
        </div>
    );
}