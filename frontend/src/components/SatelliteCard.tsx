import type { ISatelliteCardProps } from "../types/ISatelliteCardProps";
import "../styles/satelliteCard.css";

const SatelliteCard: React.FC<ISatelliteCardProps> = ({ id, updatedTime, gsd, spectralIndices }) => {

    const checkboxId = `checkbox-${id}`;

    return (
        <div className="card-container">
            <div className="card-checkbox">
                <input type="checkbox" id={checkboxId}/>  
                <label htmlFor={checkboxId}></label>
            </div>

            <div className="card-header">
                <i className="fa-solid fa-satellite card-satellite-icon"></i>
                <h3 className="name-text">Nome do satélite</h3>
            </div>

            {id && <p className="id-text">ID: {id.toUpperCase()}</p>}

            <div className="card-info">
                {updatedTime && (
                    <p className="updated-time">
                        <i className="fa-solid fa-calendar card-icon green"></i> {updatedTime}
                    </p>
                )}
                {gsd && (
                    <p>
                        <i className="fa-solid fa-location-dot card-icon red"></i> {gsd}m
                    </p>
                )}
            </div>

            {/* {spectralIndices && spectralIndices.length > 0 && (
                <div className="spectral-section">
                    <i className="fa-solid fa-layer-group card-icon blue"></i>
                    <span>{spectralIndices.length} bandas</span>
                </div>
            )} */}

            <div className="card-button-container">
                <button className="card-button">
                    <i className="fa-solid fa-eye card-icon"></i> Visualizar
                </button>
            </div>
        </div>
    );
};

export default SatelliteCard;
