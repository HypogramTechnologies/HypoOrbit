import type { IStacSearchParams } from "../types/IStacSearchParams";
import api from "./api"

export class StacService{

    async getInfoCollection(){
        const data = await api.get("/stac/collections?metaOnly=true");
        return data;
    }

    async searchCollections(params:IStacSearchParams){
        const data = await api.post("/stac/search", params);
        return data;
    }

}