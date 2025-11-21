export default interface IPanelContainerProps {
  title: string;
  chips?: { key: string; avg: number }[];
  defaultExpanded?: boolean;
  onExport?: () => void;
  onDetails?: () => void;
  children?: React.ReactNode;
}
