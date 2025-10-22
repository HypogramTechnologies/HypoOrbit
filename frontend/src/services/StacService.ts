import type { IStacSearchParams } from "../types/IStacSearchParams";
import api from "./api"

export class StacService{

    async getInfoCollection(){
        const data = await api.get("/stac/collections?metaOnly=true");
        return data;
    }

    async getCollectionsByCoordinates(coordinates:number[]){
        const data = await api.get(`/stac/collections?metaOnly=true&latitude=${coordinates[0]}&longitude=${coordinates[1]}`);
        return data;
    }

    async searchItemsCollections(params:IStacSearchParams){
        const data = await api.post("/stac/search", params);
        return data;
    }

}