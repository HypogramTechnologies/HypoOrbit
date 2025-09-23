import { Document } from "mongoose";

export interface IStacCollection extends Document {
  id: string;
  type: "Collection";
  stac_version: string;
  stac_extensions: string[];
  title: string;
  version: string;
  deprecated: boolean;
  description: string;
  keywords: string[];
  providers: IProvider[];
  summaries: {
    gsd?: number[];
    platform?: string[];
    instruments?: string[];
    constellation?: string[];
    [key: string]: any;
  };
  item_assets?: Record<string, IItemAsset>;
  properties?: Record<string, any>;
  "bdc:type"?: string;
  "bdc:public"?: boolean;
  license: string;
  extent: {
    spatial: { bbox: number[][] };
    temporal: { interval: (string | null)[][] };
  };
  links: ILink[];
}

export interface IProvider {
  url?: string;
  name: string;
  roles: string[];
  [key: string]: any;
}

export interface IItemAsset {
  type: string;
  roles: string[];
  title: string;
  [key: string]: any;
}

export interface ILink {
  href: string;
  rel: string;
  type?: string;
  title?: string;
}
