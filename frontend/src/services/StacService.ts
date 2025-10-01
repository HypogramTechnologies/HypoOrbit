import api from "./api"

export class StacService{

    async getInfoCollection(){
        const data = await api.get("/stac/collections?metaOnly=true");
        return data;
    }    
}