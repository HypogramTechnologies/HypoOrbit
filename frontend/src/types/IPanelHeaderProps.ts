export default interface PanelHeaderProps {
  title: string;
  chips?: { label: string; value: string | number }[];
  onExport?: () => void;
  onDetails?: () => void;
}
