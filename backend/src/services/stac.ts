import stac from "../config/stac";
import { WTSSService } from "./wtss";
import {
  IWTSSCoverages,
  IAttributesCoverages,
  IWTSSAttributesResponse,
} from "../types/IWTSSCoverages";
import { StacSearchParams } from "../types/IStacSearchParams";
import { SatelliteService } from "../services/satellite";

const satelliteService = new SatelliteService();

const wtssService = new WTSSService();

export class StacService {
  // GET /collections
  async getCollections() {
    try {
      let collections: any[] | null = null;
      try {
        const response = await stac.get("/collections");
        collections = response.data?.collections ?? null;
      } catch (apiError) {
        console.warn("STAC API indisponível, usando dados do banco.");
      }

      if (!collections) {
        collections = await satelliteService.getAllSatellites();
      }

      return this.attachWTSSAttributes(collections);
    } catch (err) {
      console.error("Erro ao obter collections:", err);
      throw new Error("Erro ao buscar collections");
    }
  }

  // GET /collections/:id
  async getCollection(collectionID: string) {
    const response = await stac.get(`/collections/${collectionID}`);
    const collection = response.data;
    const enriched = await this.attachWTSSAttributes([collection]);
    return enriched[0];
  }

  private async attachWTSSAttributes(collections: any[]) {
    const coverages: IWTSSCoverages = await wtssService.getCoverages();
    const coverageNames = coverages.coverages;

    const stacWithWTSS = collections.filter((col) =>
      coverageNames.includes(col.id)
    );

    let attributesResponse: IAttributesCoverages[] = [];

    if (stacWithWTSS.length > 0) {
      const attrCoverages = await wtssService.getAttributesCoverages(
        stacWithWTSS.map((c) => c.id)
      );
      attributesResponse = attrCoverages;
    }

    const enrichedCollections = collections.map((col) => {
      const hasTimeSeries = coverageNames.includes(col.id);
      const coverageAttr = attributesResponse.find(
        (a) => a.coverage === col.id
      );

      const attributes = coverageAttr ? coverageAttr.attributes : [];

      return {
        ...col,
        hasTimeSeries,
        wtss: hasTimeSeries
          ? {
              attributes,
            }
          : null,
      };
    });

    return enrichedCollections;
  }

  // GET /collections/:id/items
  async getCollectionItems(collectionID: string) {
    const response = await stac.get(`/collections/${collectionID}/items`);
    return response.data;
  }

  // GET /collections/:id/items/:featureID
  async getCollectionsItemsFeature(collectionID: string, featureID: string) {
    const response = await stac.get(
      `/collections/${collectionID}/items/${featureID}`
    );
    return response.data;
  }

  // POST /search
  async searchItems(params: StacSearchParams) {
    const response = await stac.post(`/search`, params);
    return response.data;
  }

  // ✅ GET /collections/:id/update-time
  async getCollectionUpdateTime(collectionID: string) {
    const response = await stac.get(`/collections/${collectionID}`);
    const collection = response.data;
    const updated = collection?.properties?.updated;
    const temporalEnd = collection?.extent?.temporal?.interval?.[0]?.[1];
    return updated || temporalEnd || "Data de atualização não encontrada";
  }
}
