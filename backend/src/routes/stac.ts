import { Router } from 'express';
import { StacController } from '../controllers/stac';

const router = Router();
const controller:StacController = new StacController()



// GET /api/stac/collections
router.get('/collections', controller.collections);

// GET /api/stac/collections/by-coordinates
router.get('/collections/by-coordinates', controller.collectionsByCoordinates)

// GET /api/stac/collections/:id
router.get('/collections/:id', controller.collection);

// GET /api/stac/collections/:id/items
router.get('/collections/:id/items', controller.collectionItems);

// GET /api/stac/collections/:id/items/:featureID
router.get('/collections/:id/items/:featureID', controller.collectionItemFeature);

// POST /api/stac/search
router.post('/search', controller.search);

export default router;