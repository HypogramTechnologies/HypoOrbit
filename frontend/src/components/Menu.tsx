import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/menu.css";
import HeaderImg from "../assets/Header.png";

const Menu: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const menuOptions = [
    { icon: "fa-map", label: "Mapa", path: "/map" },
    { icon: "fa-database", label: "Lista de satélites", path: "/satellite" },
    { icon: "fa-chart-line", label: "Séries temporais", path: "/timeseries" },
  ];

  return (
    <div className="menu">
      <img src={HeaderImg} alt="Logo" className="menu-logo" />
      <nav className="menu-links">
        <p className="menu-title">NAVEGAÇÃO</p>
        {menuOptions.map((option, index) => (
          <button
            key={option.label}
            className={`menu-option${activeIndex === index ? " active" : ""}`}
            onClick={() => {
              setActiveIndex(index);
              navigate(option.path);
            }}
          >
            <i className={`fa-solid ${option.icon} menu-icon`}></i>
            <span>{option.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Menu;