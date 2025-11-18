import { Request, Response } from 'express';
import { StacService } from '../services/stac';
import { IStacSearchClientParams, StacSearchParams } from '../types/IStacSearchParams';
import { stacQuery } from '../utils/stacQuery';

const service = new StacService();

export class StacController {
  // GET /stac/collections
  async collections(req: Request, res: Response) {
    try {
      const data = await service.getCollections();
      const metaOnly = req.query.metaOnly === 'true';

      if (metaOnly) {
        const listCollection = data.map((c: any) => ({
          id: c.id,
          title: c.title,
          updatedTime: c.properties?.updated || c.extent?.temporal?.interval?.[0]?.[1] || 'N/A',
          gsd: Math.max(...(c.summaries?.gsd || [])),
          hasTimeSeries: c.hasTimeSeries || false,
          spectralIndices: c.wtss || []
        }));
        return res.json({ listCollection });
      }

      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar collections' });
    }
  }

  // GET /stac/collections/:id
  async collection(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'ID da collection não fornecido' });

    try {
      const data = await service.getCollection(id);
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar collection' });
    }
  }

  // GET /stac/collections/:id/items
  async collectionItems(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'ID da collection não fornecido' });

    try {
      const data = await service.getCollectionItems(id);
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar items da collection' });
    }
  }

  // GET /stac/collections/:id/items/:featureID
  async collectionItemFeature(req: Request, res: Response) {
    const { id, featureID } = req.params;
    if (!id || !featureID) return res.status(400).json({ error: 'ID da collection ou featureID não fornecido' });

    try {
      const data = await service.getCollectionsItemsFeature(id, featureID);
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar feature da collection' });
    }
  }

  // POST /stac/search
  async search(req: Request, res: Response) {
    const params: IStacSearchClientParams = req.body;
    const query: StacSearchParams = stacQuery(params);

    try {
      const data = await service.searchItems(query);
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao realizar busca STAC' });
    }
  }

  // GET /stac/collections/by-coordinates
  async collectionsByCoordinates(req: Request, res: Response) {
    const lat = req.query.lat;
    const long = req.query.long;
    if (!lat || !long) return res.status(400).json({ error: 'Latitude ou longitude não fornecido' });

    try {
      const userLat = parseFloat(lat as string);
      const userLong = parseFloat(long as string);
      const data = await service.getCollections();

      const listCollection = data
        .map((c: any) => ({
          id: c.id,
          title: c.title,
          updatedTime: c.properties?.updated || c.extent?.temporal?.interval?.[0]?.[1] || 'N/A',
          gsd: Math.max(...(c.summaries?.gsd || [])),
          hasTimeSeries: c.hasTimeSeries || false,
          spectralIndices: c.wtss || [],
          bbox: c.extent?.spatial?.bbox
        }))
        .filter((c: any) => {
          if (!c.bbox || !c.bbox[0] || c.bbox[0].length !== 4) return false;
          const [minLon, minLat, maxLon, maxLat] = c.bbox[0];
          return (
            userLat >= Math.min(minLat, maxLat) &&
            userLat <= Math.max(minLat, maxLat) &&
            userLong >= Math.min(minLon, maxLon) &&
            userLong <= Math.max(minLon, maxLon)
          );
        });

      return res.json({ listCollection });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar collections por coordenadas' });
    }
  }

  // ✅ GET /stac/collections/:id/update-time
  async getUpdateTime(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'ID da collection não fornecido' });

    try {
      const updateTime = await service.getCollectionUpdateTime(id);
      res.json({ updateTime });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao recuperar tempo de atualização' });
    }
  }
}
