import { useState } from "react";
import { loginUser } from "../services/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();   // prevent page reload when the form is submitted (old school way)

        try {
            const data = await loginUser(email, password);
            // setMessage("Login successful: " + data.message);
            // login successful -> redirect to dashboard
            // store a token from backend
            localStorage.setItem("authToken", data.token || "loggedin");
            navigate("/dashboard");

        }
        catch (error) {
            setMessage("Login failed: " + (error.message || "Unknown error"));
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                {message && <p>{message}</p>}
            </form>
            <p>
                Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
        </>
    );
}