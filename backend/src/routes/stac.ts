import { Router } from 'express';
import { StacController } from '../controllers/stac';

const router = Router();
const controller = new StacController();

// GET /stac/collections
router.get('/collections', controller.collections);

// GET /stac/collections/by-coordinates
router.get('/collections/by-coordinates', controller.collectionsByCoordinates);

// GET /stac/collections/:id
router.get('/collections/:id', controller.collection);

// GET /stac/collections/:id/items
router.get('/collections/:id/items', controller.collectionItems);

// GET /stac/collections/:id/items/:featureID
router.get('/collections/:id/items/:featureID', controller.collectionItemFeature);

// POST /stac/search
router.post('/search', controller.search);

// GET /stac/collections/:id/update-time
router.get('/collections/:id/update-time', controller.getUpdateTime);

export default router;
