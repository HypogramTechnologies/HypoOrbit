// src/utils/exportTimeSeriesToXlsx.ts (Novo Arquivo)

import * as XLSX from 'xlsx';
import type { IWTSSResponse } from "../types/IWTSSResponse";
import type { IStatisticsWTSS } from "../types/IStatisticsWTSS";
import type { IWTSSRequest } from "../types/IWTSSRequest";


export default function exportToXLSX(
    timeSeriesData: IWTSSResponse,
    filterParams: IWTSSRequest,
    statisticsData: IStatisticsWTSS | null,
    filename: string
) {
    const workbook = XLSX.utils.book_new();
    
    const filterData = [
        ["Parâmetro", "Valor"],
        ["Período", `${filterParams.startDate} a ${filterParams.endDate}`],
        ["Satélites", filterParams.coverages.join("; ")],
        ["Latitude", filterParams.latitude],
        ["Longitude", filterParams.longitude],
    ];
    const filterSheet = XLSX.utils.aoa_to_sheet(filterData);
    XLSX.utils.book_append_sheet(workbook, filterSheet, "Filtros");

    const statsArray: any[] = [
        ["Índice", "Média", "Máximo", "Mínimo"]
    ];

    if (statisticsData && statisticsData.statistics) {
        Object.entries(statisticsData.statistics).forEach(([indexName, stats]) => {
            statsArray.push([
                indexName,
                stats.avg,
                stats.max,
                stats.min
            ]);
        });
    }
    const statsSheet = XLSX.utils.aoa_to_sheet(statsArray);
    XLSX.utils.book_append_sheet(workbook, statsSheet, "Estatísticas");


    const timeSeriesArray: any[] = [];
    
    const headerParts = ["Date"];
    timeSeriesData.timeSeries.forEach((tsItem) => {
        tsItem.result.attributes.forEach((attr) => {
            headerParts.push(`${tsItem.query.coverage}_${attr.attribute}`);
        });
    });
    timeSeriesArray.push(headerParts);

    const timeline = timeSeriesData.timeSeries[0]?.result.timeline || [];

    timeline.forEach((date, index) => {
        const row: (string | number)[] = [date];

        timeSeriesData.timeSeries.forEach((tsItem) => {
            tsItem.result.attributes.forEach((attr) => {
                const value =
                    attr.values[index] !== undefined ? attr.values[index] : "";
                row.push(value);
            });
        });
        timeSeriesArray.push(row);
    });

    const dataSheet = XLSX.utils.aoa_to_sheet(timeSeriesArray);
    

    if (dataSheet['!ref']) {
        const range = XLSX.utils.decode_range(dataSheet['!ref']);
        for(let R = range.s.r + 1; R <= range.e.r; ++R) {
            for(let C = range.s.c + 1; C <= range.e.c; ++C) {
                const cell_address = {c:C, r:R};
                const cell_ref = XLSX.utils.encode_cell(cell_address);
                if(dataSheet[cell_ref] && typeof dataSheet[cell_ref].v === 'number') {
                    dataSheet[cell_ref].z = '0.0000'; 
                }
            }
        }
    }
    
    XLSX.utils.book_append_sheet(workbook, dataSheet, "Dados brutos");

    XLSX.writeFile(workbook, filename);
}