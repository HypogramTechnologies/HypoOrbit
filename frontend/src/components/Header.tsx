import "../styles/header.css";
import HeaderImg from "../assets/Header.png"; 

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header-container">
                <img src={HeaderImg} alt="Logo" className="header-logo" />
            </div>
        </header>
    );
};

export default Header;
