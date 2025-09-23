import stac from '../config/stac';
import { StacSearchParams } from '../models/stac';

export async function getCollections(){
    const response = await stac.get('/collections');
    return response.data;
}

export async function getCollection(collectionID:string){
    const response = await stac.get(`/collections/${collectionID}`);
    return response.data;
}

export async function getCollectionItems(collectionID:string) {
    const response = await stac.get(`/collections/${collectionID}/items`);
    return response.data;
}

export async function getCollectionsItemsFeature(collectionID:string, featureID:string) {
    const response = await stac.get(`/collections/${collectionID}/items/${featureID}`);
    return response.data;
}

export async function searchItems(params: StacSearchParams) {
    const response = await stac.post(`/search`, params)
    return response.data
}
