import { Router } from 'express';
import { SatelliteController } from '../controllers/SatelliteController';

const satelliteRoutes = Router();
const controller = new SatelliteController();

satelliteRoutes.post('/', (req, res) => controller.createSatellite(req, res));
satelliteRoutes.get('/', (req, res) => controller.getSatellites(req, res));
satelliteRoutes.get('/:id', (req, res) => controller.getSatelliteById(req, res));

export default satelliteRoutes;
