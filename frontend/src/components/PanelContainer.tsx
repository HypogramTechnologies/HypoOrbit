import React from "react";
import PanelHeader from "./PanelHeader";
import type IPanelContainerProps from "../types/IPanelContainerProps";
import "../styles/panelContainer.css";

export function PanelContainer({
  title,
  chips = [],
  onExport,
  onDetails,
  children,
}: IPanelContainerProps) {
  return (
    <div className="panel-container">
      <PanelHeader title={title}
        chips={chips}
        onExport={onExport}
        onDetails={onDetails} />
      <div className="panel-content">{children}</div>
    </div>
  );
};

export default PanelContainer;
