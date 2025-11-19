export interface IWTSSCoverages {
  coverages: string[];
}

export interface ICoverageMetadata {
  id: number;
  name: string;
  version: string;
  fullname: string;
  description: string;
  title: string;
  timeline: string[];
  bands: IBand[];
  extent: {
    type: string;
    coordinates: number[][][];
  };
  "bdc:crs": string;
  grs: number;
  grs_name: string;
  raster_size: {
    x: number;
    y: number;
  };
}

export interface IBand {
  name: string;
  common_name: string;
  scale: number;
  scale_add: number | null;
  nodata: number;
  data_type: string;
  resolution_x: number;
  resolution_y: number;
  min_value: number;
  max_value: number;
}

export interface IWTSSTimesSeries {
  query: {
    coverage: string;
    attributes: string[];
    longitude: number;
    latitude: number;
    start_date: string;
    end_date: string;
  };
  result: {
    attributes: IWTSSTimeSeriesAttribute[];
    timeline: string[];
    coordinates: {
      latitude: number;
      longitude: number;
      col: number;
      row: number;
    };
  };
}

export interface IWTSSTimeSeriesAttribute {
  attribute: string;
  values: number[];
}

export interface IAttributesCoverages {
  coverage: string;
  attributes: string[];
}

export interface IWTSSAttributesResponse {
  coverages: IAttributesCoverages[];
}
