export interface IStacSearchClientParams{
  latitude?: number;
  longitude?: number;
  datetime?: string;            //string (datetime_interval) start/end Example: 2025-09-01T00:00:00Z/2025-09-22T23:59:59Z
  intersects?: object;          //One object of coordinates or geometries + type Example: "intersects": {"coordinates": [0,0], "type": "Point"}
  collections?: string[];       //Array of strings (collectionsArray)
  ids?: string[];               //Array of strings (ids)
  limit?: number;               //integer (limit) Default 10
  query?: object; 
  km?: number;
  metaOnly?:boolean;
}

export interface StacSearchParams {
  bbox?: number[];              //Array of numbers [ 4 .. 6 ] items Example: [160.6, -55.95, -170, -25.89]
  datetime?: string;            //string (datetime_interval) start/end Example: 2025-09-01T00:00:00Z/2025-09-22T23:59:59Z
  intersects?: object;          //One object of coordinates or geometries + type Example: "intersects": {"coordinates": [0,0], "type": "Point"}
  collections?: string[];       //Array of strings (collectionsArray)
  ids?: string[];               //Array of strings (ids)
  limit?: number;               //integer (limit) Default 10
  query?: object;               //One properties object
}
