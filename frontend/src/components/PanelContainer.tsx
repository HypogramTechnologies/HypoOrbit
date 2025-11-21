import React, { useState, useCallback } from "react";
import PanelHeader from "./PanelHeader";
// Certifique-se de que os imports dos tipos estão corretos:
import type IPanelContainerProps from "../types/IPanelContainerProps";
import type { TabKey } from "../types/IPanelContainerProps";
import CardTabView from "./CardTabView";
import FilterTabView from "./FilterTabView";
import "../styles/panelContainer.css";

const TABS: { key: TabKey; label: string }[] = [
  { key: "indices", label: "Índices" },
  { key: "filters", label: "Filtros" },
  { key: "export", label: "Exportação" },
];

export function PanelContainer({
  title,
  chips = [],
  defaultExpanded = true,
  onExport,
  statisticsData,
  timeSeriesData,
  filterParams,
  onClearFilters,
}: IPanelContainerProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [activeTab, setActiveTab] = useState<TabKey>(TABS[0].key);
  console.log("Statistics Data in PanelContainer:", statisticsData);
  console.log("Filter Params in PanelContainer:", filterParams);
  console.log("timeSeriesData in PanelContainer:", timeSeriesData);
  const toggleExpansion = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key as TabKey);
  };

  const renderActiveTabContent = useCallback(() => {
    switch (activeTab) {
      case "indices":
        return <CardTabView statisticsData={statisticsData} />;

      case "filters":
        return (
          <FilterTabView
            filterParams={filterParams}
            onClearFilters={onClearFilters}
          />
        );

      case "export":
        return (
          <div className="panel-content-placeholder">
            <h3>Exportação</h3>
            <p>Implementar formulário/opções de exportação aqui.</p>
          </div>
        );

      default:
        return null;
    }
  }, [activeTab, statisticsData, filterParams]);

  return (
    <div className={`panel-container ${isExpanded ? "expanded" : "collapsed"}`}>
      <PanelHeader
        title={title}
        chips={chips}
        onExport={onExport}
        onDetails={toggleExpansion}
        isExpanded={isExpanded}
      />

      <div className="panel-tabs-and-content">
        {isExpanded && (
          <nav className="tabs-nav">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                className={`tab-button ${
                  activeTab === tab.key ? "active" : ""
                }`}
                onClick={() => handleTabChange(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        )}

        {isExpanded && (
          <div className="panel-content">{renderActiveTabContent()}</div>
        )}
      </div>
    </div>
  );
}

export default PanelContainer;
