export interface PhotonResponse {
  type: "FeatureCollection";
  features: PhotonFeature[];
}

export interface PhotonFeature {
  type: "Feature";
  properties: PhotonProperties;
  geometry: Geometry;
}

export interface PhotonProperties {
  osm_type: string;       
  osm_id: number;
  osm_key: string;       
  osm_value: string;      
  type: string;           
  countrycode: string;    
  name: string;
  country: string;
  state?: string;
  county?: string;
  city?: string;
  district?: string;
  postcode?: string;
  extent?: [number, number, number, number]; 
}

export interface Geometry {
  type: "Point";
  coordinates: [number, number]; 
}