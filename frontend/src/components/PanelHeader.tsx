
import type IPanelHeaderProps from "../types/IPanelHeaderProps";
import "../styles/panelHeader.css";

export default function PanelHeader({
  title,
  chips = [],
  onExport,
  onDetails,
  isExpanded,
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
              className={`chip chip-${chip.key ?? "default"}`}
            >
              <strong>{chip.key}:</strong> {chip.avg}
            </span>
          ))}
        </div>
      </div>

      <div className="panel-header-actions">
        {onExport && (
          <button className="btn-export" onClick={() => onExport('xlsx')}>
            <span className="material-symbols-outlined">download</span>
            Exportar
          </button>
        )}

        {onDetails && (
          <button className="btn-details" onClick={onDetails}>
            {isExpanded ? (
              <>
                <span className="material-symbols-outlined">close_fullscreen</span>
                Recolher
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">open_in_full</span>
                Detalhes
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
