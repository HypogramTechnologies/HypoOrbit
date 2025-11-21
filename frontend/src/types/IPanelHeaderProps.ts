export default interface PanelHeaderProps {
  title: string;
  chips?: { key: string; avg: number }[];
  onExport?: () => void;
  onDetails?: () => void;
}
