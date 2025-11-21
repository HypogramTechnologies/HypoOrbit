import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import "../styles/indexCard.css";
import type { IIndexCardProps } from "../types/IIndexCardProps";

export default function IndexCard({
  indexName,
  fullName,
  description,
  stats,
  colorClass,
}: IIndexCardProps) {

  return (
    <div className={`index-card index-card-${colorClass}`}>
      <div className="index-card-header">
        <h3 className={`index-name color-${colorClass}`}>{indexName}</h3>
        <FontAwesomeIcon icon={faChartLine} className={`chart-icon color-${colorClass}`} />
      </div>

      <p className="full-name">{fullName}</p>
      <p className="description">{description}</p>

      <div className="stats-grid">
        <div className="stat-item">
          <p className="stat-label">MÉDIA</p>
          <strong className={`stat-value color-${colorClass}`}>
            {stats.avg}
          </strong>
        </div>
        <div className="stat-item">
          <p className="stat-label">MÁXIMO</p>
          <strong className={`stat-value color-${colorClass}`}>
            {stats.max}
          </strong>
        </div>
        <div className="stat-item">
          <p className="stat-label">MÍNIMO</p>
          <strong className={`stat-value color-${colorClass}`}>
            {stats.min}
          </strong>
        </div>
      </div>
    </div>
  );
}
