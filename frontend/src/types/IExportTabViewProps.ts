export type ExportFormat = 'xlsx' | 'csv';

export interface IExportTabViewProps {
    onExport: (format: 'xlsx' | 'csv') => void;
}