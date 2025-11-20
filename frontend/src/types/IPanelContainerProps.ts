export default interface IPanelContainerProps {
  title: string;
  chips?: { label: string; value: string | number }[];
  defaultExpanded?: boolean;
  onExport?: () => void;
  onDetails?: () => void;
  children?: React.ReactNode;
}
