import React from "react";
import type IPanelHeaderProps from "../types/IPanelHeaderProps";
import "../styles/panelHeader.css";

export default function PanelHeader({
  title,
  chips = [],
  onExport,
  onDetails,
}: IPanelHeaderProps) {
  return (
    <div className="panel-header">
      <div className="panel-header-left">
        <span className="material-symbols-outlined panel-icon">
            monitoring
        </span>
        <h3>{title}</h3>

        <div className="chip-row">
          {chips.map((chip, index) => (
            <span
              key={index}
              className={`chip chip-${chip.label ?? "default"}`}
            >
              <strong>{chip.label}:</strong> {chip.value}
            </span>
          ))}
        </div>
      </div>

      <div className="panel-header-actions">
        {onExport && (
          <button className="btn-export" onClick={onExport}>
            <span className="material-symbols-outlined">download</span>
            Exportar
          </button>
        )}

        {onDetails && (
          <button className="btn-details" onClick={onDetails}>
            <span className="material-symbols-outlined">pan_zoom</span>
            Detalhes
          </button>
        )}
      </div>
    </div>
  );
}
