import { Router } from 'express';
import {GeocodeController} from '../controllers/geocode';

const router = Router();
const controller:GeocodeController = new GeocodeController()

// GET /api/geocode/search/?q=
router.get('/address', controller.address);
// GET /api/geocode/coordinates/?q=
router.get('/coordinates', controller.coordinates);

export default router;