import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel, faFileCsv } from '@fortawesome/free-solid-svg-icons';
import '../styles/exportTabView.css';
import type { IExportTabViewProps } from '../types/IExportTabViewProps';



export default function ExportTabView({ onExport }: IExportTabViewProps){
    return (
        <div className="export-tab-view">
            <h2 className="tab-title">Exportar Dados</h2>
            <p className="tab-subtitle">
                Baixe os dados filtrados em diferentes formatos, incluindo as séries temporais, estatísticas e filtros aplicados.
            </p>

            <div className="export-options-container">
                <button 
                    className="export-button export-button-excel" 
                    onClick={() => onExport('xlsx')}
                >
                    <FontAwesomeIcon icon={faFileExcel} className="export-icon" />
                    <div className="export-details">
                        <span className="export-format">Planilha (.xlsx)</span>
                        <span className="export-description">Planilha completa com dados tabulados, filtros e estatísticas.</span>
                    </div>
                </button>

                <button 
                    className="export-button export-button-csv" 
                    onClick={() => onExport('csv')}
                >
                    <FontAwesomeIcon icon={faFileCsv} className="export-icon" />
                    <div className="export-details">
                        <span className="export-format">CSV (.csv)</span>
                        <span className="export-description">Dados brutos separados por vírgula.</span>
                    </div>
                </button>
            </div>
        </div>
    );
};
