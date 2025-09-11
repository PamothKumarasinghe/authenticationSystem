import { useState } from "react";
import { signupUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();   // prevent page reload when the form is submitted (old school way)

        try {
            const data = await signupUser(username, email, password);
            // setMessage("Signup successful: " + data.message);
            setUsername("");
            setEmail("");
            setPassword("");
            // store a token from backend
            localStorage.setItem("authToken", data.token || "loggedin");
            // signup successful -> redirect to dashboard
            navigate("/dashboard");
        }
        catch(error) {
            setMessage("Signup failed: " + (error.message || "Unknown error"));
        }

    };

    return (
         <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "50px" }}>
            <h2>Signup
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Signup</button>
                    {message && <p>{message}</p>}
                </form>
            </h2>
         </div>
    );
}