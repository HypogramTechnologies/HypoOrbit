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

// export interface ISatellite {
//   id: string;
//   title: string;
// }

// export interface ISatelliteCardProps {
//   id: string;
//   title:string
//   updatedTime?: string;
//   gsd?: number;
//   spectralIndices?: string[];
//   hasTimeSeries: boolean;
//   origin?: string;
// }

// export interface SatelliteFilterProps {
//   setMessageConfig: React.Dispatch<React.SetStateAction<MessageConfig>>;
//   origin: string;
//   // satellites: ISatellite[];
//   satellites: ISatelliteCardProps[];
//   setFilteredSatellites: React.Dispatch<React.SetStateAction<ISatelliteCardProps[]>>;
// }

export interface MapFilterPropsExtended extends MapFilterProps {
  isFiltroVisible: boolean;
  openHistory: boolean;
  setOpenHistory: (value: boolean) => void;
}