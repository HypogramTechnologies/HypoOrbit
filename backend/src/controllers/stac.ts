import { getCollections, getCollection, getCollectionItems, getCollectionsItemsFeature, searchItems } from '../services/stac'
import { StacSearchParams } from '../models/stac';
import { Request, Response } from 'express';

export async function collections(req: Request, res: Response) {
  try {
    const data = await getCollections();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar collections' });
  }
}

// GET /stac/collections/:id
export async function collection(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'ID da collection não fornecido' });
  }
  try {
    const data = await getCollection(id);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar collection' });
  }
}

// GET /stac/collections/:id/items
export async function collectionItems(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'ID da collection não fornecido' });
  }
  try {
    const data = await getCollectionItems(id);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar items da collection' });
  }
}

// GET /stac/collections/:id/items/:featureID
export async function collectionItemFeature(req: Request, res: Response) {
  const { id, featureID } = req.params;
  if (!id || !featureID) {
    return res.status(400).json({ error: 'ID da collection ou featureID não fornecido' });
  }
  try {
    const data = await getCollectionsItemsFeature(id, featureID);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar feature da collection' });
  }
}

// POST /stac/search
export async function search(req: Request, res: Response) {
  const params: StacSearchParams = req.body;
  try {
    const data = await searchItems(params);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao realizar busca STAC' });
  }
}
