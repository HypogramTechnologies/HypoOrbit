import type { IWTSSRequest } from './IWTSSRequest';

export interface IFilterTabViewProps {
  filterParams: IWTSSRequest | undefined;
  onClearFilters: () => void;
}