// Header.tsx
import "../styles/header.css";
import "../styles/menuVisible.css";
import type { HeaderProps } from "../types/MenuProps";

export default function Header({ onToggleFiltro, isFiltroVisible, Title }: HeaderProps) {
    return (
        <div className="header">


            <div className={`header-container ${isFiltroVisible ? "header-filtro-visible" : "header-filtro-hidden"}`}>

                <button
                    onClick={onToggleFiltro}
                    className={`toggle-button ${isFiltroVisible ? "visible" : "hidden"}`}
                    aria-label="Alternar Filtro"
                >
                    {/* Você pode usar ícones diferentes se quiser */}
                    <div>
                        <i className={`fa-solid fa-bars icon`} ></i>

                    </div>
                </button>
                <p className="title">{Title}</p>
            </div>

        </div>
    );
}
