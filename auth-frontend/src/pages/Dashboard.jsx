import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../services/axiosConfig";

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setAuthToken(null); // remove token from axios headers
        
        navigate("/");
    }
    return (
        <div>
            <h2>Welcome to the Dashboard!</h2>
            <p>You have now logged in</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Dashboard;