import type { IStatisticsWTSS } from "./IStatisticsWTSS";
import type { IWTSSRequest } from "./IWTSSRequest";
import type { IWTSSResponse } from "./IWTSSResponse";

export type TabKey = "indices" | "filters" | "export";

export default interface IPanelContainerProps {
  title: string;
  chips?: { key: string; avg: number }[];
  defaultExpanded?: boolean;
  onExport?: () => void;
  onDetails?: () => void;
  filterParams: IWTSSRequest | undefined;
  timeSeriesData: IWTSSResponse | null;
  statisticsData: IStatisticsWTSS | null;

}
