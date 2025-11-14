export interface GeoJSONFeatureCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

export interface GeoJSONFeature {
  type: "Feature";
  properties: GeoJSONProperties;
  geometry: GeoJSONGeometry;
}

export interface GeoJSONProperties {
  osm_type: string;
  osm_id: number;
  osm_key: string;
  osm_value: string;
  type: string;
  postcode: string;
  countrycode: string;
  name: string;
  country: string;
  city: string;
  district: string;
  locality: string;
  state: string;
  county: string;
  extent: [number, number, number, number];
}

export interface GeoJSONGeometry {
  type: "Point" | "LineString" | "Polygon" | "MultiPoint" | "MultiLineString" | "MultiPolygon";
  coordinates: number[] | number[][] | number[][][];
}
