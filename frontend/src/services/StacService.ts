import type { IStacSearchParams } from "../types/IStacSearchParams";
import api from "./api"

export class StacService{

    async getInfoCollection(){
        const data = await api.get("/stac/collections?metaOnly=true");
        return data;
    }

    async getCollectionsByCoordinates(coordinates: number[]) {
        const [lat, long] = coordinates;

        const response = await api.get(
            `/stac/collections/by-coordinates?lat=${lat}&long=${long}`
        );

        return response;
    }

    async searchItemsCollections(params:IStacSearchParams){
        const data = await api.post("/stac/search", params);
        return data;
    }

    async getCollectionById(id: string) {
        const response = await api.get(`/stac/collections/${id}`);
        return response;
    }

    async getCollectionItems(id: string) {
        const response = await api.get(`/stac/collections/${id}/items`);
        return response;
    }
}