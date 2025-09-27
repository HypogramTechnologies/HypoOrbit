import { Request, Response } from 'express';
import { StacService } from '../services/stac';
import { StacSearchParams } from '../types/IStacSearchParams';

const service = new StacService()

export class StacController {
  // GET /stac/collections
  async collections(req: Request, res: Response) {
    try {
      const data = await service.getCollections();
      const idOnly = req.query.idOnly === 'true';

      if (idOnly) {
        const listCollection = data.collections.map((c: any) => c.id);
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
    const params: StacSearchParams = req.body;

    try {
      const data = await service.searchItems(params);
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao realizar busca STAC' });
    }
  }
}
