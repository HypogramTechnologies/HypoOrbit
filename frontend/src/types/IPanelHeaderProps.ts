export default interface PanelHeaderProps {
  title: string;
  chips?: { key: string; avg: number }[];
  onExport?: (format: 'xlsx' | 'csv') => void;
  onDetails?: () => void;
  isExpanded: boolean;
}
