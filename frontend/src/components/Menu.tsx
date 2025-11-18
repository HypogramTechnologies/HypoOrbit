import React from "react";
import "../styles/menu.css";
import HeaderImg from "../assets/header.png";

import { useNavigate, useLocation } from "react-router-dom";

const Menu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
        {menuOptions.map((option) => (
          <button
            key={option.label}
            className={`menu-option${location.pathname === option.path ? " active" : ""}`}
            onClick={() => navigate(option.path)}
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