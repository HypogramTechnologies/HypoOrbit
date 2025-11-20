// // Satellite.ts
// export interface Satellite {
//   id: string;
//   name: string;
//   collection: string;
//   resolution: string;
//   description: string;
//   hasTimeSeries: boolean;
//   title: string;
//   type: string;
//   version?: string;
//   license?: string;
//   keywords?: string[];
//   platform?: string[];
//   stac_version?: string;
//   stac_extensions?: string[];
//   properties?: {
//     renders?: Record<string, any>;
//     bdc?: {
//       tiles?: any[];
//       visual?: Record<string, any>;
//       applications?: any[];
//     };
//     created?: string;
//   };
//   item_assets?: Record<string, {
//     href: string;
//     type?: string;
//     roles?: string[];
//   }>;
//   temporal?: {
//     type: string;
//     extent: any;
//     values?: any[];
//   };
//   spatial?: {
//     x: {
//       type: string;
//       axis: string;
//       extent: [number, number];
//       reference_system: string;
//     };
//     y: {
//       type: string;
//       axis: string;
//       extent: [number, number];
//       reference_system: string;
//     };
//   };
//   bdc?: {
//     type: string;
//     bands_quicklook?: string[];
//     composite_function?: string;
//     crs?: string;
//     grs?: string;
//     public?: boolean;
//     temporal_composition?: {
//       step: number;
//       unit: string;
//       cycle: {
//         step: number;
//         unit: string;
//       };
//       schema: string;
//     };
//     cube?: {
//       dimensions: {
//         bands: {
//           type: string;
//           values: string[];
//         };
//         temporal?: any;
//         x?: any;
//         y?: any;
//       };
//     };
//   };
//   wtss?: {
//     attributes: string[];
//   };
//   summaries?: {
//     instruments?: string[];
//   };
//   links?: any[];
//   providers?: any[];
//   deprecated?: boolean;
//   extent?: {
//     spatial?: any;
//     temporal?: any;
//   };
// }

// // SatelliteData.ts
// export interface SatelliteBand {
//   name: string;
//   description?: string;
//   wavelength?: number;
// }

// export interface SatelliteData {
//   id: string;
//   name: string;
//   collection: string;
//   resolution: string;
//   description: string;
//   provider: string;
//   license: string;
//   metadata: any;
//   bands: SatelliteBand[];
//   temporalCoverage?: {
//     start: string;
//     end: string;
//   };
//   spatialCoverage?: {
//     type: string;
//     coordinates: [number, number];
//   };
//   hasTimeSeries: boolean;
//   wtssBands?: string[];
// }


// export interface SatelliteDetailViewProps {
//   satellite: SatelliteData | null;  
// }

// src/types/ISatelliteData.ts

export interface ISpectralBand {
  name: string;
  wavelength: string;
}

export interface IStacMetadata {
  id: string;
  license: string;
  additionalMetadata: Record<string, string | number | boolean>;
}

export interface ISatelliteData {
  title: string; 
  description: string;
  spatialResolution: string;
  provider: string;
  spatialCoverage: string;
  spectralBands: ISpectralBand[];
  startDate: string;
  endDate: string;
  totalPeriod: string;
  metadataStac: IStacMetadata;
}