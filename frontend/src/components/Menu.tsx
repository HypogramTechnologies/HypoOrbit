import "../styles/menu.css";
import HeaderImg from "../assets/Header.png"; 

const Menu: React.FC = () => {
    return (
        // <header className="menu">
            <div className="menu-container">
                <img src={HeaderImg} alt="Logo" className="header-logo" />
                <h1>abc</h1>
            </div>
        // </header>
    );
};

export default Menu;
