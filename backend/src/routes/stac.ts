import { Router } from 'express';
import { 
  collections,
  collection,
  collectionItems,
  collectionItemFeature,
  search
} from '../controllers/stac';

const router = Router();

// GET /stac/collections
router.get('/collections', collections);

// GET /stac/collections/:id
router.get('/collections/:id', collection);

// GET /stac/collections/:id/items
router.get('/collections/:id/items', collectionItems);

// GET /stac/collections/:id/items/:featureID
router.get('/collections/:id/items/:featureID', collectionItemFeature);

// POST /stac/search
router.post('/search', search);

export default router;