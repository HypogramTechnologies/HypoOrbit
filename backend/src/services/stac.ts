import stac from '../config/stac';
import { StacSearchParams } from '../types/IStacSearchParams';

export class StacService {
  // GET /collections
  async getCollections() {
    const response = await stac.get('/collections');
    return response.data;
  }

  // GET /collections/:id
  async getCollection(collectionID: string) {
    const response = await stac.get(`/collections/${collectionID}`);
    return response.data;
  }

  // GET /collections/:id/items
  async getCollectionItems(collectionID: string) {
    const response = await stac.get(`/collections/${collectionID}/items`);
    return response.data;
  }

  // GET /collections/:id/items/:featureID
  async getCollectionsItemsFeature(collectionID: string, featureID: string) {
    const response = await stac.get(`/collections/${collectionID}/items/${featureID}`);
    return response.data;
  }

  // POST /search
  async searchItems(params: StacSearchParams) {
    const response = await stac.post(`/search`, params);
    return response.data;
  }
}
