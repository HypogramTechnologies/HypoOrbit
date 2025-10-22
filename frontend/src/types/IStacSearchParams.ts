export interface IStacSearchParams{
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