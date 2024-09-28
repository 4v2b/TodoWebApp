import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { authorise } from "../api/requests";
import { Link, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../utils/storageHelpers";

export default function Login() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState(null);
    const [remember, setRemember] = useState(false);

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

    function handleSubmit(event) {
        event.preventDefault();
        setError(null)

        if (!inputs.user || !inputs.password) {
            setError("Enter your login and password");
            return;
        }

        authorise(inputs.user, inputs.password, remember).then(success => {
            if (success) {
                navigate("/");
            } else {
                setError("Wrong login or password");
            }
        });
    }

    function handleInput(event) {
        if (error) setError('')
        setInputs({ ...inputs, [event.target.id]: event.target.value });
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
                <div style={{ visibility: error ? 'visible' : 'hidden' }} className="errors">
                    {error}
                </div>
                <input className="primary-btn" value="Log In" type="submit" />
                <div className="rememberMe">
                    <input id="remember" onChange={(e) => setRemember(e.target.checked)} type="checkbox" />
                    <label htmlFor="remember">Remember me</label>
                </div>
                <Link to="/register" className="alt-link">I don't have an account</Link>
            </form>
        </div>
    );
}