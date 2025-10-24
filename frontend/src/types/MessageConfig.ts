export const TypeMessage = {
  Success: "success",
  Error: "error",
  Warning: "warning",
  Info: "info",
} as const;

export type TypeMessage = typeof TypeMessage[keyof typeof TypeMessage];

export interface MessageConfig {
  type: TypeMessage;
  message: string;
  show: boolean;
}

export interface MapFilterProps {
  setMessageConfig: React.Dispatch<React.SetStateAction<MessageConfig>>;
}

export interface SatelliteFilterProps {
  setMessageConfig: React.Dispatch<React.SetStateAction<MessageConfig>>;
  origin: string;
}

export interface MapFilterPropsExtended extends MapFilterProps {
  isFiltroVisible: boolean;
}