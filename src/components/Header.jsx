import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();


    return (
        <header>
            <h3 onClick={() => navigate("/")}>Home</h3>
        </header>
    )
}

export default Header;